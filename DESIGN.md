# Design — Inspector «Можно» (poster)

Direction: the campaign poster made interactive. «МОЖНО» owns the first screen; the rest of the page stays calm and white.

## Color
- Scene fields (hero, one per campaign story, taken from pack colours): teal #16707c (британец / Quadro K 4–8), green #2f7d33 (джек-рассел / Tabs 2–8), navy #22307a (мейн-кун / Quadro K 8–15), brown #9a5424 (сенбернар / Tabs >16).
- Ink #0c1233 (text, dark sections: pult, seasons, shops, footer). Paper #fff, paper-2 #f2f4fa, line #d9ddea.
- Action blue #1e40c8 (primary buttons), Quadro red #e0212d → #a51008 (slash bar, selector submit, promo, highlights).
- Card fields use a light tint of each SKU's pack colour plus a skewed accent band.

## Type
- Display: Fira Sans Extra Condensed, italic 800/900, uppercase — hero word min(26vw, 380px), H2 clamp(44px, 6.4vw, 96px), line-height .78–.9.
- Text: Golos Text 400–700, body 17px/1.55.

## Shapes & components
- Pills (999px) for buttons, chips, tabs; 18px cards; 28px big panels.
- Signature: red skewed «slash» bar from the logo; diagonal clip-path wipe on scene change; big «4» watermark.
- Selector «pult»: dark ink panel, segmented species, big italic weight numeral, range + chips, red submit.
- Modals: centered on desktop, bottom sheet on mobile; Escape/overlay/button close, focus trap.

## Motion
- Hero: letters rise in with a skew (70 ms stagger), animal and pack settle in, diagonal colour wipe between scenes, scroll parallax.
- Seasons: sticky scroll story (desktop), colour field changes per season.
- Reveal: fade-up once per section block; everything respects prefers-reduced-motion.
