# План реалізації Fruit Merge Capstone

> Для агента: після погодження користувачем виконувати послідовно за `superpowers:executing-plans`. Інший спосіб виконання узгодити на перегляді плану. Зараз дозволена лише підготовка документів.

**Мета:** завершена браузерна Fruit Merge із 30 рівнями каталогу, перевірками та доказами для здачі capstone.

**Архітектура:** чисті доменні правила окремо від Phaser/Matter. Координатор контролює одноразове злиття, HTML HUD відображає стан, storage adapter зберігає рекорд.

**Стек:** TypeScript, Vite, Phaser із Matter, Vitest, Playwright, npm із package-lock; точні версії фіксуються на T1.

**Специфікація:** [requirements.md](requirements.md), [design.md](design.md). **Докази:** [evidence/index.md](evidence/index.md).

План погоджено 03.10.2026. Реалізація T0–T5 виконана; ручний телефонний прогін не проводився. Детальні фактичні статуси й обмеження — у current-state.md та qa/acceptance-report.md. Нижче збережено початковий перелік робіт як baseline.

## Загальні обмеження

- Каталог: рівні 1–30; merge тільки однакової пари n<30; очки `10*n`; випадковий drop тільки 1–5.
- Danger: age>1000 мс, speed<25 px/s, topY<140, безперервні 2000 мс, окремий таймер кожного фрукту.
- Світ 480×720, x=24..456, дно 696, spawn y=72; radius `12+1.5*(rank-1)`; drop cooldown 300 мс. Значення пропонуються до погодження.
- Viewport: 390×844 і 1440×900. 10 restart без накопичення обробників.
- Новий checkout гри; SalesHub і кореневі файли курсу не змінювати.
- Документаційний commit перед кодом; фактичні red/green логи, окремий checker і фінальна перевірка з прив'язкою до ревізії.
- Відео 60–120 секунд, PR у курс, PR URL у платформі до 04.10.2026 включно; час закриття уточнюється за платформою.

## Особлива увага на рев'ю

1. Дубльовані/обернені collision callbacks та пара зі спільним учасником — T2.
2. Зміна масштабу, відступ canvas, touch і жест поза полем — T2.
3. Перетин grace period усередині кроку, hidden tab і paused danger timer — T3.
4. Storage throwing/malformed і reload — T3.
5. Застаріла collision queue після restart та тестовий API у production — T3/T4.

## Карта майбутніх файлів

