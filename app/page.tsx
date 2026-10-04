'use client';
import {PolicyStatusNote} from './policy-status-note';
import { useEffect, useMemo, useState, useRef, type ReactNode } from 'react';
import { Radar, LayoutDashboard, Clock3, Activity, Database, Search, ChevronRight, ChevronDown, ExternalLink, Download, RefreshCw, MapPin, CalendarDays, FileText, X, ShieldCheck, AlertCircle, Layers, Sun, Moon, Monitor } from 'lucide-react';
import { regions, countries, countryOf, keyDate, policyTags, lifecycle, nextStepLabel, type Policy } from '../lib/domain/model';
import { trackingStart, type IntakeRecord, type coverageRows } from '../lib/domain/intake';
import { IntakeView } from './intake-view';
import { LanguageSwitch } from './language-switch';
import { CompactSelect } from './compact-select';
import { readNavigation, navigationSearch } from '../lib/domain/navigation';
import { selectListing, countrySourceUrls } from '../lib/domain/listing';
import { translator, readLocale, localeSearch, languageTags, formatDate, originalRegionName, regionName, countryName as localizedCountryName, type Locale } from '../lib/i18n/index';
import { contentText, localizePolicy, localizeIntake, searchText, emptyLocalization, type Localization } from '../lib/i18n/content';
type IntakeData = { trackingStart: string; records: IntakeRecord[]; coverage: ReturnType<typeof coverageRows> };
type CheckRow = { url: string; checked_at: string; last_success_at: string | null; error: string | null; changed: number; snapshot_key: string | null };
type Status = { checks: CheckRow[]; settings: Record<string, string>; coverage: string[]; discovery: { region: string; title: string; url: string; publisher: string }[] };
function sourceProblem(error:string){
  if(/HTTP 403|HTTP 401/.test(error))return '官方站点暂不接受自动读取';
  if(/HTTP 404/.test(error))return '原文地址暂时找不到，需核对新地址';
  if(/timeout|timed out/i.test(error))return '读取超时，稍后重试';
  if(/交互|javascript|captcha/i.test(error))return '需要浏览器交互，自动读取未完成';
  return '暂时无法自动读取，请打开官方原文核对';
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>(readLocale);
  const [localization, setLocalization] = useState<Localization>(emptyLocalization);
  const tr = translator(locale);
  const ct = (text: string | undefined) => contentText(text, locale, localization.messages);
  const fmt = (v: string) => formatDate(v, locale);
  const month = (v: string) => formatDate(v, locale, { month: 'short' });
  const names = (id: string) => regionName(id, locale);
  const countryName = (id: string) => localizedCountryName(id, locale);
  const localName = names;
  function changeLocale(next: Locale) {
    const search = localeSearch(location.search, next);
    history.replaceState(null, '', location.pathname + search + location.hash);
    try {
      localStorage.setItem('language', next);
    } catch { }
    setLocale(next);
  }
  useEffect(() => {
    document.documentElement.lang = languageTags[locale];
    document.title = tr('政策雷达');
  }, [locale]);

  type Theme = 'system' | 'light' | 'dark';
  const themeLabel: Record<Theme, string> = { system: tr("跟随系统"), light: tr("浅色"), dark: tr("深色") };
  const readTheme = (): Theme => {
    try {
      const t = localStorage.getItem('theme');
      return t === 'light' || t === 'dark' ? t : 'system';
    } catch {
      return 'system';
    }
  };
  const tone = (p: Policy, today: string) => p.phase !== 'adopted' ? 'amber' : !p.effectiveDate || p.effectiveDate > today ? 'blue' : 'green';
  const headings: Record<string, [string, string]> = {
    intake: [tr("官方进展记录"), tr("同一政策可以有多条进展记录；从 2026 年 8 月 2 日起登记，解读未完成也保留原文。")],
    adopted: [tr("看清已经发生的改变"), tr("从通过到生效，追踪政策最终改了什么、何时影响生活。")],
    pending: [tr("还在推进中的改变"), tr("跟进提案、审议与表决，保留尚未确定的部分。")],
    all: [tr("全部政策"), tr("已通过、待决议题及尚未解读的官方记录一起查看；待核实记录会单独标明。")],
    updates: [tr("每一步，都有记录"), tr("未来安排与已发生事件分开列出；未来安排不代表结果。")],
    sources: [tr("来源与更新"), tr("查看覆盖范围、原文检查结果和事实核实记录。")]
  };

  const [canonicalItems, setItems] = useState<Policy[]>([]), [status, setStatus] = useState<Status>({ checks: [], settings: {}, coverage: [], discovery: [] }), [loading, setLoading] = useState(true), [error, setError] = useState('');
  const [view, setView] = useState('adopted'), [region, setRegion] = useState('all'), [query, setQuery] = useState(''), [selectedId, setSelectedId] = useState<string | null>(null), [busy, setBusy] = useState(false), [rawOpen, setRawOpen] = useState(false);
  const [canonicalIntake, setIntake] = useState<IntakeData>({ trackingStart, records: [], coverage: [] }), [tags, setTags] = useState<string[]>([]), [filtersReady, setFiltersReady] = useState(false);
  const [country, setCountry] = useState<string>(countries[0].id), [theme, setTheme] = useState<Theme>('system');
  const items = useMemo(() => canonicalItems.map(p => localizePolicy(p, locale, localization)), [canonicalItems, locale, localization]);
  const intake = useMemo(() => ({ ...canonicalIntake, records: canonicalIntake.records.map(r => localizeIntake(r, locale, localization)) }), [canonicalIntake, locale, localization]);
  const selected = items.find(p => p.id === selectedId) ?? null;
  const searchIndex = useMemo(() => new Map([...canonicalItems, ...canonicalIntake.records].map(p => [p.id, searchText(p, localization)])), [canonicalItems, canonicalIntake, localization]);
  const matchText = (p: { id: string }) => searchIndex.get(p.id) ?? '';
  // Lifecycle decisions always use canonical data, never translated nextLabel/status.
  const stateLabel = (p: Policy) => tr(lifecycle(canonicalItems.find(original => original.id === p.id) ?? p, today));
  const explanationLang = (p: { id: string }, kind: 'policies' | 'intake' = 'policies') => locale === 'zh' || localization[kind][p.id] !== 'current' ? 'zh-CN' : languageTags[locale];
  const originalLang = (p: { id: string; originalLanguage?: string }) => p.originalLanguage ?? localization.sourceLanguages[p.id] ?? 'und';
  const translationNotice = (p: { id: string }, kind: 'policies' | 'intake' = 'policies') => locale !== 'zh' && localization[kind][p.id] !== 'current' ? <span className="translation-note" lang={languageTags[locale]}>
    {tr('当前语言的解读待补充或更新，暂显示已有解读。')}
  </span> : null;
  const sourceTitle = (text: string) => {
    const year = text.match(/20\d{2}/)?.[0];
    return year ? ct(text.replace(year, '2026')).replace('2026', year) : ct(text);
  };
  const note = (text: string | undefined) => locale !== 'zh' && text && !localization.messages[text] ? <>
    <span className="translation-note" lang={languageTags[locale]}>
      {tr('解读待翻译，原始文字如下。')}
    </span>
    <span lang="zh-CN">
      {text}
    </span>
  </> : ct(text);
  const languageControl = <LanguageSwitch
    locale={locale}
    label={tr('语言')}
    onChange={changeLocale} />;
  const dialog = useRef<HTMLDialogElement>(null);
  const regionNav = useRef<HTMLDivElement>(null);
  const navigationMode = useRef<'push' | 'replace'>('replace');
  const loadedPolicies = useRef<Policy[]>([]);
  function restoreNavigation() {
    navigationMode.current = 'replace';
    setLocale(readLocale());
    const f = readNavigation(location.search, loadedPolicies.current);
    setSelectedId(f.selectedId);
    setView(f.view);
    setCountry(f.country);
    setRegion(f.region);
    setQuery(f.query);
    setTags(f.tags);
    setFiltersReady(true);
  }
  const dateInBerlin = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const [today, setToday] = useState(dateInBerlin);
  useEffect(() => {
    const timer = setInterval(() => setToday(dateInBerlin()), 60_000);
    return () => clearInterval(timer);
  }, []);
  async function load() {
    try {
      const response = await fetch('./data.json', { cache: 'no-store' });
      if (!response.ok) throw Error('data-unavailable');
      const data = await response.json() as { policies: Policy[]; status: Status; intake: IntakeData; localization: Localization };
      setLocalization(data.localization ?? emptyLocalization);
      setItems(data.policies);
      loadedPolicies.current = data.policies;
      restoreNavigation();
      setStatus(data.status);
      setIntake(data.intake);
      setError('');
    } catch (e) {
      setError('data-unavailable');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
    setTheme(readTheme());
    restoreNavigation();
    window.addEventListener('popstate', restoreNavigation);
    return () => window.removeEventListener('popstate', restoreNavigation);
  }, []);
  useEffect(() => {
    if (!filtersReady || loading) return;
    const search = navigationSearch(location.search, { view, country, region, query, tags, selectedId });
    if (search !== location.search) history[navigationMode.current === 'replace' ? 'replaceState' : 'pushState'](null, '', location.pathname + search + location.hash);
    navigationMode.current = 'push';
  }, [view, country, region, query, tags, selectedId, filtersReady, loading]);
  useEffect(() => {
    const r = document.documentElement;
    if (theme === 'system') delete r.dataset.theme; else r.dataset.theme = theme;
    try {
      if (theme === 'system') localStorage.removeItem('theme'); else localStorage.setItem('theme', theme);
    } catch { }
  }, [theme]);
  useEffect(() => {
    if (selected && !dialog.current?.open) dialog.current?.showModal(); else if (!selected && dialog.current?.open) dialog.current.close();
  }, [selected]);

  function open(p: Policy) {
    if (countryOf(p.region) !== country) {
      setCountry(countryOf(p.region));
      setRegion('all');
      setTags([]);
    }
    setSelectedId(p.id);
  }
  function close() {
    setSelectedId(null);
  }
  function go(v: string) {
    setView(v);
    window.scrollTo({ top: 0 });
  }
  const toggleTag = (t: string) => setTags(current => current.includes(t) ? current.filter(x => x !== t) : [...current, t]);
  const clearFilters = () => {
    setQuery('');
    setTags([]);
    setRegion('all');
  };
  const scoped = useMemo(() => items.filter(p => countryOf(p.region) === country), [items, country]);
  const records = intake.records.filter(r => countryOf(r.region) === country);
  const countryInfo = countries.find(c => c.id === country) ?? countries[0];
  const countryRegions = regions.filter(r => countryOf(r.id) === country);
  // Fade the region list's clipped edge so it reads as scrollable even where scrollbars are hidden.
  useEffect(() => {
    const el = regionNav.current;
    if (!el) return;
    const update = () => {
      el.toggleAttribute('data-more-above', el.scrollTop > 1);
      el.toggleAttribute('data-more-below', el.scrollTop + el.clientHeight < el.scrollHeight - 1);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      resize.disconnect();
    };
  }, [country]);
  const filters = { view, country, region, query, tags };
  const listing = selectListing(items, intake.records, filters, matchText);
  const { policies: visible, raw: visibleRaw, progress: newRecords } = listing;
  const tagOptions = [...new Set([...scoped.flatMap(policyTags), ...records.flatMap(policyTags), ...tags])].sort((a, b) => ct(a).localeCompare(ct(b), languageTags[locale]));
  const viewCount = (target: string) => selectListing(items, intake.records, { ...filters, view: target }, matchText).count;
  const upcoming = scoped.filter(p => p.nextDate && p.nextDate >= today).sort((a, b) => a.nextDate!.localeCompare(b.nextDate!));
  const regionCount = (id: string) => selectListing(items, intake.records, { ...filters, region: id, view: view === 'sources' ? 'all' : view }, matchText).count;
  const sourceCount = (id: string) => selectListing(items, intake.records, { view: 'all', country, region: id, query: '', tags: [] }).count;
  const pickRegion = (id: string) => {
    setRegion(id);
    if (!['adopted', 'pending', 'all', 'updates', 'intake'].includes(view)) setView('all');
    window.scrollTo({ top: 0 });
  };
  const nextTheme = () => setTheme(theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system');
  const ThemeIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;
  const cname = countryName(country);
  const reviewAt = status.settings['lastReviewAt:' + country];
  const reviewNote = status.settings['reviewNote:' + country];
  const activeSourceUrls = countrySourceUrls(country, items, intake.records, status.discovery ?? []);
  const activeChecks = status.checks.filter(c => activeSourceUrls.has(c.url));
  const filtering = !!(query || tags.length || region !== 'all');
  const events = visible.flatMap(p => p.events.map(e => ({ p, e })));
  const scheduled = events.filter(x => x.e.kind === 'scheduled' && x.e.date >= today).sort((a, b) => a.e.date.localeCompare(b.e.date));
  const happened = events.filter(x => x.e.kind !== 'scheduled').sort((a, b) => b.e.date.localeCompare(a.e.date));
  async function refresh() {
    setBusy(true);
    try {
      await load();
    } finally {
      setBusy(false);
    }
  }
  const nav = [
    { id: 'intake', label: tr("官方进展"), short: tr("进展"), icon: FileText, count: viewCount('intake') },
    { id: 'adopted', label: tr("已经通过"), short: tr("已通过"), icon: LayoutDashboard, count: viewCount('adopted') },
    { id: 'pending', label: tr("待决议题"), short: tr("待决"), icon: Clock3, count: viewCount('pending') },
    { id: 'all', label: tr("全部政策"), short: tr("全部"), icon: Layers, count: viewCount('all') },
    { id: 'updates', label: tr("政策时间线"), short: tr("时间线"), icon: Activity },
    { id: 'sources', label: tr("来源与更新"), short: tr("来源"), icon: Database }];
  const [title, subtitle] = headings[view] ?? headings.adopted;
  const feedRow = ({ p, e }: { p: Policy; e: Policy['events'][number] }) => <button
    className="feed-row"
    key={p.id + e.id}
    onClick={() => open(p)}>
    <time>
      {fmt(e.date)}
    </time>
    <div>
      <small>
        {names(p.region)}
        ·
        {ct(p.topic)}
      </small>
      <h3 lang={explanationLang(p)}>
        {e.title}
      </h3>
      <p>
        {p.title}
      </p>
    </div>
    <ChevronRight size={18} />
  </button>;
  const feedByMonth = () => {
    const out: ReactNode[] = [];
    let month = '';
    for (const x of happened) {
      const m = x.e.date.slice(0, 7);
      if (m !== month) {
        month = m;
        out.push(<h3 className="feed-month" key={'m' + m}>
          {formatDate(m + '-01', locale, { year: 'numeric', month: 'long' })}
        </h3>);
      }
      out.push(feedRow(x));
    }
    return out;
  };
  return <div className="app-shell">
    <aside className="sidebar">
      <a
        className="brand"
        href={"./" + localeSearch("", locale)}
        aria-label={tr("政策雷达首页")}>
        <span className="brand-icon">
          <Radar size={22} />
        </span>
        <span>
          {tr("政策雷达")}
          <small>POLICY RADAR</small>
        </span>
      </a>
      <nav aria-label={tr("主导航")}>
        {nav.map(n => <button
          key={n.id}
          className={'nav-item ' + (view === n.id ? 'active' : '')}
          aria-current={view === n.id ? 'page' : undefined}
          onClick={() => go(n.id)}>
          <n.icon size={18} />
          <span className="nav-label">
            {n.label}
          </span>
          <span className="nav-short">
            {n.short}
          </span>
          {n.count !== undefined && <b>
            {n.count}
          </b>}
        </button>)}
      </nav>
      <p className="sidebar-count-note">
        {tr("数字随筛选变化；官方进展按记录计数。")}
      </p>
      <div className="region-nav" ref={regionNav} aria-label={cname + tr("各地区")}>
        <h2>
          {cname}
        </h2>
        <button aria-current={region === 'all' ? 'true' : undefined} onClick={() => pickRegion('all')}>
          {tr("全部")}
          <b>
            {regionCount('all')}
          </b>
        </button>
        {countryRegions.map(r => {
          const n = regionCount(r.id);
          return <button
            key={r.id}
            className={n ? '' : 'zero'}
            aria-current={region === r.id ? 'true' : undefined}
            onClick={() => pickRegion(r.id)}>
            {localName(r.id)}
            <b>
              {n}
            </b>
          </button>;
        })}
      </div>
      <div className="sidebar-bottom">
        <ShieldCheck size={18} />
        <div>
          {tr("每项变化，都有出处")}
          <small>
            {tr("官方来源 · 政策解读")}
          </small>
        </div>
      </div>
    </aside>

    <div className="workspace">
      <header className="topbar">
        <a className="mobile-brand" href={"./" + localeSearch("", locale)}>
          <Radar size={18} />
          {tr("政策雷达")}
        </a>
        <div className="breadcrumb">
          <span className="crumb-root">
            {tr("观察站")}
          </span>
          <ChevronRight size={14} className="crumb-sep" />
          <CompactSelect
            value={country}
            label={tr("国家／地区")}
            align="left"
            onChange={value => {
              setCountry(value);
              setRegion('all');
              setTags([]);
              setSelectedId(null);
            }}
            options={countries.map(c => ({ value: c.id, label: countryName(c.id) }))} />
          <ChevronRight size={14} className="crumb-sep" />
          <span className="crumb-view">
            {nav.find(n => n.id === view)?.label}
            {region !== 'all' && ' · ' + localName(region)}
          </span>
        </div>
        <div className="top-actions">
          {languageControl}
          <a
            href="./policy-radar-export.json"
            download
            className="quiet-button">
            <Download size={16} />
            <span>
              {tr("导出数据")}
            </span>
          </a>
          <button
            className="theme-button"
            onClick={nextTheme}
            aria-label={tr("外观：") + themeLabel[theme] + tr("，点击切换")}
            title={tr("外观：") + themeLabel[theme]}>
            <ThemeIcon size={17} />
          </button>
        </div>
      </header>
      <main id="main">
        <div className="page-heading">
          <div>
            <h1>
              {title}
            </h1>
            <p>
              {subtitle}
            </p>
          </div>
          {upcoming[0] && <button className="next-chip" onClick={() => open(upcoming[0])}>
            <span className="next-date">
              <small>
                {month(upcoming[0].nextDate!)}
              </small>
              {upcoming[0].nextDate!.slice(8)}
            </span>
            <span>
              <small>
                {tr("下一个已知节点 · 不代表结果")}
              </small>
              {upcoming[0].nextLabel}
            </span>
          </button>}
        </div>

        {error && <div className="notice error" role="alert">
          <AlertCircle size={18} />
          {tr("暂时无法读取政策数据，请稍后重试。")}
          <button onClick={load}>
            {tr("重新加载")}
          </button>
        </div>}

        {loading ? <div className="empty">
          {tr("正在读取政策记录…")}
        </div> : view === 'sources' ? <section className="source-view">
          <div className="section-heading">
            <div>
              <h2>
                {tr("追踪状态")}
              </h2>
              <p>
                {tr("本页展示已发布的来源检查结果。")}
              </p>
            </div>
            <button
              className="primary-button"
              onClick={refresh}
              disabled={busy}>
              <RefreshCw size={16} className={busy ? 'spin' : ''} />
              {busy ? tr("正在加载") : tr("重新加载数据")}
            </button>
          </div>
          <div className="coverage-note">
            {countryInfo.note && <p>
              {tr(countryInfo.note)}
            </p>}
            <strong>
              {tr(countryInfo.scope, [cname, countryRegions.length - 1])}
            </strong>
            <p>
              {tr("从 2026 年 8 月 2 日起，按官方来源收集各类别新公布法律、条例、已通过的决定及待决事项；不按兴趣挑选。此前记录是历史样例，逐步回补。来源已接入不代表文件已全部查完；其他国家尚未接入。")}
            </p>


            <p>
              {tr("上次事实复核：")}
              {reviewAt ? new Date(reviewAt).toLocaleString(languageTags[locale], { timeZone: 'Europe/Berlin' }) : tr("尚未事实复核")}
              ·
              {note(reviewNote)}
            </p>
            <p>
              {tr("“原文检查”只验证访问与文本变化；“日期范围已查完”还需要逐页核对条目。未查完、访问失败或来源未接入，都属于覆盖缺口。")}
            </p>
          </div>
          <h2 className="checks-title">
            {tr("各地区的官方来源")}
          </h2>
          <p className="source-instruction">
            {tr("下列链接均打开官方原文。查看政策内容，请回到政策列表并按地区筛选。")}
          </p>
          <div className="coverage-grid">
            {countryRegions.map(r => <div className="coverage-state" key={r.id}>
              <div className="coverage-state-heading">
                <h3>
                  {names(r.id)}
                </h3>
                <span>
                  {tr('已收录 {0} 项议题与记录', [sourceCount(r.id)])}
                </span>
              </div>
              <small lang={originalRegionName(r.id).language}>
                {originalRegionName(r.id).name}
              </small>
              {(status.discovery ?? []).filter(d => d.region === r.id).map(d => <div className="discovery-source" key={d.url}>
                <span className="discovery-title">
                  {sourceTitle(d.title)}
                </span>
                {(() => {
                  const c = intake.coverage.find(c => c.url === d.url);
                  return <div className="scan-status">
                    <strong>
                      {c?.coveredThrough ? tr("连续核对至 ") + fmt(c.coveredThrough) : tr("尚无连续查全的日期范围")}
                    </strong>
                    <small>
                      {c?.latestScan
                        ? tr("最近核查：")
                          + new Date(c.latestScan.checkedAt).toLocaleString(languageTags[locale], { timeZone: 'Europe/Berlin' })
                          + ' · '
                          + ({ complete: tr("该时间段已查完"), partial: tr("部分完成"), blocked: tr("读取受阻") }[c.latestScan.status])
                        : tr("尚未逐项核查")}
                    </small>
                    {c?.latestScan && <details>
                      <summary>
                        {tr("核查范围与缺口")}
                      </summary>
                      <p>
                        {fmt(c.latestScan.windowStart)}
                        {tr("至")}
                        {fmt(c.latestScan.windowEnd)}
                      </p>
                      <p>
                        {note(c.latestScan.note)}
                      </p>
                      <p>
                        {tr('已登记 {0} 条 · 检查 {1} 个页面', [c.latestScan.recordIds.length, c.latestScan.pages.length])}
                      </p>
                    </details>}
                  </div>;
                })()}
                <a
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={tr("打开官方原文：") + sourceTitle(d.title) + tr("（新标签页）")}>
                  {tr("打开官方原文")}
                  <ExternalLink size={12} />
                  <span className="new-tab-hint">
                    {tr("新标签页")}
                  </span>
                </a>
                <small>
                  {status.checks.find(c => c.url === d.url)?.error ? tr("读取受限 · 待复核") : status.checks.some(c => c.url === d.url) ? tr("已检查原文") : tr("尚未检查原文")}
                </small>
              </div>)}
            </div>)}
          </div>
          <h2 className="checks-title">
            {tr("原文检查记录")}
          </h2>
          <div className="source-list">
            {activeChecks.length ? activeChecks.map(c => <div className="source-row" key={c.url}>
              <FileText size={18} />
              <div>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer">
                  {sourceTitle(items.flatMap(p => p.sources).find(s => s.url === c.url)?.title ?? status.discovery?.find(s => s.url === c.url)?.title ?? new URL(c.url).hostname)}
                  <ExternalLink size={13} />
                </a>
                <small>
                  {tr("检查：")}
                  {new Date(c.checked_at).toLocaleString(languageTags[locale], { timeZone: 'Europe/Berlin' })}
                  {c.last_success_at && c.error ? tr(" · 上次成功：") + new Date(c.last_success_at).toLocaleDateString(languageTags[locale], { timeZone: 'Europe/Berlin' }) : ''}
                </small>
                {c.error && <p className="error-text">
                  {tr(sourceProblem(c.error))}

                  {tr("· 原有记录保留")}
                </p>}
              </div>
              <span className={'badge ' + (c.error ? 'amber' : c.changed ? 'blue' : 'green')}>
                {c.error ? tr("读取失败") : c.changed ? tr("原文有变 · 待核实") : tr("检查完成")}
              </span>
              {c.snapshot_key && <a
                className="snapshot"
                href={'./' + c.snapshot_key + '.bin'}
                download={c.snapshot_key.split('/').pop()}>
                {tr("存档")}
                <Download size={13} />
              </a>}
            </div>) : <div className="empty">
              {tr("尚未运行原文检查。政策详情中已提供核实所用的官方链接。")}
            </div>}
          </div>
        </section> : <div className="content-layout">
          <section className="policy-section">
            <div className="filter-bar">
              <div className="filters">
                <label className="search">
                  <Search size={17} />
                  <input
                    aria-label={tr("搜索政策")}
                    placeholder={tr("搜索政策、关键词或文件编号")}
                    value={query}
                    maxLength={200}
                    onChange={e => setQuery(e.target.value)} />
                  {query && <button aria-label={tr("清空搜索")} onClick={() => setQuery('')}>
                    <X size={15} />
                  </button>}
                </label>
                <label className="select-label region-select">
                  <MapPin size={15} />
                  <select
                    aria-label={tr("地区")}
                    value={region}
                    onChange={e => setRegion(e.target.value)}>
                    <option value="all">
                      {cname}

                      {tr("· 全部")}
                    </option>
                    {countryRegions.map(r => {
                      const n = regionCount(r.id);
                      return <option value={r.id} key={r.id}>
                        {localName(r.id)}
                        {' (' + tr('{0} 项匹配', [n]) + ')'}
                      </option>;
                    })}
                  </select>
                </label>
              </div>
              <div
                className="tag-chips"
                role="group"
                aria-label={tr("类别标签，可多选，匹配任一标签")}>
                {tagOptions.map(t => <button
                  key={t}
                  aria-pressed={tags.includes(t)}
                  onClick={() => toggleTag(t)}>
                  {ct(t)}
                </button>)}
              </div>
              <p className="filter-summary">
                {tags.length ? tr("已选：{0} · 多选匹配任一标签", [tags.map(ct).join(locale === 'zh' ? '、' : ', ')]) : tr("类别可多选，匹配任一标签")}
              </p>
            </div>

            <div className="list-meta">
              <span>
                {view === 'intake'
                  ? tr("{0} 条官方进展记录（同一政策可有多条）", [newRecords.length])
                  : view === 'updates'
                    ? tr("{0} 个时间线节点 · 涉及 {1} 个政策议题", [scheduled.length + happened.length, visible.length])
                    : tr("{0} 项结果 · {1} 个已解读政策议题{2}", [
                        listing.count,
                        visible.length,
                        visibleRaw.length ? tr(" · {0} 条待解读官方记录", [visibleRaw.length]) : ''
                      ])}
              </span>
              {filtering && <button onClick={clearFilters}>
                {tr("清除筛选")}
              </button>}
              <span className="tracking-note">
                {tr("登记起点为 2026.08.02；各国实际核查范围请查看覆盖缺口。")}
                <button onClick={() => go('sources')}>
                  {tr("查看覆盖缺口")}
                </button>
              </span>
            </div>

            {view === 'intake' ? <IntakeView
              records={newRecords}
              policies={items}
              open={open}
              locale={locale}
              localization={localization} /> : region !== 'all' && !sourceCount(region) ? <div className="empty">
                <MapPin size={30} />
                <h3>
                  {names(region)}
                  {tr("尚未收录议题")}
                </h3>
                <p>
                  {tr("这不是“没有政策变化”。该地区的官方入口可在“来源与更新”查看。")}
                </p>
                <button className="quiet-button" onClick={() => setRegion('all')}>
                  {tr('查看{0}全部地区', [cname])}
                </button>
              </div> : !visible.length && !visibleRaw.length ? <div className="empty">
                <Search size={28} />
                <h3>
                  {tr("没有匹配的政策")}
                </h3>
                <p>
                  {tr("试试其他关键词，或调整标签与地区。")}
                </p>
                <button className="quiet-button" onClick={clearFilters}>
                  {tr("清除筛选")}
                </button>
              </div> : view === 'updates' ? <div className="event-feed">
                {scheduled.length > 0 && <>
                  <h3 className="feed-month future">
                    {tr("未来安排 · 不代表结果")}
                  </h3>
                  {scheduled.map(feedRow)}
                </>}
                {feedByMonth()}
              </div> : <>
              {visibleRaw.length > 0 && <div className="raw-group">
                <button
                  className="raw-toggle"
                  aria-expanded={rawOpen}
                  onClick={() => setRawOpen(!rawOpen)}>
                  <span>
                    {tr('待解读官方记录 · {0} 条（点击展开）', [visibleRaw.length])}
                  </span>
                  <ChevronDown size={16} className={rawOpen ? 'flip' : ''} />
                </button>
                {rawOpen && visibleRaw.map(r => <div className="raw-row" key={r.id}>
                  <time>
                    {fmt(r.date)}
                  </time>
                  <div>
                    <strong lang={explanationLang(r, "intake")}>
                      {r.titleZh ?? r.title}
                    </strong>
                    {translationNotice(r, "intake")}
                    <small>
                      {names(r.region)}
                      ·
                      {r.stage === 'adopted' ? tr("已确认通过或公布") : r.stage === 'pending' ? tr("待决") : tr("内容待核实")}

                      {tr("· 政策解读待补充")}
                    </small>
                  </div>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={tr("打开原始文件：") + (r.titleZh ?? r.title) + tr("（新标签页）")}>
                    {tr("原文")}
                    <ExternalLink size={12} />
                  </a>
                </div>)}
              </div>}
              <div className="policy-list">
                {visible.map(p => <button
                  className={'policy-card' + (selected?.id === p.id ? ' current' : '')}
                  onClick={() => open(p)}
                  key={p.id}>
                  {(() => {
                    const k = keyDate(p, today);
                    return <div className={'card-date ' + k.kind}>
                      <strong>
                        {+k.date.slice(8)}
                      </strong>
                      <span>
                        {formatDate(k.date, locale, { year: 'numeric', month: 'short' })}
                      </span>
                      <em>
                        {k.kind === 'next' ? tr("下一步") : k.kind === 'effective' ? tr("生效") : k.kind === 'application' ? tr("适用") : tr("进展")}
                      </em>
                    </div>;
                  })()}
                  <div className="card-main">
                    <div className="card-top">
                      <span className={'badge ' + tone(p, today)}>
                        {stateLabel(p)}
                      </span>
                      <span className="card-category">
                        {names(p.region)}
                        ·
                        {ct(p.topic)}
                      </span>
                      {p.disputed && <span className="dispute-label">
                        {tr("有争议")}
                      </span>}
                    </div>
                    <h2 lang={explanationLang(p)}>
                      {p.title}
                    </h2>
                    {translationNotice(p)}
                    <p className="card-summary" lang={explanationLang(p)}>
                      {p.summary}
                    </p>
                    <div className="card-bottom">
                      <span>
                        <CalendarDays size={14} />
                        {ct(keyDate(p, today).label)}
                        {' '}
                        {fmt(keyDate(p, today).date)}
                      </span>
                      {keyDate(p, today).kind !== 'progress' && <span>
                        <Activity size={14} />
                        {tr('最近进展 {0}', [fmt(p.lastEventDate)])}
                      </span>}
                      <span>
                        <FileText size={14} />
                        {p.sources.length === 1 ? tr('1 个官方来源') : tr('{0} 个官方来源', [p.sources.length])}
                      </span>
                      <span className="card-detail-action">
                        {tr("查看详情")}
                        <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </button>)}
              </div>
            </>}
            <p className="list-footnote">
              {tr("官方进展记录不以是否完成解读为收录条件 · 历史资料逐步回补")}
            </p>
          </section>
          <aside className="right-rail">
            <section className="milestones">
              <div className="rail-title">
                <CalendarDays size={18} />
                <h2>
                  {tr("接下来关注")}
                </h2>
              </div>
              <p className="rail-subtitle">
                {tr("已知安排，不代表结果")}
              </p>
              {upcoming.slice(0, 5).map(p => <button
                className="milestone"
                key={p.id}
                onClick={() => open(p)}>
                <div className="milestone-date">
                  <span>
                    {month(p.nextDate!)}
                  </span>
                  <strong>
                    {p.nextDate!.slice(8)}
                  </strong>
                </div>
                <div>
                  <span className={'mini-label ' + (p.phase === 'pending' ? 'amber-text' : '')}>
                    {tr(nextStepLabel(canonicalItems.find(original=>original.id===p.id)??p))}
                  </span>
                  <h3 lang={explanationLang(p)}>
                    {p.nextLabel}
                  </h3>
                  <p>
                    {names(p.region)}
                  </p>
                </div>
              </button>)}
            </section>
            <section className="reading-note">
              <span className="note-icon">
                <ShieldCheck size={21} />
              </span>
              <h3>
                {tr("通过，和生效之间")}
              </h3>
              <p>
                {tr("内阁提出草案、议会完成表决、正式公布与开始实施，是不同的节点。这里逐项记录，不把计划当成结果。")}
              </p>
              <button onClick={() => go('sources')}>
                {tr("查看来源与覆盖范围")}
                <ChevronRight size={14} />
              </button>
            </section>
          </aside>
        </div>}

        <footer>
          <span>
            {tr("政策雷达")}
            <span className="footer-dot">·</span>

            {tr("以原文为依据，保留不确定性")}
          </span>
          <span>
            {cname}
            /
            {countries.find(c => c.id === country)?.de.toUpperCase()}
          </span>
        </footer>
      </main>
    </div>

    <dialog
      ref={dialog}
      className="drawer"
      onCancel={close}
      onClick={e => {
        if (e.target === e.currentTarget) close();
      }}
      aria-labelledby="detail-title">
      {selected && <div className="detail">
        <div className="detail-top">
          <span>
            {names(selected.region)}

            <span> / </span>

            {ct(selected.topic)}
          </span>
          <div className="detail-actions">
            {languageControl}
            <button
              aria-label={tr("关闭详情")}
              className="icon-button"
              onClick={close}>
              <X size={22} />
            </button>
          </div>
        </div>
        <div className="detail-body">
          <span className={'badge ' + tone(selected, today)}>
            {stateLabel(selected)}
          </span>
          {translationNotice(selected)}
          <PolicyStatusNote
            policy={canonicalItems.find(original=>original.id===selected.id)??selected}
            locale={locale}
            messages={localization.messages}
            today={today}
          />
          <p className="explanation-label">
            {tr("政策解读 · 官方原文见下方来源")}
          </p>
          <h2 id="detail-title" lang={explanationLang(selected)}>
            {selected.title}
          </h2>
          <p className="original-title" lang={originalLang(selected)}>
            {selected.originalTitle}
          </p>
          <div className="date-explanation">
            <CalendarDays size={18} />
            <div>
              <strong>
                {selected.effectiveDate ? tr(selected.effectiveDateKind === 'application' ? "本次要求开始适用：" : "本次改动开始生效：") + fmt(selected.effectiveDate) : selected.phase === 'pending' ? tr("尚未确认通过，没有已生效日期") : tr("开始生效日期尚待核实")}
              </strong>
              <p lang={explanationLang(selected)}>
                {selected.dateExplanation ?? tr("这里记录本次改动的开始生效日期；期限结束和后续步骤在下方时间线单独列出。")}
              </p>
              {selected.nextDate && <p>
                {selected.nextLabel}
                :
                {fmt(selected.nextDate)}
              </p>}
            </div>
          </div>
          <p className="detail-summary" lang={explanationLang(selected)}>
            {selected.summary}
          </p>
          <div className="comparison">
            <div>
              <span>
                {tr("修改之前")}
              </span>
              <p lang={explanationLang(selected)}>
                {selected.before}
              </p>
            </div>
            <div>
              <span>
                {selected.phase === 'pending' ? tr("拟议改变") : tr("修改之后")}
              </span>
              <p lang={explanationLang(selected)}>
                {selected.after}
              </p>
            </div>
          </div>
          <div className="detail-block">
            <h3>
              {tr("影响谁")}
            </h3>
            <p lang={explanationLang(selected)}>
              {selected.impact}
            </p>
          </div>
          <div className="limit-note">
            <AlertCircle size={18} />
            <div>
              <strong>
                {tr("适用范围与例外")}
              </strong>
              <p lang={explanationLang(selected)}>
                {selected.limits}
              </p>
            </div>
          </div>
          {!!selected.rules?.length && <div className="detail-block">
            <h3>
              {selected.phase === 'pending' ? tr("具体想改什么") : tr("具体规定是什么")}
            </h3>
            <ul className="rule-list">
              {selected.rules.map((rule, i) => <li key={i}>
                <strong lang={explanationLang(selected)}>
                  {rule.title}
                </strong>
                <p lang={explanationLang(selected)}>
                  {rule.detail}
                </p>
                <a
                  href={selected.sources.find(s => s.id === rule.sourceId)?.url}
                  target="_blank"
                  rel="noreferrer">
                  {tr("对应官方说明")}
                  <ExternalLink size={12} />
                </a>
              </li>)}
            </ul>
          </div>}
          {selected.dispute && <div className="detail-block">
            <h3>
              {tr("分歧与争议")}
            </h3>
            <p>
              {selected.dispute}
            </p>
          </div>}
          <div className="detail-block">
            <h3>
              {tr("政策时间线")}
            </h3>
            <ol className="timeline">
              {[...selected.events].sort((a, b) => a.date.localeCompare(b.date)).map(e => <li key={e.id} className={e.kind === 'scheduled' ? 'future' : ''}>
                <time>
                  {fmt(e.date)}

                  {e.kind === 'scheduled' && <b>
                    {tr("未来安排")}
                  </b>}
                </time>
                <h4 lang={explanationLang(selected)}>
                  {e.title}
                </h4>
                <p lang={explanationLang(selected)}>
                  {e.detail}
                </p>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={selected.sources.find(s => s.id === e.sourceId)?.url}>
                  {tr("核对来源")}
                  <ExternalLink size={12} />
                </a>
              </li>)}
            </ol>
          </div>
          <div className="detail-block">
            <h3>
              {tr("官方证据")}
              <span>
                {selected.sources.length}
              </span>
            </h3>
            <div className="evidence">
              {selected.sources.map(s => <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noreferrer">
                <FileText size={19} />
                <div>
                  <strong>
                    {s.title}
                  </strong>
                  <small>
                    {s.publisher}
                    ·
                    {s.kind === 'law' ? tr("法律文本") : s.kind === 'parliament' ? tr("议会记录") : tr("官方说明")}
                  </small>
                </div>
                <ExternalLink size={16} />
              </a>)}
            </div>
          </div>
          <div className="policy-tags">
            {policyTags(selected).map(t => <button key={t} onClick={() => {
              setTags([t]);
              setRegion('all');
              setView('all');
              close();
            }}>
              {tr('查看{0}政策', [ct(t)])}
            </button>)}
          </div>
          <details className="politics">
            <summary>
              {tr("谁提出的、如何表决")}
              <span>
                {tr("补充资料")}
              </span>
            </summary>
            {selected.politics?.proposedBy ? <p>
              <strong>
                {tr("提出方：")}
              </strong>
              {selected.politics.proposedBy.name}
              {selected.politics.proposedBy.party && '（' + selected.politics.proposedBy.party + '）'}

              <a
                href={selected.sources.find(s => s.id === selected.politics?.proposedBy?.sourceId)?.url}
                target="_blank"
                rel="noreferrer">
                {tr("来源 ↗")}
              </a>
            </p> : <p>
              {tr("提出方与所属政党：尚未补齐证据。")}
            </p>}
            {selected.politics?.votes?.length ? selected.politics.votes.map((v, i) => <div key={i}>
              <p>
                <strong>
                  {v.body}
                  ·
                  {fmt(v.date)}
                </strong>
                <br />
                {v.result}
              </p>
              {v.counts && <p>
                {tr('赞成 {0} · 反对 {1} · 弃权 {2}', [v.counts.for, v.counts.against, v.counts.abstain])}
              </p>}
              <p>
                {v.note}

                <a
                  href={selected.sources.find(s => s.id === v.sourceId)?.url}
                  target="_blank"
                  rel="noreferrer">
                  {tr("表决依据 ↗")}
                </a>
              </p>
            </div>) : <p>
              {tr("尚未录入表决记录；政府条例也可能无需议会逐项表决。")}
            </p>}
          </details>
          <div className="detail-meta">
            <span>
              {tr("文件标识：")}
              {selected.officialId}
            </span>
            <span>
              {tr("事实核实：")}
              {fmt(selected.verifiedAt)}

              {tr("· URL检查不自动更新此日期")}
            </span>
          </div>
        </div>
      </div>}
    </dialog>
  </div>;
}
