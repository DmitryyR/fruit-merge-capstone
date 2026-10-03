# Дизайн Fruit Merge

Статус: погоджено користувачем разом із [планом](plan.md). Підстава — [вимоги](requirements.md).

Актуалізація 04.10.2026: [SIZ-01–05](fruit-size-plan.md) замінює описані нижче початкові лінійні радіуси. `fruits.json` задає id/rank/name/texture/body, а `catalog/sizing.ts` обчислює єдиний radius для створення та злиття. Основна архітектура й решта правил зберігаються.

## Вибір підходу

| Варіант | Перевага | Вартість/ризик | Висновок |
|---|---|---|---|
| TypeScript + Vite + Phaser/Matter | Відповідає посібнику, сцени й фізика в одному рушії | Потрібно відділити правила від scene lifecycle | Рекомендований |
| TypeScript + Canvas + Matter.js | Менше шарів рушія | Власні rendering, assets, input та lifecycle | Резерв, якщо є вагома причина відмовитись від Phaser |
| Godot із web export | Зручне середовище для гри | Інший pipeline тестів/експорту, відхилення від посібника | Не пропонується за поточного строку |

Точні сумісні версії встановити на T1, записати у package-lock і README. Не покладатися на слово latest. Project Factory не потрібна: специфікація, правила, check і докази покривають цей невеликий проєкт без додаткового процесу.

## Організація репозиторіїв

Рекомендується окремий `fruit-merge-capstone` із власними кодом, CI та доказами. У форку курсу — тільки `submissions/dmitry-fruit-merge/README.md` з посиланнями. Ім'я цієї теки — технічна пропозиція, не ім'я для сертифіката.

Поточна папка належить SalesHub. Ці документи тимчасово лежать в окремій підтеці; нове GitHub repo, fork, гілка й PR зараз не створювалися. Перед кодом перенести пакет в окремий checkout, потім документаційний commit. Гілка за замовчуванням `codex/fruit-merge-capstone`.

## Компоненти й потік даних

`input → session/drop guard → physics → collision queue → merge coordinator → domain rule → world + score → HTML HUD`.

`physics samples + simulation delta → danger rule → session.gameOver`. `score → high-score adapter → localStorage`.

- `catalog/fruits.json`: єдине джерело id/rank/name/texture/radius; validator відхиляє пропуски/дублі/невалідні числа.
- `domain/merge.ts`, `domain/danger.ts`, `domain/session.ts`: чиста логіка без Phaser, DOM і storage.
- `services/merge-coordinator.ts`: синхронне резервування пари, черга змін після physics step, одноразове нарахування. Усі callbacks перевіряють session ID і mode. Помилка створення результату не повинна лишати частково нараховані очки: операцію завершити цілком або відкотити резервування.
- `physics/matter-adapter.ts`: круглі тіла, три стінки, samples у логічних px/s, контрольований крок симуляції. Перевірити одиниці швидкості для встановленої версії, не прирівнювати native velocity до px/s без тесту.
- `input/drop-controller.ts`: перетворення координат, обмеження X, один жест/один drop, cooldown.
- `services/high-score.ts`: абстракція storage, пам'яттєвий fallback на помилці.
- `scenes/BootScene.ts`: перевірка каталогу, завантаження resources, екран помилки замість мовчазного crash.
- `scenes/GameScene.ts`: зв'язує компоненти; має явний dispose для підписок і таймерів.
- `ui/hud.ts`: звичайні HTML-кнопки та показники; обробники HUD не передають drop на canvas.
- `testing/test-api.ts`: тільки test build; setup сцен і snapshot, без підміни перевірки реального merge прямим викликом домену.

## Узгоджені всередині пропозиції параметри

Світ 480×720 логічних px, внутрішні межі посудини x=24..456, дно y=696, danger line y=140, spawn center y=72. Початковий радіус `12 + 1.5*(rank-1)` px, отже максимум 55.5 px. Ці значення — стартова пропозиція, а не доведений фізичний баланс. Gravity, restitution і friction налаштувати на T2, записати фактичні значення в config і decisions; критерії FR-06 при цьому не змінювати непомітно.