| Шлях | Відповідальність |
|---|---|
| `package.json`, `package-lock.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `vitest.config.ts`, `playwright.config.ts` | Запуск, залежності, build, перевірки |
| `src/main.ts`, `src/game/config.ts`, `src/game/types.ts` | Вхід, спільні параметри і типи |
| `src/game/catalog/fruits.json`, `src/game/catalog/catalog.ts` | Єдиний каталог, validation/lookup |
| `src/game/domain/merge.ts`, `danger.ts`, `session.ts` | Правила злиття, небезпеки, станів і черги |
| `src/game/services/merge-coordinator.ts`, `high-score.ts` | Атомарний merge, storage adapter |
| `src/game/physics/matter-adapter.ts`, `src/game/input/drop-controller.ts` | Фізичний світ, керування |
| `src/game/scenes/BootScene.ts`, `GameScene.ts` | Завантаження і lifecycle |
| `src/ui/hud.ts`, `src/ui/styles.css` | HTML HUD та адаптивне оформлення |
| `public/assets/fruits/`, `docs/asset-register.md` | 30 ресурсів та їх походження |
| `src/game/testing/test-api.ts`, `tests/fixtures/` | Контрольовані сцени лише E2E build |
| `tests/unit/`, `tests/integration/`, `tests/e2e/`, `tests/smoke/` | Автоматичні перевірки |
| `scripts/check.mjs`, `.github/workflows/ci.yml` | Послідовна перевірка локально і в repo гри |
| `docs/decisions.md`, `docs/current-state.md`, `docs/evidence/`, `docs/reviews/`, `docs/qa/`, `docs/submission/` | Рішення, фактичні докази, рев'ю та здача |

Шляхи вище відносні до майбутнього кореня гри. У рядках із кількома короткими іменами вони належать тій самій теці, що й перше ім'я.

## Порядок і час

T0 → T1 → T2 → T3 → T4 → T5 → T6. Кожен етап має окремий результат; не накопичувати всі докази наприкінці.

Орієнтир, не гарантія строку: 3 жовтня — погодження, T0–T2; 4 жовтня — T3–T6. Зарезервувати щонайменше 2 години на відео, доступи та подання. За браку часу відкладати звук, декоративні ефекти й публічний deploy; не скорочувати перевірки мовчки. Зміну 30 рівнів чи базових правил погодити окремо.

## T0 Погодження і збереження специфікації до коду

**Файли:** підготовлені AGENTS.md і docs із цієї теки; майбутній `docs/decisions.md`.

**Вхід:** переглянуті вимоги й дизайн. **Вихід:** погоджений обсяг і документаційний commit у новому repo.

- [ ] Користувач переглядає план, зокрема 30 рівнів, параметри небезпеки та стек. Рекомендований спосіб — послідовна реалізація тут і окремий checker після неї; можливий окремий reviewer-субагент за погодженим способом виконання.
- [ ] Створити/відкрити окремий checkout гри; перевірити GitHub акаунт і точне місце нового repo, перенести підготовлені файли. Не комітити їх разом із SalesHub.
- [ ] Записати фактичні рішення людини у `docs/decisions.md`; агентські пропозиції не приписувати людині.
- [ ] Зробити commit `docs: define Fruit Merge requirements and evidence plan`. Перевірити `git show --stat HEAD`: лише документація, без коду гри; зберегти SHA в evidence index.

**Готовність:** погодження записано; документаційний commit існує раніше реалізаційного. Поточна наявність файлів ще не доводить порядок комітів.

## T1 Каталог і чисте правило злиття

**Файли:** конфігурація запуску/TypeScript/Vitest/ESLint; `src/game/types.ts`, `config.ts`, `catalog/fruits.json`, `catalog/catalog.ts`, `domain/merge.ts`; `tests/unit/catalog.test.ts`, `merge.test.ts`; README.

**Інтерфейси:** реалізувати `FruitDefinition`, `FruitInstance`, `getMergeResult`, `validateCatalog`, `getFruitDefinition` із design.md. Ці контракти споживатиме T2.

- [ ] Налаштувати запуск і test runner; зафіксувати сумісні версії й середовище. Додати всі 30 записів каталогу, поки для прототипу достатньо кількох готових textures; FR-01 повністю приймається тільки на T4.
- [ ] Написати `merge.test.ts`: (1,1)→{nextRank:2,points:10}; (2,2)→{3,20}; (29,29)→{30,290}; (1,2)/(30,30)→null; 0, -1, 1.5, 31, NaN/Infinity→null. Генерований тест перевіряє кожен перехід n=1..29.
- [ ] Написати `catalog.test.ts`: рівно 30 записів; дублі ID/rank, прогалина rank, порожня name/texture, radius≤0/NaN/Infinity відхиляються.
- [ ] Запустити `npm run test:unit -- tests/unit/catalog.test.ts tests/unit/merge.test.ts`; зберегти red, де падають твердження через відсутню поведінку. Неправильний імпорт чи неінстальований runner не вважати таким red.
- [ ] Реалізувати контракти, повторити ті самі тести; запустити `npm run typecheck`, `npm run lint`, `npm run build`. Зберегти green і commit `feat: validate fruit catalog and merge rules`.

**Готовність:** каталог валідний, усі переходи й очки перевірені; red/green відтворюються. Повний E2E check ще не заявляється виконаним.

## T2 Падіння і атомарне злиття у фізичному світі

**Файли:** `physics/matter-adapter.ts`, `input/drop-controller.ts`, `services/merge-coordinator.ts`, `domain/session.ts` (createSession/advanceQueue), сцени, main, базовий HUD; `tests/unit/drop-controller.test.ts`, `tests/unit/queue.test.ts`, `tests/integration/merge-coordinator.test.ts`, `tests/e2e/game.spec.ts`; test-api та fixtures.

**Вхід:** T1. **Вихід:** `tryMerge(aId,bId): boolean`, `flushMerges(): void`, `clientToWorldX(...)`, `clampDropX(...)`, `createSession(rng,bestScore)`, `advanceQueue(state,rng)` за design.md; сцена з реальними collisions.

- [ ] Написати red для повтору A/B, B/A, A/A, видаленого ID, трійки A/B/C однакового рівня та ланцюжка 1+1→2, потім 2+2→3: загальні очки 30, кожний ID спожито один раз. При невдачі world mutation очки не змінюються.
- [ ] Написати red для `clientToWorldX(295,100,390,480) = 240`, clamp(0,r=12)=36, clamp(999,r=12)=444; недопустима ширина rect не спричиняє drop. RNG 0→1, 0.999→5; успішний drop зсуває чергу один раз.
- [ ] Реалізувати input/physics/coordinator; зміни тіл застосовувати після кроку світу. Перевірити перетворення швидкості у px/s контрольованим рухом за відомий час.
- [ ] Створити E2E-сцену з парою однакового рівня; через mouse/touch скинути фрукт, дочекатися реального зіткнення, перевірити число тіл, рівень результату та +10. Прямий виклик merge через test-api заборонений як заміна цього сценарію.
- [ ] E2E: два viewport, resize між жестами, pointer-up поза полем, multi-touch/повторні події і cooldown. Одне дозволене скидання — одне нове тіло й один зсув черги.
- [ ] Запустити `npm run test:unit`, `npm run test:integration`, `npm run test:e2e`, `npm run build`; зберегти логи, параметри фізики й commit `feat: add drop controls and atomic physics merges`.

**Готовність:** працює наскрізний drop→collision→merge→score; дублікати не дають зайвих очок. Відкрите питання balance записане фактично після гри.

## T3 Стани партії, небезпека, рекорд і lifecycle

**Файли:** `domain/session.ts`, `domain/danger.ts`, `services/high-score.ts`, сцена/HUD; `tests/unit/session.test.ts`, `danger.test.ts`, `high-score.test.ts`, `tests/integration/lifecycle.test.ts`, E2E.

**Вхід:** T2. **Вихід:** `advanceDanger`, pause/resume/endGame/restart, `StoragePort`, `readBest`, `writeBest` за design.md; повний GameState.

- [ ] Написати red: eligible фрукт при 1999 мс не завершує, при 2000 завершує; age=1000 ще не рахується, age=1001 дає лише 1 мс після grace, speed=25 не eligible; topY=140 не eligible. Якщо delta=20, previous age=990, new age=1010, зарахувати 10 мс, не 20.
- [ ] Написати red: падіння нижче line/зростання speed скидає таймер; видалений фрукт не лишає запис; paused freeze; після resume рахунок триває з попереднього значення. Невалідний delta відхиляється.
- [ ] Написати red: paused/gameOver блокують drop/merge та RNG; restart скидає score/тіла/timers, але не best; прихована вкладка переводить playing→paused без накопичення elapsed.
- [ ] Написати red: storage повертає malformed JSON, null, -1, NaN-подібний рядок, Infinity, кидає на read/write; гра лишається працездатною. Менший score не перезаписує більший.
- [ ] Реалізувати контракти. Integration: 10 restart — кількість listeners не зростає; callback із минулого session ID не змінює нову партію.
- [ ] E2E: pause/resume, gameOver, restart, рекорд після reload, hidden tab. `npm run test:unit`, `npm run test:integration`, `npm run test:e2e`, `npm run build` → логи та commit `feat: complete game session and persistent best score`.

**Готовність:** FR-06–08, NFR-03–04 виконані за тестами; життєвий цикл перевірений, а не лише візуально оглянутий.

## T4 Повний каталог, фінальний check і якість продукту

**Файли:** 30 `public/assets/fruits/*`; asset register; стилі/HUD; `scripts/check.mjs`, `.github/workflows/ci.yml` власного repo; `tests/smoke/production.spec.ts`, `docs/qa/manual-test-plan.md`, README.

**Вхід:** T3. **Вихід:** відтворювана гра, одна реальна команда check, 30 завантажуваних ресурсів.

- [ ] Підготувати 30 зображень; для кожного ID записати файл, походження та дозвіл використання. Усі textures реально завантажуються; негативна fixture показує зрозумілу помилку на відсутньому ресурсі.
- [ ] Завершити адаптивний HUD і focus HTML-кнопок. Перевірити обидва viewport, keyboard для кнопок, mouse і touch; ручний протокол має дату, пристрій/браузер, сценарій і фактичний результат. Якщо фізичного телефону немає, позначити неперевіреним.
- [ ] Налаштувати `npm run check`: typecheck → lint → unit → integration → звичайний build → E2E test build в окремій теці → smoke звичайного build. Обидва builds мають різні output dirs/порти; E2E не перезаписує production dist.
- [ ] Smoke перевіряє запуск production і відсутність `window.__FRUIT_MERGE_TEST__`; додатково перевірити, що test-only модуль не включено у звичайний bundle.
- [ ] Одноразово перевірити, що неправильне очікування зупиняє check із ненульовим кодом; зберегти як контроль працездатності перевірки, не як випадково знайдений баг. Повернути правильне очікування. Нуль тестів, skips і echo не приховують відсутність покриття.
- [ ] У repo гри CI виконує `npm ci`, установку браузера Playwright, `npm run check`, зберігає логи/trace при збої. Налаштувати мінімальні permissions; не переносити workflow у незмінну .github/ курсу.
- [ ] Перевірити запуск за README на чистому checkout; `npm run check` → фактичний лог, commit `test: verify full catalog and production build`.

**Готовність:** усі автоматизовані FR/NFR мають докази; ручні обмеження названі. Досягнення 30-го рівня синтетично не називається проходженням у звичайній грі.

## T5 Окремий checker, виправлення і фінальна ревізія

**Файли:** `docs/reviews/<reviewed-sha>.md`, regression tests для підтверджених дефектів, evidence index, current-state, `docs/qa/acceptance-report.md`.

**Вхід:** ревізія T4. **Вихід:** звіт перевіряльника, рішення по знахідках, остаточний check.

- [ ] Передати checker вимоги, дизайн, точний diff/SHA і тести; checker не редагує продукт. Перевіряє п'ять ризиків із початку плану та повноту доказів.
- [ ] Зберегти автора/роль, дату, SHA, перелік перевіреного, знахідки з FR/NFR і відтворенням. Якщо знахідок немає — прямо так записати. Self-review цього плану не зараховується як checker коду.
- [ ] По кожній підтвердженій знахідці: failing regression → fix → green; спірні рішення узгодити з користувачем. Зберегти fix commits та рішення, не вигадувати втручань.
- [ ] На фінальній ревізії коду виконати `npm run check`; заповнити acceptance report: pass / fail / not run для кожної вимоги. Записати SHA коду, чистоту дерева, команди/exit codes та відомі обмеження.
- [ ] Логи можна додати наступним docs-only commit: явно розрізняти перевірений code SHA і commit із доказами. Якщо після перевірки змінено код, повторити потрібні перевірки і фінальний check.

**Готовність:** немає непояснених дефектів базового сценарію; звіт і докази відповідають версії, яку буде показано у відео.

## T6 Відео, PR і навчальна платформа

**Файли:** `docs/submission/video-script.md`, `docs/submission/pr-draft.md`; у форку курсу тільки `submissions/dmitry-fruit-merge/README.md`.

**Вхід:** T5. **Вихід:** доступне відео, PR і збережений клікабельний URL у платформі.

- [ ] Отримати від користувача точне ім'я для сертифіката та URL потрібного завдання платформи/скриншот поля. Не виводити ім'я з Windows username або GitHub handle.
- [ ] Підготувати сценарій на 110–120 секунд: 0–35 гра; 35–55 вимоги/AGENTS; 55–80 red/green; 80–100 checker і фактичне рішення; 100–120 final check та розподіл відповідальності. Запис і озвучення людини заплановані окремою дією; текст не є відео.
- [ ] Записати відео по перевіреній ревізії, переглянути, перевірити тривалість і доступ без логіну; додати реальне посилання.
- [ ] Зробити fork курсу, гілку `codex/fruit-merge-capstone`, додати submission README з URL коду/відео/evidence. Перевірити diff: курсова README, RUBRIC і .github/ незмінні.
- [ ] Заповнити оригінальний PR-шаблон: ім'я, проєкт/код, відео, лише доведені практики, фактичні інструменти/MCP, рішення людини й агента, перевірка. Посилання на докази — GitHub permalinks по SHA або реальні CI runs, не локальні шляхи.
- [ ] Відкрити PR саме у `koldovsky/2026-agentic-engineering-crash-course-capstone`; перевірити base/head, доступність усіх посилань; прикріпити створений PR до цього чату. Зливати PR не потрібно.
- [ ] У правильному завданні платформи вставити PR URL у поле посилання/відповіді, зберегти/подати й повторно відкрити. Перевірити, що посилання клікабельне, веде до потрібного PR і платформа показує подання. За відсутності доступу чесно позначити крок незавершеним та передати URL користувачу.

**Готовність:** S-01–06 перевірено. Створений PR сам по собі не підтверджує здачу на платформі.

## Виконання циклу агента і збереження доказів

Після погодження користувач може дати один запит на етап: «Виконай T2 за планом; перевіряй і виправляй у межах вимог до зеленого результату, максимум три раунди виправлень; збережи журнал». Це інструкція для агентного виконання, не назва наявної shell-команди.

Для кожного раунду журнал `docs/evidence/runs/T2-loop.md` міститиме вихідний запит, команду перевірки, raw log, SHA/patch, причину збою, дію агента, повторну команду і підсумок. Усі виправлення відбуваються в межах одного делегованого етапу без ручного промпта на кожну правку. Зупинка: green, 3 раунди, повторюваний зовнішній блокер або зміна вимог. Якщо такий цикл фактично не відбувся чи не був зафіксований, пункт loop engineering не позначати в PR.

## Самоперевірка підготовки

Вимоги FR-01–09 і NFR-01–07 мають етап і спосіб перевірки; S-01–06 покриті T4–T6. Контракти визначені в design.md, план на них посилається. Залишаються рішення користувача, а не приховані виконані кроки: погодження дизайну/обсягу, спосіб окремого checker, точне ім'я та дані платформи.
