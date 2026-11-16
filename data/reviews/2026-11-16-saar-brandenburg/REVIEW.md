# Saarland taxi fares and Brandenburg building fees — 16 November 2026

## Scope and result

Owner request after the 16 November all-country round: explain the Saarland taxi fare ordinance and the Brandenburg building fee announcement, both recorded but left awaiting in that round. No scans; review markers unchanged. Export time is the `exportedAt` of `data/store/meta.json` in this commit.

| Change | Count |
|---|---|
| New explanations | 2: `de-sl-taxi-fares-2027`, `de-bb-building-fees-2027` |
| New topic group | 1: `de-bb-building-fees-2027` (GVBl. II 2026 No. 51 and the ministry release) |
| New regression file | `tests/november-16-saar-brandenburg.test.ts` |

The taxi explanation links to `sl-abl-2026-44-taxi-fares` by identical official ID (Amtsbl. Saarland I 2026 S. 1068).

## Source-located review

- **Saarland taxi fares.** Amtsblatt des Saarlandes Teil I 2026 No. 44 (12 November), pp. 1068–1069: ordinance of 3 November amending § 4 of the taxi fare ordinance; points 1.1–1.5 (basic fare EUR 5.30; day 3.40 / 3.10 / 2.80 per km by band; night, Sundays and holidays 3.40 / 3.20; waiting EUR 45/hour; large-taxi surcharge EUR 11 for more than four passengers; fixed-price corridor +20% / −5% for booked trips); Article 2: in force 1 January 2027. **Current-law baseline not verified:** the previous ordinance is in Amtsblatt No. 42/2025, but the official PDF returned HTTP 404 (recorded as a failed check); search snippets of that file were not used as evidence. The card therefore gives no old amounts and no increase.
- **Brandenburg building fees.** Infrastructure ministry release of 16 November: new Baugebührenordnung and amended Bauvorlagenverordnung from 1 January 2027; degressive fees and cap; examples (detached house 1,915 → 1,505; 12 flats 15,002 → 9,287; 52 flats 93,845 → 48,969; hall 64,050 → 47,250); some fee ranges become time-based; ordinances "to be promulgated shortly". GVBl. II 2026 No. 51 (13 November): Article 1 new application-documents ordinance, Article 4(1) in force 1 January 2027, 2016 ordinance expires. **The fee ordinance is not yet published**; the card is `pending`, all amounts are the ministry's examples, and transitional rules are unknown.

## Reader comprehension check

Taxi: every amount is named as a fare paid per trip, per km or per hour; the example computes an 8 km trip by day (EUR 31.00) and on a Sunday (EUR 31.50) and the fixed-price range (EUR 29.45–37.20), stating the band reading as the site's interpretation. Building fees: amounts are named as permit fees paid to the authority, not construction costs; the example is labelled as the ministry's sample calculation. Each language was read alone and compared for numbers, dates and stage.

## Open leads

- Brandenburg fee ordinance publication in the GVBl and its transitional rules.
- The 2025 Saarland fare ordinance (to state the size of the change).
