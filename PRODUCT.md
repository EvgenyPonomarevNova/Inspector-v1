# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Static HTML/CSS/vanilla JS concept prototype (one index.html + assets/), pushed to Git for a demo deploy. Production target stays 1С-Битрикс template `main` (news.list / news.detail components, vanilla JS, no framework). Source: user brief + tech audit 17.09.2026.

## Users
Russian owners of cats and dogs arriving from the «Можно» ad campaign (OLV, KV, radio) on phones first. Job: recognise the ad, find the exact Inspector SKU for their pet's species, weight and age, and jump to a retailer. Secondary: owners with a question about the product who contact the care service (8 800 222-19-65).

## Product Purpose
Brand landing for Inspector Quadro (ЭКОПРОМ) antiparasitic line: tablets, spot-on drops, collar, spray, ear drops. The site does not sell; it routes to partner retailers (Ozon, WB, Яндекс Маркет, 4 Лапы, Petshop, ЗооОптТорг and ~20 more). Success = visits with a click to a retailer / all visits; also selector completion, instruction opens, confirmed enquiries.

## Positioning
Complex protection against 4 groups of parasites (ticks, insects, round and tape worms) in one product, across 5 application forms, «4 сезона защиты» — year-round regular treatment. Campaign idea «Можно»: with Inspector the pet CAN sleep on the pillow, go outdoors, to the dacha, on the bed.

## Operating Context
Main path: ad → campaign first screen → pet parameters (cat/dog, exact weight, age, special state) → SKU card → «Где купить» modal → retailer. Marketplaces get one brand search (client sells via ≥5 partner stores per marketplace); direct SKU links only for 4 Лапы, Petshop, ЗооОптТорг; other stores behind «Показать ещё». Promo slot for trade marketing (promo code, product, dates) managed from Bitrix.

## Capabilities and Constraints
- 18 SKUs: Quadro Tabs 0,5–2 / 2–8 / 8–16 / >16 кг; Quadro drops cats 1–4 / 4–8 / 8–15 кг, dogs 1–4 / 4–10 / 10–25 / 25–40 / 40–60 кг, Mini 0,5–2 кг; collar (cats & small dogs / medium / large dogs); spray; ear drops (separate task, not in selector).
- Selector shows catalog options only; never substitutes nearest dosage, no dosing advice. Weight boundaries per SKU instruction (table from client pending).
- No auto-rotating hero, no video with sound. Disclaimer «Имеются противопоказания. Необходимо проконсультироваться с ветеринарным специалистом» on first screen and near product claims.
- Prototype: visual only — animations, sliders, modals, accordions work; no real backend.

## Brand Commitments
Official Inspector Quadro logo, pack graphics, campaign KV (British cat «спать на подушке», Jack Russell «на природу», Maine Coon «на дачу», Saint Bernard «на кровать»). White base, blue for actions, red Quadro line, big campaign typography (narrow slanted heavy grotesque «МОЖНО»), calm info blocks. Client: design is outdated, structure/content are fine.

## Evidence on Hand
assets/: 4 campaign banners 1920×1080, 4 animal cut-outs (PNG alpha), 4 new pack renders. Live site product PNGs (old packs), retailer logos. No verified reviews or studies: proof block must stay hidden/placeholder. Claims («до 20 недель», «безопасно для беременных») pending verification against instructions — avoid.

## Product Principles
1. The ad must be recognisable in the first second.
2. Selector first: the path to the exact SKU beats information blocks.
3. Every product claim tied to a specific SKU and its instruction; no absolute safety promises.
4. Buying never requires contacts or consent.
5. Clean catalog UI over retailer "button soup".
