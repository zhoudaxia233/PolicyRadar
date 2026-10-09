import test from 'node:test';
import assert from 'node:assert/strict';
import {chromePath,complete,renderArgs} from '../scripts/render-page.mjs';

test('script-rendered listings use a headless render of the public page only', () => {
 const args=renderArgs('https://www.bundesregierung.de/breg-de/bundesregierung/kabinettsthemen','/tmp/p');
 assert.ok(args.includes('--headless=new')&&args.includes('--dump-dom'));
 assert.equal(args.at(-1),'https://www.bundesregierung.de/breg-de/bundesregierung/kabinettsthemen');
 assert.throws(()=>renderArgs('http://example.org','/tmp/p'));
 assert.throws(()=>renderArgs('file:///etc/passwd','/tmp/p'));
});

test('Chrome location comes from CHROME_PATH or a known install', () => {
 assert.equal(chromePath({CHROME_PATH:'/opt/chrome'},()=>false),'/opt/chrome');
 assert.equal(chromePath({},p=>p==='/usr/bin/chromium'),'/usr/bin/chromium');
 assert.throws(()=>chromePath({},()=>false),/CHROME_PATH/);
});

test('a render counts only once the whole document has been dumped', () => {
 assert.equal(complete(Buffer.from('<html><body>x</body></html>\n')),true);
 assert.equal(complete(Buffer.from('<html><body>partial')),false);
 assert.equal(complete(Buffer.alloc(0)),false);
});
