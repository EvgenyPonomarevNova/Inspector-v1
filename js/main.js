/* Inspector — redesign concept. Visual prototype: demo data, no backend. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const OLD = 'https://inspector.ekoprom.org/upload/iblock/';
  const ICON = id => `<svg class="icon"><use href="#${id}"/></svg>`;

  /* ─────────── Data (demo) ─────────── */
  const SKU = [
    { id: 't1', form: 'tabs', name: 'Inspector Quadro Tabs', type: 'Таблетки', kinds: ['cat', 'dog'], min: 0.5, max: 2, label: '0,5–2 кг', img: OLD + 'dd8/i12oouwaatm0q94rwekt5w9d1tcdngoh.png', field: '#fbe9ee', accent: '#d2476b', age: 'с 8 недель' },
    { id: 't2', form: 'tabs', name: 'Inspector Quadro Tabs', type: 'Таблетки', kinds: ['cat', 'dog'], min: 2, max: 8, label: '2–8 кг', img: 'img/product-duo-tabs.webp', field: '#e7f1e1', accent: '#5f9e3e', age: 'с 8 недель' },
    { id: 't3', form: 'tabs', name: 'Inspector Quadro Tabs', type: 'Таблетки', kinds: ['cat', 'dog'], min: 8, max: 16, label: '8–16 кг', img: OLD + '626/9mj89tbf8jumnc1iv3rypjx296r3gnio.png', field: '#e5eefa', accent: '#3f7fd0', age: 'с 8 недель' },
    { id: 't4', form: 'tabs', name: 'Inspector Quadro Tabs', type: 'Таблетки', kinds: ['dog'], min: 16, max: 80, label: 'более 16 кг', img: 'img/product-dog-tabs.webp', field: '#f5e9dc', accent: '#b0662d', age: 'с 8 недель' },

    { id: 'dc1', form: 'drops', name: 'Inspector Quadro K', type: 'Капли на холку', kinds: ['cat'], min: 1, max: 4, label: '1–4 кг', img: OLD + '46c/nfka13kx90sqfa3s51yis2ocne6tzlbe.png', field: '#e6f2f0', accent: '#2f9c8f', age: 'с 7 недель' },
    { id: 'dc2', form: 'drops', name: 'Inspector Quadro K', type: 'Капли на холку', kinds: ['cat'], min: 4, max: 8, label: '4–8 кг', img: 'img/product-british-cat.webp', field: '#e2f0f1', accent: '#16707c', age: 'с 7 недель' },
    { id: 'dc3', form: 'drops', name: 'Inspector Quadro K', type: 'Капли на холку', kinds: ['cat'], min: 8, max: 15, label: '8–15 кг', img: 'img/product-maine-cat.webp', field: '#e6e9f6', accent: '#22307a', age: 'с 7 недель' },
    { id: 'dd1', form: 'drops', name: 'Inspector Quadro C', type: 'Капли на холку', kinds: ['dog'], min: 1, max: 4, label: '1–4 кг', img: OLD + '7c8/90ulj8tdepzbmcjzaxi6lkgduevzytg0.png', field: '#fdf0e2', accent: '#e08a2c', age: 'с 7 недель' },
    { id: 'dd2', form: 'drops', name: 'Inspector Quadro C', type: 'Капли на холку', kinds: ['dog'], min: 4, max: 10, label: '4–10 кг', img: OLD + 'fd8/vva410kn3i0yhujddpfp5jxl352ae4qc.png', field: '#eaf3e4', accent: '#4f9a3c', age: 'с 7 недель' },
    { id: 'dd3', form: 'drops', name: 'Inspector Quadro C', type: 'Капли на холку', kinds: ['dog'], min: 10, max: 25, label: '10–25 кг', img: OLD + '25f/yakhyq83g8f1whn0jjep7dia54q0d6mr.png', field: '#e8ecf9', accent: '#3453c1', age: 'с 7 недель' },
    { id: 'dd4', form: 'drops', name: 'Inspector Quadro C', type: 'Капли на холку', kinds: ['dog'], min: 25, max: 40, label: '25–40 кг', img: OLD + 'ff7/4z3mxkhrknljoyx60h17v48pdvvgcmme.png', field: '#f4e8ef', accent: '#a0407a', age: 'с 7 недель' },
    { id: 'dd5', form: 'drops', name: 'Inspector Quadro C', type: 'Капли на холку', kinds: ['dog'], min: 40, max: 60, label: '40–60 кг', img: OLD + 'dc2/nf7jk5681y5heo9vjtzx98uamwjrgoef.png', field: '#f6ebe0', accent: '#8a5a2b', age: 'с 7 недель' },
    { id: 'dm', form: 'drops', name: 'Inspector Mini', type: 'Капли на холку', kinds: ['cat', 'dog'], min: 0.5, max: 2, label: '0,5–2 кг', img: OLD + '753/61fhpdv5kd6pnnclut3vdxgc3a442dx0.png', field: '#eef0f7', accent: '#6b77a8', age: 'с 7 недель' },

    { id: 'c1', form: 'collar', name: 'Ошейник Inspector', type: 'Ошейник', kinds: ['cat', 'dog'], min: 0.5, max: 10, label: 'кошки и мелкие собаки', short: '40 см', img: OLD + 'a1f/v2c505okfv511epsrp4aq3bs16bm63nc.png', field: '#f1ede4', accent: '#8d7a4f', age: 'по инструкции', collar: '40 см · по обхвату шеи' },
    { id: 'c2', form: 'collar', name: 'Ошейник Inspector', type: 'Ошейник', kinds: ['dog'], min: 10, max: 25, label: 'средние собаки', short: '65 см', img: OLD + 'f63/0fh9wu4vxtxoug9ibtg0v2468kd0qjv7.png', field: '#f1ede4', accent: '#8d7a4f', age: 'по инструкции', collar: '65 см · по обхвату шеи' },
    { id: 'c3', form: 'collar', name: 'Ошейник Inspector', type: 'Ошейник', kinds: ['dog'], min: 25, max: 80, label: 'крупные собаки', short: '75 см', img: OLD + '424/e7w60s8mnm9ti95o4rq6p5z9oeuh20on.png', field: '#f1ede4', accent: '#8d7a4f', age: 'по инструкции', collar: '75 см · по обхвату шеи' },

    { id: 's', form: 'spray', name: 'Спрей Inspector', type: 'Спрей', kinds: ['cat', 'dog'], min: 0.5, max: 80, label: 'любой вес', short: '100 мл', img: OLD + 'f16/seyntun8boxp8zs21ocr5ysu1wyc30tn.png', field: '#eef0fb', accent: '#5561c9', age: 'по инструкции', spray: 'расчёт дозы — по инструкции' },
  ];
  const EAR = { id: 'ear', name: 'Ушные капли Inspector', type: 'Ушные капли', label: 'кошки и собаки', img: OLD + '29b/oobxnpbcg2m3h6uf3z85scbhyxdgf1vf.png' };

  const FEAT = {
    tabs: ['Одна таблетка — наружные и внутренние паразиты', 'Со вкусом говядины', 'Гладить и купать — сразу после приёма'],
    drops: ['Контактное и системное действие', 'Наносится на холку', 'Незаметно для питомца'],
    collar: ['Водостойкий', 'Без запаха', 'Длина — по обхвату шеи'],
    spray: ['Быстрое действие после нанесения', 'Обработка поражённых мест', 'Подходит для места содержания'],
  };
  const FORMS = [
    { id: 'all', t: 'Все формы' },
    { id: 'tabs', t: 'Таблетки' },
    { id: 'drops', t: 'Капли' },
    { id: 'collar', t: 'Ошейник' },
    { id: 'spray', t: 'Спрей' },
  ];

  const SHOP = (n, name, url, kind) => ({ name, url, kind, logo: n });
  const LOGO = {
    ozon: OLD + '9f7/15kist9nyry1o6diobhhfnkd6pujvopr.png',
    ym: OLD + 'a79/qjluvzwj0sm866vmms8dn8d2k3o3l3dp.png',
    wb: OLD + '599/y7ew2dna027xuc4x70jc6ba3u8xphdfc.png',
    petshop: OLD + '477/avl072fatem0teop8pr9egjawyi64183.png',
    lapy: OLD + '383/686pkhs70obo0g3283548m9yqmcd14g8.png',
    zoopt: OLD + '8e6/01xi993igm3ebwzk3rq52lob2zkhoijt.png',
    dogeat: OLD + '68d/1syhjxixcop1x9oibsi8sjaoylhq429a.png',
    eapteka: OLD + '3bf/gyrb436vtmqhnh6jagqbwjp39jbtkpfd.png',
    magizoo: OLD + '40c/etiktp8b5w0gol0lnc00mm9j98su1k3z.png',
    onlinetrade: OLD + '3e0/4xyminfwinwj39srt5l9t7x9rt8vfjem.png',
    zoomag: OLD + '7c5/7o5igccqpxsnhh8objtvxbtasn7ttclp.png',
    petfood: OLD + '5c1/j2t0ex9zmgq02m0rps98py5q0u1cna9n.png',
    zoozavr: OLD + 'a96/k10o4p6x0oj3a696yxqt57eb1khkwv2m.png',
    bethowen: OLD + '367/88281g21v20nf76i69c0ucbfw3vk3016.png',
    petsmart: OLD + '783/qit17gc9c8x94o9hs158kv4wu031ijmc.png',
    bagira: OLD + '3df/f7q2eunlmm2wcvzqso0dodz0bohaaopo.png',
    vetna: OLD + '0d1/r5n7azt5tp2ylkastyrznuknrnuizyv9.png',
    zebrazoo: OLD + 'd33/rzgwpga2zesis85to6qnz59vp5b16mt1.png',
    mokryinos: OLD + 'c1e/4itlmc055zvcyftoth38dwk5091ky0rk.png',
    krkrolik: OLD + '73d/slrygqm148zeva7ap5a443qobxdy473l.png',
  };
  const DIRECT = [
    SHOP('lapy', '4 Лапы', 'https://4lapy.ru/brand/inspector/', 'Карточка товара'),
    SHOP('petshop', 'Petshop', 'https://www.petshop.ru/search/?q=inspector', 'Карточка товара'),
    SHOP('zoopt', 'ЗооОптТорг', 'https://zoopt.ru/catalog/brands/inspector/', 'Карточка товара'),
  ];
  const MARKET = [
    SHOP('ozon', 'Ozon', 'https://www.ozon.ru/search/?text=inspector', 'Поиск по бренду'),
    SHOP('wb', 'Wildberries', 'https://www.wildberries.ru/catalog/0/search.aspx?search=inspector', 'Поиск по бренду'),
    SHOP('ym', 'Яндекс Маркет', 'https://market.yandex.ru/search?text=inspector', 'Поиск по бренду'),
  ];
  const REST = [
    SHOP('bethowen', 'Бетховен', 'https://www.bethowen.ru/brand/inspector/'),
    SHOP('magizoo', 'Магизоо', 'https://magizoo.ru/search/index.php?q=inspector'),
    SHOP('eapteka', 'Еаптека', 'https://www.eapteka.ru/search/?q=inspector'),
    SHOP('zoozavr', 'Зоозавр', 'https://zoozavr.ru/'),
    SHOP('petsmart', 'Petsmart', 'https://new.petsmart.ru/brands/133-inspector'),
    SHOP('dogeat', 'Dogeat', 'https://www.dogeat.ru/catalog/?q=inspector'),
    SHOP('onlinetrade', 'Онлайн Трейд', 'https://www.onlinetrade.ru/'),
    SHOP('zoomag', 'Zoomag', 'https://zoomag.ru/search/?q=inspector'),
    SHOP('petfood', 'Petfood', 'https://petfood.ru/catalog/?q=inspector'),
    SHOP('bagira', 'Багира', 'https://bagira-vet.club/catalog/?q=inspector'),
    SHOP('vetna', 'Ветна', 'https://vetna.info/'),
    SHOP('zebrazoo', 'Зебразоо', 'https://zebrazoo.ru/catalog/search/?q=inspector'),
    SHOP('mokryinos', 'Мокрый нос', 'https://mokryinos.ru/catalog/search?q=Inspector'),
    SHOP('krkrolik', 'Красный кролик', 'https://krkrolik.ru/brands/inspector/'),
  ];

  const PESTS = [
    { ico: 'i-tick', n: 'Иксодовые клещи', s: 'Наружные паразиты', d: 'Известные кровососы: могут переносить опасные для животных заболевания. Пик активности — весна и начало осени, в оттепель клещи активны и зимой.' },
    { ico: 'i-flea', n: 'Блохи', s: 'Насекомые', d: 'Вызывают зуд и дерматиты, могут быть переносчиками ленточных гельминтов. В тёплой квартире размножаются круглый год.' },
    { ico: 'i-louse', n: 'Вши и власоеды', s: 'Насекомые', d: 'Укусы вызывают нестерпимый зуд: животные постоянно вылизываются, чешутся и теряют шерсть.' },
    { ico: 'i-round', n: 'Круглые гельминты', s: 'Внутренние паразиты', d: 'Чаще всего живут в кишечнике, но могут поражать любые органы и ткани. «Воруют» питательные вещества и отравляют организм продуктами распада. Могут быть опасны и для человека.' },
    { ico: 'i-tape', n: 'Ленточные гельминты', s: 'Внутренние паразиты', d: 'Локализуются в кишечнике, вызывают интоксикацию и истощение. Заражение часто происходит через блох — поэтому важна комплексная защита.' },
    { ico: 'i-heart', n: 'Дирофилярии', s: 'Внутренние паразиты', d: 'Опасные гельминты, живущие в сердце и сосудах. Переносятся комарами — актуальны в тёплый сезон.' },
    { ico: 'i-mite', n: 'Чесоточные клещи', s: 'Наружные паразиты', d: 'Живут на коже и внутри неё, вызывают сильный зуд, воспаление и выпадение шерсти.' },
  ];

  const STEPS = {
    tabs: { pdf: 'Таблетки Inspector Quadro Tabs · 3 МБ', s: [
      ['Выберите таблетку по весу', 'Ориентируйтесь на точный вес питомца. При необходимости таблетку можно поделить пополам — по инструкции.'],
      ['Дайте в утреннее кормление', 'Скормите таблетку в утреннее кормление или сразу после него.'],
      ['Повторяйте по схеме', 'Интервал повторных обработок — в инструкции к препарату. Отметьте дату, чтобы не пропустить следующую.'],
    ] },
    drops: { pdf: 'Капли Inspector Quadro · 2 МБ', s: [
      ['Выберите пипетку по весу', 'Каждая дозировка рассчитана на свою весовую категорию — не заменяйте её соседней.'],
      ['Нанесите на холку', 'Раздвиньте шерсть и нанесите содержимое пипетки на кожу в области холки, куда питомец не дотянется.'],
      ['Не купайте первые дни', 'Сроки, когда можно купать и гладить, — в инструкции. Повторная обработка — по схеме.'],
    ] },
    collar: { pdf: 'Ошейник Inspector · 3 МБ', s: [
      ['Подберите длину', 'Измерьте обхват шеи: между ошейником и шеей должны проходить два пальца.'],
      ['Застегните и обрежьте лишнее', 'Оставьте 2–3 см свободного конца, лишнее отрежьте.'],
      ['Носите постоянно', 'Срок действия и порядок замены — в инструкции к ошейнику.'],
    ] },
    spray: { pdf: 'Спрей Inspector · 2 МБ', s: [
      ['Рассчитайте дозу', 'Количество нажатий зависит от веса и длины шерсти — таблица в инструкции.'],
      ['Нанесите против шерсти', 'Распылите с расстояния 20–30 см на всю поверхность тела, избегая глаз.'],
      ['Обработайте место содержания', 'Лежанку и переноску тоже можно обработать — это снижает риск повторного заражения.'],
    ] },
  };

  const FAQ = {
    tabs: [
      ['Через какое время после приёма таблетки начинается полноценная защита от внешних паразитов?', 'Сроки начала действия указаны в инструкции к Inspector Quadro Tabs. Ответ в прототипе — заглушка: финальные формулировки согласовывает профильный специалист.'],
      ['Как долго действует таблетка Inspector Quadro Tabs?', 'Длительность защиты и интервал повторного приёма — в инструкции к конкретной дозировке.'],
      ['Можно ли делить таблетки, чтобы подобрать точную дозу?', 'Таблетку можно поделить пополам, если это предусмотрено инструкцией для веса вашего питомца.'],
      ['Если я делю таблетку, можно ли дать оставшуюся часть позже?', 'Порядок хранения оставшейся части описан в инструкции. При сомнениях — позвоните в службу заботы.'],
      ['Можно ли давать таблетки перед прививкой?', 'Обработку от гельминтов перед вакцинацией планируйте вместе с ветеринарным специалистом.'],
    ],
    drops: [
      ['Как правильно наносить капли на холку?', 'Раздвиньте шерсть у основания шеи и нанесите содержимое пипетки на кожу в одну точку или несколько — как указано в инструкции.'],
      ['Как часто использовать капли Inspector?', 'Интервал обработок зависит от вида паразитов и указан в инструкции к препарату.'],
      ['Можно ли купать питомца после нанесения?', 'Сроки, после которых можно купать животное, приведены в инструкции.'],
    ],
    collar: [
      ['Как часто менять ошейник Inspector?', 'Срок действия ошейника указан в инструкции. После этого ошейник заменяют новым.'],
      ['С какого возраста можно использовать ошейник?', 'Минимальный возраст указан в инструкции к ошейнику для вашего питомца.'],
    ],
    spray: [
      ['С какого возраста можно использовать спрей Inspector?', 'Минимальный возраст и ограничения — в инструкции к спрею.'],
      ['Как рассчитать количество нажатий?', 'Доза зависит от веса и длины шерсти; таблица расчёта — в инструкции.'],
    ],
  };

  const SCENES = [
    { key: 'british', shade: '45, 34, 25', theme: '#2d2219', bg: 'img/bg-british.webp', layer: 'img/layer-british.webp', pd: '50% 72%', pm: '72% 50%', slogan: 'спать на подушке', pack: 'img/product-british-cat.webp', packAlt: 'Inspector Quadro K для кошек 4–8 кг' },
    { key: 'jack', shade: '22, 48, 26', theme: '#16301a', bg: 'img/bg-jack.webp', layer: 'img/layer-jack.webp', pd: '50% 78%', pm: '54% 50%', slogan: 'на природу', pack: 'img/product-duo-tabs.webp', packAlt: 'Inspector Quadro Tabs 2–8 кг' },
    { key: 'maine', shade: '20, 42, 72', theme: '#142a48', bg: 'img/bg-maine.webp', layer: 'img/layer-maine.webp', pd: '50% 100%', pm: '84% 50%', slogan: 'на дачу', pack: 'img/product-maine-cat.webp', packAlt: 'Inspector Quadro K для кошек 8–15 кг' },
    { key: 'saint', shade: '43, 20, 12', theme: '#2b140c', bg: 'img/bg-saint.webp', layer: 'img/layer-saint.webp', pd: '50% 70%', pm: '68% 50%', slogan: 'на кровать', pack: 'img/product-dog-tabs.webp', packAlt: 'Inspector Quadro Tabs для собак более 16 кг' },
  ];

  const SEASONS = [
    { key: 'winter', ico: 'i-winter', name: 'Зима', months: 'дек — фев', tone: '18, 32, 66', img: 'https://images.unsplash.com/photo-1558430100-fa153c59d51a', p: '60% 40%', by: 'Anastasia Ulyanova',
      h: 'Зимой можно', em: 'играть в снегу', t: 'Паразиты не впадают в спячку: в тёплой квартире блохи и гельминты активны круглый год, а в оттепель просыпаются клещи.', tags: ['Блохи в квартире', 'Гельминты', 'Клещи в оттепель'] },
    { key: 'spring', ico: 'i-spring', name: 'Весна', months: 'мар — май', tone: '30, 52, 30', img: 'https://images.unsplash.com/photo-1589538923929-76e12402048b', p: '70% 50%', by: 'Keanu K',
      h: 'Весной можно', em: 'на природу', t: 'С первым теплом начинается пик активности иксодовых клещей. Самое время возобновить регулярные обработки по инструкции.', tags: ['Иксодовые клещи', 'Блохи', 'Гельминты'] },
    { key: 'summer', ico: 'i-summer', name: 'Лето', months: 'июн — авг', tone: '52, 58, 14', img: 'https://images.unsplash.com/photo-1783441286721-893acb9a5a46', p: '65% 50%', by: 'Wojciech Wyszkowski',
      h: 'Летом можно', em: 'на дачу', t: 'Трава, водоёмы, другие животные — летом питомец чаще встречается с блохами, клещами и переносчиками дирофилярий.', tags: ['Клещи', 'Комары — дирофилярии', 'Блохи, вши, власоеды'] },
    { key: 'autumn', ico: 'i-autumn', name: 'Осень', months: 'сен — ноя', tone: '64, 28, 10', img: 'https://images.unsplash.com/photo-1635518052453-6f82405f2422', p: '70% 50%', by: 'Karina B.',
      h: 'Осенью можно', em: 'гулять в парке', t: 'Вторая волна клещей приходится на сентябрь–октябрь. Регулярная защита по схеме из инструкции — чтобы питомец был рядом без опасений.', tags: ['Вторая волна клещей', 'Гельминты', 'Блохи'] },
  ];

  /* ─────────── Helpers ─────────── */
  const fmtKg = v => String(Math.round(v * 10) / 10).replace('.', ',');
  const plural = (n, a, b, c) => { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? a : (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20) ? b : c); };
  const toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('is-on'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('is-on'), 2200); };
  const imgTag = (src, alt, cls = '') => `<img class="${cls}" src="${src}" alt="${alt}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'card__fallback',textContent:'Inspector'}))">`;

  /* ─────────── Header ─────────── */
  const hdr = $('#hdr');
  const hero = $('#hero');
  const mbar = $('#mbar');
  const onScroll = () => {
    const y = scrollY;
    hdr.classList.toggle('is-solid', y > hero.offsetHeight - 70);
    hdr.classList.toggle('is-scrolled', y > 20);
    mbar.classList.toggle('is-on', y > 500);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  $('#burger').addEventListener('click', e => {
    const open = hdr.classList.toggle('menu-open');
    e.currentTarget.setAttribute('aria-expanded', open);
  });
  $$('.hdr__nav a').forEach(a => a.addEventListener('click', () => hdr.classList.remove('menu-open')));

  /* ─────────── Hero scenes ─────────── */
  const bgs = $('#heroBgs'), layers = $('#heroLayers');
  const mk = (src, s, eager) => { const i = new Image(); i.src = src; i.alt = ''; i.decoding = 'async'; if (!eager) i.loading = 'lazy'; i.style.setProperty('--pd', s.pd); i.style.setProperty('--pm', s.pm); return i; };
  SCENES.forEach((s, k) => { bgs.append(mk(s.bg, s, k === 0)); layers.append(mk(s.layer, s, k === 0)); });
  const bgImgs = [...bgs.children], lyImgs = [...layers.children];
  let sceneIdx = -1, sceneT;
  const setScene = (i, instant) => {
    const s = SCENES[i];
    const prev = sceneIdx; sceneIdx = i;
    $$('.scene-btn').forEach((b, k) => b.setAttribute('aria-pressed', k === i));
    hero.style.setProperty('--shade', s.shade);
    document.querySelector('meta[name=theme-color]').content = s.theme;
    [bgImgs, lyImgs].forEach(list => list.forEach(im => { im.loading = 'eager'; }));
    const swap = () => {
      [bgImgs, lyImgs].forEach(list => list.forEach((im, k) => { im.classList.toggle('is-on', k === i); im.classList.remove('is-enter'); }));
    };
    if (instant || reduce || prev < 0) swap();
    else {
      clearTimeout(sceneT);
      [bgImgs, lyImgs].forEach(list => { list[i].classList.remove('is-enter'); void list[i].offsetWidth; list[i].classList.add('is-enter'); });
      sceneT = setTimeout(swap, 1000);
      hero.classList.remove('is-intro'); void hero.offsetWidth; hero.classList.add('is-intro');
    }
    const sl = $('#heroSlogan');
    sl.textContent = s.slogan; sl.classList.remove('is-in'); void sl.offsetWidth; sl.classList.add('is-in');
    const pk = $('#heroPack');
    pk.querySelector('img').src = s.pack; pk.querySelector('img').alt = 'Упаковка ' + s.packAlt;
    pk.classList.remove('is-in'); void pk.offsetWidth; pk.classList.add('is-in');
  };
  $$('.scene-btn').forEach(b => b.addEventListener('click', () => { const i = +b.dataset.scene; if (i !== sceneIdx) setScene(i); }));
  // campaign story from the ad link, no auto-rotation: ?scene=jack
  const q = new URLSearchParams(location.search).get('scene');
  const qi = SCENES.findIndex(s => s.key === q);
  setScene(qi > -1 ? qi : 0, true);

  // parallax: photo and its cut-out layer move together, the word drifts slower
  if (!reduce) {
    let raf;
    addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(scrollY, innerHeight);
        const t = `translate3d(0, ${y * 0.22}px, 0)`;
        $('.hero__media').style.transform = t; layers.style.transform = t;
        $('.hero__word').style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
        $('#heroPack').style.translate = `0 ${y * -0.12}px`;
      });
    }, { passive: true });
  }

  /* ─────────── Selector ─────────── */
  const state = { kind: 'cat', w: 4.5, age: 'adult', special: false, form: 'all' };
  const wIn = $('#wIn'), wRange = $('#wRange');
  const syncRange = () => wRange.style.setProperty('--p', ((wRange.value - wRange.min) / (wRange.max - wRange.min) * 100) + '%');
  const setW = (v, from) => {
    v = Math.max(0.5, Math.min(80, +v || 0.5));
    state.w = v;
    if (from !== 'in') wIn.value = fmtKg(v).replace(',', '.');
    if (from !== 'range') wRange.value = Math.min(60, v);
    syncRange();
    render();
  };
  // weight "ticks" animation when chip pressed
  const tickTo = target => {
    if (reduce) return setW(target);
    const from = state.w, t0 = performance.now(), dur = 450;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      const v = Math.round((from + (target - from) * e) * 10) / 10;
      wIn.value = v; wRange.value = Math.min(60, v); syncRange();
      if (k < 1) requestAnimationFrame(step); else setW(target);
    };
    requestAnimationFrame(step);
  };
  const chips = { cat: [2, 4, 8], dog: [4, 10, 25, 40] };
  const renderChips = () => {
    $('#wChips').innerHTML = chips[state.kind].map(v => `<button type="button" class="chip" data-w="${v}">${v} кг</button>`).join('');
  };
  $('#wChips').addEventListener('click', e => { const b = e.target.closest('[data-w]'); if (b) tickTo(+b.dataset.w); });
  wIn.addEventListener('input', () => setW(wIn.value, 'in'));
  wRange.addEventListener('input', () => setW(wRange.value, 'range'));
  $$('.seg [data-kind]').forEach(b => b.addEventListener('click', () => {
    state.kind = b.dataset.kind;
    $$('.seg [data-kind]').forEach(x => x.setAttribute('aria-pressed', x === b));
    if (state.kind === 'cat' && state.w > 15) tickTo(4.5);
    if (state.kind === 'dog' && state.w < 1) tickTo(10);
    renderChips(); render();
  }));
  $('#age').addEventListener('change', e => { state.age = e.target.value; render(); });
  $$('[data-special]').forEach(c => c.addEventListener('change', () => { state.special = $$('[data-special]').some(x => x.checked); render(); }));
  $('#goPick').addEventListener('click', () => { render(true); $('#results').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); });

  const matches = () => SKU.filter(s => s.kinds.includes(state.kind) && state.w >= s.min && (state.w < s.max || (s.max === 80 && state.w <= 80)));
  const renderFormFilter = list => {
    const count = id => id === 'all' ? list.length : list.filter(s => s.form === id).length;
    $('#formFilter').innerHTML = FORMS.map(f => `<button class="ftab" type="button" aria-pressed="${state.form === f.id}" data-form="${f.id}" ${count(f.id) ? '' : 'disabled style="opacity:.4"'}>${f.t}<sup>${count(f.id)}</sup></button>`).join('');
  };
  $('#formFilter').addEventListener('click', e => { const b = e.target.closest('[data-form]'); if (!b) return; state.form = b.dataset.form; render(); });

  const kindLabel = k => k.length === 2 ? 'кошки и собаки' : (k[0] === 'cat' ? 'кошки' : 'собаки');
  const cardHTML = (s, i = 0) => `
    <article class="card is-enter" style="--i:${i};--field:${s.field};--accent:${s.accent}">
      <div class="card__pic">
        <span class="card__badge">${s.short || s.label}</span>
        <span class="card__form">${s.type}</span>
        ${imgTag(s.img, s.name + ' ' + s.label)}
      </div>
      <div class="card__body">
        <h3 class="card__name">${s.name}</h3>
        <p class="card__for">${s.type} для ${s.kinds.length === 2 ? 'кошек и собак' : (s.kinds[0] === 'cat' ? 'кошек' : 'собак')}${s.form === 'collar' ? ' — ' + s.label : ', ' + s.label}</p>
        <ul class="card__facts">
          <li>${ICON(s.kinds[0] === 'cat' ? 'i-paw' : 'i-paw')}${kindLabel(s.kinds)}</li>
          <li>${ICON('i-scale')}${s.collar || s.spray || s.label}</li>
          <li>${ICON('i-age')}${s.age}</li>
        </ul>
        <ul class="card__feat">${FEAT[s.form].map(f => `<li>${f}</li>`).join('')}</ul>
        <div class="card__acts">
          <a class="card__pdf" href="#">${ICON('i-doc')}Инструкция</a>
          <button class="btn btn--sm" data-buy="${s.id}">Где купить <svg class="icon arr"><use href="#i-arrow"/></svg></button>
        </div>
        <p class="card__warn">Есть противопоказания, нужна консультация специалиста</p>
      </div>
    </article>`;

  const render = () => {
    const list = matches();
    if (state.form !== 'all' && !list.some(s => s.form === state.form)) state.form = 'all';
    renderFormFilter(list);
    const shown = state.form === 'all' ? list : list.filter(s => s.form === state.form);
    const box = $('#results');
    const who = state.kind === 'cat' ? 'кошки' : 'собаки';
    if (state.special || state.age === 'baby') {
      $('#resMeta').innerHTML = `Для ${who} ${fmtKg(state.w)} кг: <b>нужна консультация</b>`;
      box.innerHTML = `<div class="consult card is-enter">
        <div class="consult__ico">${ICON('i-chat')}</div>
        <div><h3>${state.age === 'baby' ? 'Для котят и щенков младше 8 недель' : 'Особое состояние питомца'} — сначала консультация</h3>
        <p>Беременность, лактация, заболевания, приём других препаратов и очень юный возраст требуют индивидуального решения. Мы не подбираем препарат автоматически — позвоните в службу заботы или покажите питомца ветеринарному специалисту.</p></div>
        <div style="display:grid;gap:10px"><a class="btn" href="#care">Задать вопрос</a><a class="link-arrow" href="tel:88002221965" style="justify-content:center"><span>8 800 222-19-65</span></a></div>
      </div>`;
      $('#formFilter').innerHTML = '';
      return;
    }
    if (!list.length) {
      $('#resMeta').innerHTML = `Для ${who} ${fmtKg(state.w)} кг: <b>нет подходящей позиции</b>`;
      box.innerHTML = `<div class="consult card is-enter">
        <div class="consult__ico">${ICON('i-scale')}</div>
        <div><h3>Для такого веса в линейке нет подходящей дозировки</h3>
        <p>Мы не подставляем ближайшую дозировку. Проверьте вес или уточните у специалиста, какой вариант подойдёт вашему питомцу.</p></div>
        <a class="btn" href="#care">Спросить специалиста</a>
      </div>`;
      return;
    }
    $('#resMeta').innerHTML = `Для ${who} ${fmtKg(state.w)} кг подходит: <b>${list.length} ${plural(list.length, 'позиция', 'позиции', 'позиций')}</b>`;
    box.innerHTML = shown.map(cardHTML).join('');
  };
  renderChips(); syncRange(); render();

  /* ─────────── Buy modal ─────────── */
  const shopTile = s => `<a class="retailer" href="${s.url}" target="_blank" rel="noopener">
      <span><img src="${LOGO[s.logo]}" alt="${s.name}" loading="lazy" onerror="this.replaceWith(document.createTextNode('${s.name}'))">${s.kind ? `<small>${s.kind}</small>` : ''}</span>${ICON('i-ext')}</a>`;
  $('#buyDirect').innerHTML = DIRECT.map(shopTile).join('');
  $('#buyMarket').innerHTML = MARKET.map(shopTile).join('');
  $('#buyRest').innerHTML = REST.map(shopTile).join('');
  $('#buyMoreBtn').addEventListener('click', e => {
    const open = $('#buyMore').classList.toggle('is-open');
    e.currentTarget.setAttribute('aria-expanded', open);
    e.currentTarget.querySelector('span').textContent = open ? 'Скрыть' : 'Показать ещё магазины';
  });

  let lastFocus;
  const openModal = id => {
    const m = $('#' + id);
    lastFocus = document.activeElement;
    m.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => m.querySelector('.modal__x').focus(), 60);
  };
  const closeModal = m => {
    m.classList.remove('is-open');
    document.body.style.overflow = '';
    lastFocus && lastFocus.focus();
  };
  $$('.modal').forEach(m => m.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(m); }));
  addEventListener('keydown', e => {
    if (e.key === 'Escape') $$('.modal.is-open').forEach(closeModal);
    if (e.key === 'Tab') {
      const m = $('.modal.is-open'); if (!m) return;
      const f = $$('a,button,input,select,textarea', m).filter(x => x.offsetParent);
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
      else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
    }
  });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-buy]');
    if (b) {
      const s = b.dataset.buy === 'ear' ? EAR : SKU.find(x => x.id === b.dataset.buy);
      $('#buyImg').src = s.img; $('#buyImg').alt = s.name;
      $('#buyTitle').textContent = `${s.name} · ${s.short || s.label}`;
      $('#buySub').textContent = `${s.type} · выбранная позиция сохранится при переходе`;
      $('#buyMore').classList.remove('is-open');
      $('#buyMoreBtn span').textContent = 'Показать ещё магазины';
      openModal('buy');
    }
    const o = e.target.closest('[data-open]');
    if (o) openModal(o.dataset.open);
  });

  /* ─────────── Gallery ─────────── */
  const galN = 4; let gi = 0;
  const caps = ['Можно спать на подушке', 'Можно на природу', 'Можно на дачу', 'Можно на кровать'];
  $('#galDots').innerHTML = caps.map((c, i) => `<button aria-label="${c}" aria-current="${i === 0}"></button>`).join('');
  const galGo = i => {
    gi = (i + galN) % galN;
    $('#galTrack').style.transform = `translateX(${-gi * 100}%)`;
    $$('#galDots button').forEach((b, k) => b.setAttribute('aria-current', k === gi));
    $('#galCap').textContent = caps[gi] + ' · ключевой визуал кампании';
  };
  $('#galPrev').addEventListener('click', () => galGo(gi - 1));
  $('#galNext').addEventListener('click', () => galGo(gi + 1));
  $('#galDots').addEventListener('click', e => { const b = e.target.closest('button'); if (b) galGo([...b.parentNode.children].indexOf(b)); });
  let gx = null;
  $('#galTrack').addEventListener('pointerdown', e => gx = e.clientX);
  $('#galTrack').addEventListener('pointerup', e => { if (gx === null) return; const d = e.clientX - gx; if (Math.abs(d) > 40) galGo(gi + (d < 0 ? 1 : -1)); gx = null; });

  /* ─────────── Promo ─────────── */
  $('#copyCode').addEventListener('click', () => {
    navigator.clipboard?.writeText($('#promoCode').textContent).catch(() => {});
    $('#copyCode').textContent = 'Скопировано';
    toast('Промокод МОЖНО15 скопирован');
    setTimeout(() => $('#copyCode').textContent = 'Скопировать', 2000);
  });

  /* ─────────── Seasons slider ─────────── */
  const ss = $('#seasons'), ssSlides = $('#ssSlides'), ssText = $('#ssText'), ssNav = $('#ssNav');
  const DUR = 7000;
  ssSlides.innerHTML = SEASONS.map((x, k) => `<div class="ss__slide" style="--tone:${x.tone};--p:${x.p}"><img src="${x.img}?w=2000&q=72&auto=format&fit=crop" alt="" ${k ? 'loading="lazy"' : ''} onerror="this.remove()"><span class="ss__credit">Фото: ${x.by} / Unsplash</span></div>`).join('');
  ssNav.innerHTML = SEASONS.map((x, k) => `<button class="ss__tab" role="tab" aria-selected="false" data-s="${k}" style="--dur:${DUR}ms"><i></i>${ICON(x.ico)}<b>${x.name}</b><small>${x.months}</small></button>`).join('');
  const slides = $$('.ss__slide', ssSlides), tabs = $$('.ss__tab', ssNav);
  let si = -1, ssTimer, ssSwap, ssInView = false;
  const ssGo = (i, dir) => {
    i = (i + SEASONS.length) % SEASONS.length;
    if (i === si) return;
    const back = dir === -1 || (dir === undefined && i < si);
    const prev = si; si = i;
    const x = SEASONS[i];
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); const bar = t.querySelector('i'); bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; });
    ssText.innerHTML = `<span class="ss__chip">${ICON(x.ico)}${x.name} · ${x.months}</span><h3>${x.h}<em>${x.em}</em></h3><p>${x.t}</p><ul>${x.tags.map(g => `<li>${g}</li>`).join('')}</ul>`;
    clearTimeout(ssSwap);
    if (prev < 0 || reduce) slides.forEach((s, k) => { s.classList.toggle('is-on', k === i); s.classList.remove('is-enter', 'is-back'); });
    else {
      const s = slides[i];
      s.classList.remove('is-enter', 'is-back'); void s.offsetWidth; s.classList.add('is-enter'); s.classList.toggle('is-back', back);
      ssSwap = setTimeout(() => slides.forEach((z, k) => { z.classList.toggle('is-on', k === i); z.classList.remove('is-enter', 'is-back'); }), 1100);
    }
    ssSchedule();
  };
  const ssSchedule = () => { clearTimeout(ssTimer); if (!reduce && ssInView && !ss.classList.contains('is-paused')) ssTimer = setTimeout(() => ssGo(si + 1, 1), DUR); };
  ssNav.addEventListener('click', e => { const t = e.target.closest('[data-s]'); if (t) ssGo(+t.dataset.s); });
  ssNav.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { ssGo(si + 1, 1); tabs[si].focus(); } if (e.key === 'ArrowLeft') { ssGo(si - 1, -1); tabs[si].focus(); } });
  ss.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { ss.classList.add('is-paused'); clearTimeout(ssTimer); } });
  ss.addEventListener('pointerleave', () => { ss.classList.remove('is-paused'); const t = tabs[si]?.querySelector('i'); if (t) { t.style.animation = 'none'; void t.offsetWidth; t.style.animation = ''; } ssSchedule(); });
  let sx = null;
  ss.addEventListener('pointerdown', e => { if (!e.target.closest('button')) sx = e.clientX; });
  ss.addEventListener('pointerup', e => { if (sx === null) return; const d = e.clientX - sx; sx = null; if (Math.abs(d) > 50) ssGo(si + (d < 0 ? 1 : -1), d < 0 ? 1 : -1); });
  new IntersectionObserver(([e]) => { ssInView = e.isIntersecting; if (ssInView) ssSchedule(); else clearTimeout(ssTimer); }, { threshold: .4 }).observe(ss);
  ssGo(0);

  /* ─────────── Pests (compact) ─────────── */
  const GROUPS = [
    { ico: 'i-tick', c: '#c7362b', n: 'Клещи', l: ['иксодовые', 'чесоточные', 'ушные'], d: 'Переносят опасные заболевания, вызывают зуд и воспаление кожи.' },
    { ico: 'i-flea', c: '#1e40c8', n: 'Насекомые', l: ['блохи', 'вши', 'власоеды'], d: 'Зуд и дерматиты; блохи могут переносить ленточных гельминтов.' },
    { ico: 'i-round', c: '#2f7d33', n: 'Круглые гельминты', l: ['нематоды', 'дирофилярии'], d: 'Поражают кишечник, сердце и сосуды; часть опасна и для человека.' },
    { ico: 'i-tape', c: '#9a5424', n: 'Ленточные гельминты', l: ['цестоды'], d: 'Истощают и отравляют организм; заражение часто через блох.' },
  ];
  $('#pestsList').innerHTML = GROUPS.map((g, i) => `
    <li class="pg rv" style="--c:${g.c}">
      <div class="pg__top"><span class="pg__ico"><svg class="icon" viewBox="0 0 48 48"><use href="#${g.ico}"/></svg></span><span class="pg__n">${i + 1}</span></div>
      <h3>${g.n}</h3>
      <ul>${g.l.map(x => `<li>${x}</li>`).join('')}</ul>
      <p>${g.d}</p>
    </li>`).join('');

  /* ─────────── Catalog slider ─────────── */
  const catTrack = $('#catTrack');
  let catForm = 'tabs';
  const catTabs = FORMS.filter(f => f.id !== 'all');
  const renderCatTabs = () => $('#catTabs').innerHTML = catTabs.map(f => `<button class="ftab" aria-pressed="${catForm === f.id}" data-cf="${f.id}">${f.t}<sup>${SKU.filter(s => s.form === f.id).length}</sup></button>`).join('');
  const renderCat = () => {
    catTrack.innerHTML = SKU.filter(s => s.form === catForm).map(cardHTML).join('');
    catTrack.scrollLeft = 0; updBar();
  };
  $('#catTabs').addEventListener('click', e => { const b = e.target.closest('[data-cf]'); if (!b) return; catForm = b.dataset.cf; renderCatTabs(); renderCat(); });
  const updBar = () => {
    const max = catTrack.scrollWidth - catTrack.clientWidth;
    const vis = catTrack.clientWidth / catTrack.scrollWidth;
    const bar = $('#catBar');
    bar.style.width = (vis * 100) + '%';
    bar.style.transform = `translateX(${max > 0 ? (catTrack.scrollLeft / max) * (1 / vis - 1) * 100 : 0}%)`;
    $('#catPrev').disabled = catTrack.scrollLeft < 5;
    $('#catNext').disabled = catTrack.scrollLeft > max - 5;
  };
  catTrack.addEventListener('scroll', updBar, { passive: true });
  addEventListener('resize', updBar);
  const stepW = () => (catTrack.firstElementChild?.offsetWidth || 300) + 18;
  $('#catPrev').addEventListener('click', () => catTrack.scrollBy({ left: -stepW() }));
  $('#catNext').addEventListener('click', () => catTrack.scrollBy({ left: stepW() }));
  // drag to scroll (desktop)
  let dx = null, sl = 0, moved = false;
  catTrack.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.target.closest('button,a')) return; dx = e.clientX; sl = catTrack.scrollLeft; moved = false; catTrack.classList.add('is-drag'); });
  addEventListener('pointermove', e => { if (dx === null) return; const d = e.clientX - dx; if (Math.abs(d) > 4) moved = true; catTrack.scrollLeft = sl - d; });
  addEventListener('pointerup', () => { if (dx === null) return; dx = null; catTrack.classList.remove('is-drag'); });
  catTrack.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  renderCatTabs(); renderCat();

  /* ─────────── How to use ─────────── */
  let howForm = 'tabs';
  const renderHow = () => {
    $('#howTabs').innerHTML = catTabs.map(f => `<button class="ftab" aria-pressed="${howForm === f.id}" data-hf="${f.id}">${f.t}</button>`).join('');
    const d = STEPS[howForm];
    $('#steps').innerHTML = d.s.map((s, i) => `<div class="step is-in" style="--i:${i}"><span class="step__n">${i + 1}</span><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('');
    $('#howPdfMeta').textContent = d.pdf;
  };
  $('#howTabs').addEventListener('click', e => { const b = e.target.closest('[data-hf]'); if (!b) return; howForm = b.dataset.hf; renderHow(); });
  renderHow();

  /* ─────────── Tick months ─────────── */
  const M = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const LV = [1, 1, 2, 3, 3, 3, 2, 2, 3, 3, 2, 1];
  const LC = { 1: ['#c9cfe2', 22], 2: ['#f09a55', 56], 3: ['var(--red)', 96] };
  $('#months').innerHTML = M.map((m, i) => `<div class="month" style="--i:${i};--c:${LC[LV[i]][0]};--h:${LC[LV[i]][1]}%"><i></i><span>${m}</span></div>`).join('');

  /* ─────────── Shops ─────────── */
  const bigShop = s => `<a class="shop" href="${s.url}" target="_blank" rel="noopener"><img src="${LOGO[s.logo]}" alt="${s.name}" loading="lazy" onerror="this.outerHTML='<span class=shop__name>${s.name}</span>'"><span class="shop__go">${ICON('i-ext')}</span></a>`;
  $('#shopsMain').innerHTML = [...MARKET.slice(0, 2), MARKET[2], DIRECT[0], DIRECT[1]].map(bigShop).join('');
  $('#shopsRest').innerHTML = [DIRECT[2], ...REST].map(bigShop).join('');
  $('#shopsToggle').addEventListener('click', e => {
    const o = $('#shopsMore').classList.toggle('is-open');
    e.currentTarget.setAttribute('aria-expanded', o);
    e.currentTarget.textContent = o ? 'Свернуть' : `Показать ещё ${REST.length + 1} ${plural(REST.length + 1, 'магазин', 'магазина', 'магазинов')}`;
  });
  $('#shopsToggle').textContent = `Показать ещё ${REST.length + 1} ${plural(REST.length + 1, 'магазин', 'магазина', 'магазинов')}`;

  /* ─────────── FAQ ─────────── */
  let faqForm = 'tabs';
  const renderFaq = () => {
    $('#faqTabs').innerHTML = catTabs.map(f => `<button class="ftab" aria-pressed="${faqForm === f.id}" data-qf="${f.id}">${f.t}</button>`).join('');
    $('#faqList').innerHTML = FAQ[faqForm].map((q, i) => `
      <div class="qa${i === 0 ? ' is-open' : ''}">
        <button class="qa__q" aria-expanded="${i === 0}">${q[0]}<span class="pest__plus" aria-hidden="true"></span></button>
        <div class="qa__a"><div><p>${q[1]}</p></div></div>
      </div>`).join('');
  };
  $('#faqTabs').addEventListener('click', e => { const b = e.target.closest('[data-qf]'); if (!b) return; faqForm = b.dataset.qf; renderFaq(); });
  $('#faqList').addEventListener('click', e => {
    const b = e.target.closest('.qa__q'); if (!b) return;
    const o = b.parentNode.classList.toggle('is-open'); b.setAttribute('aria-expanded', o);
  });
  renderFaq();

  /* ─────────── Care form (visual states only) ─────────── */
  $('#cSku').innerHTML = '<option>Не выбран</option>' + SKU.map(s => `<option>${s.name} · ${s.short || s.label}</option>`).join('');
  $$('.chan button').forEach(b => b.addEventListener('click', () => {
    $$('.chan button').forEach(x => x.setAttribute('aria-pressed', x === b));
    const mail = b.dataset.chan === 'mail';
    $('#cContactL').textContent = mail ? 'Email' : 'Телефон';
    const i = $('#cContact'); i.type = mail ? 'email' : 'tel'; i.placeholder = mail ? 'name@example.ru' : '+7 (___) ___-__-__'; i.autocomplete = mail ? 'email' : 'tel'; i.value = '';
  }));
  $('#cContact').addEventListener('input', e => {
    if (e.target.type !== 'tel') return;
    let d = e.target.value.replace(/\D/g, '').replace(/^[78]/, '').slice(0, 10);
    const p = ['+7 ('];
    if (d.length) p.push(d.slice(0, 3)); if (d.length >= 3) p.push(') ' + d.slice(3, 6)); if (d.length >= 6) p.push('-' + d.slice(6, 8)); if (d.length >= 8) p.push('-' + d.slice(8, 10));
    e.target.value = d.length ? p.join('') : '';
  });
  const form = $('#careForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const bad = [];
    const nm = $('#cName').value.trim(), ct = $('#cContact').value.trim(), ag = $('#cAgree').checked;
    $('#fName').classList.toggle('is-err', !nm); if (!nm) bad.push('#cName');
    const okC = $('#cContact').type === 'email' ? /.+@.+\..+/.test(ct) : ct.replace(/\D/g, '').length === 11;
    $('#fContact').classList.toggle('is-err', !okC); if (!okC) bad.push('#cContact');
    $('#fAgree').classList.toggle('is-err', !ag); if (!ag) bad.push('#cAgree');
    if (bad.length) { $(bad[0]).focus(); return; }
    const btn = $('#cSend');
    btn.classList.add('is-loading'); btn.lastChild.previousSibling.textContent = ' Отправляем…';
    setTimeout(() => { btn.classList.remove('is-loading'); form.classList.add('is-done'); }, 1300);
  });
  $$('#careForm .inp, #cAgree').forEach(i => i.addEventListener('input', () => i.closest('.fld')?.classList.remove('is-err')));
  $('#careAgain').addEventListener('click', () => { form.reset(); form.classList.remove('is-done'); $('#cSend').childNodes[1].textContent = 'Отправить вопрос '; });

  /* ─────────── Reveal on scroll ─────────── */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  $$('.rv, .ticks').forEach(el => io.observe(el));
})();