Крок симуляції 1000/60 мс, обмеження catch-up до 5 кроків за кадр, прихована вкладка ставить гру на паузу й вимагає явного resume. Небезпека та вік працюють у тому самому часовому масштабі. Фізична придатність максимального розміру перевіряється тестовою сценою.

Злитий фрукт з'являється в середині між центрами пари з обмеженням X за новим радіусом. Новий ID, вік 0, старі ID більше не активні. Однаковий фрукт не може бути обома учасниками пари. Немає merge рівня 30 і немає довільного cap, який мовчки видаляє фрукти.

## Перевірювані контракти

Усі наведені інтерфейси — рішення для майбутньої реалізації, не наявний API.

- `FruitDefinition = { id: string; rank: number; name: string; texture: string; radius: number }`.
- `FruitInstance = { id: string; rank: number; status: 'active'|'merging'|'removed' }`.
- `GameMode = 'playing'|'paused'|'gameOver'`.
- `GameState = { mode: GameMode; score: number; bestScore: number; currentRank: number; nextRank: number }`.
- `FruitSample = { id: string; topY: number; speedPxPerSecond: number; ageMs: number }`; ageMs — на кінець кроку.
- `DangerState = { elapsedMsByFruit: Record<string, number>; shouldEnd: boolean }`.
- `getMergeResult(aRank: number, bRank: number, maxRank = 30): { nextRank: number; points: number } | null`.
- `validateCatalog(raw: unknown): FruitDefinition[]`: кидає описову помилку на невалідному каталозі; `getFruitDefinition(rank: number): FruitDefinition` — помилка на невідомому rank.
- `advanceDanger(previous: DangerState, samples: FruitSample[], deltaMs: number, mode: GameMode): DangerState`; параметри FR-06 бере з config, без залежності від фізичного рушія.
- `createSession(rng: () => number, bestScore: number): GameState`; `pause(state)`, `resume(state)`, `endGame(state)` повертають новий GameState; `restart(state, rng)` повертає нову партію зі старим bestScore.
- `advanceQueue(state: GameState, rng: () => number): GameState`: викликається лише після успішного drop; RNG повертає [0,1), у production Math.random, у тестах фіксований.
- `tryMerge(aId: string, bId: string): boolean`: true означає зарезервовану пару; `flushMerges(): void` застосовує чергу після кроку світу; зупинка/перезапуск очищує чергу.
- `clientToWorldX(clientX: number, rectLeft: number, rectWidth: number, worldWidth: number): number`; `clampDropX(x: number, radius: number): number`.
- `StoragePort = { getItem(key: string): string|null; setItem(key: string, value: string): void }`; `readBest(storage: StoragePort): number`, `writeBest(storage: StoragePort, best: number): boolean`. Ключ `fruit-merge.best.v1`, JSON-число, скінченне невід'ємне ціле.

## Перевірки й обмеження

Vitest перевіряє правила та координатор. Playwright у test build готує детерміновані сцени, потім використовує справжній input і Matter collisions. Окремий smoke використовує звичайну production-збірку й перевіряє відсутність тестового API. Прапорець не є секретом; test module має виключатися зі звичайного build, а не просто ховатися за query parameter.

Автоматичні viewport/touch перевірки не замінюють реальний телефон і ручну оцінку балансу. При відсутності пристрою це буде явно зазначено в acceptance report. Ресурси: 30 власних простих фруктових зображень або ресурси з перевіреним дозволом; походження кожного записати в asset register. Звук відкладаємо.

Технічні джерела: [Phaser Matter](https://docs.phaser.io/phaser/concepts/physics/matter), [Playwright input](https://playwright.dev/docs/input), [Vite env/modes](https://vite.dev/guide/env-and-mode), переглянуті 03.10.2026. Поведінку встановлених версій додатково перевірити під час T1–T4.
