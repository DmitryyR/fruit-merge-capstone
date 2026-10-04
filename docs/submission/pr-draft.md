## Ім'я

Dmitriy Remarenko

## Проєкт

**[Грати онлайн — публічне демо](https://dmitryyr.github.io/fruit-merge-capstone/)** · [Діагностика 30 розмірів](https://dmitryyr.github.io/fruit-merge-capstone/?view=sizes). Працює у браузері без встановлення Node.js та без входу.

«Фруктовий сад» — браузерна Fruit Merge: скидання мишею/дотиком, злиття однакових фруктів, 30 рівнів каталогу, очки, пауза, нова гра та локальний рекорд. Без сервера й акаунтів.

**Де код:** [DmitryyR/fruit-merge-capstone](https://github.com/DmitryyR/fruit-merge-capstone/tree/7d966bd7106684e7b3c1ef2749143661010b74fc). У цьому PR додано лише `submissions/dmitry-fruit-merge/README.md`; кореневі файли курсу не змінені.

## Відео-демо (1–2 хв)

**Посилання:** ще не надане. [Сценарій для запису](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/submission/video-script.md). Це незавершений крок здачі, а не готове відео.

## Застосовані практики Agentic Engineering

- [x] **Контекст-інженерія** — [AGENTS.md](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/AGENTS.md), [застосування правил у робочому журналі](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/runs/agent-loop.md).
- [x] **Цикли (loop engineering)** — [фактичні раунди перевірки, виправлень і повторних прогонів](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/runs/agent-loop.md), із ревізіями, raw logs та причиною зупинки. Агент виконував їх у межах одного погодженого плану, без промпта на кожну правку.
- [x] **Верифікація** — [merge test](https://github.com/DmitryyR/fruit-merge-capstone/blob/700d191/tests/unit/merge.test.ts), [red](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/runs/T1-red.log), [green](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/runs/T1-green.log), [final check](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/runs/visual-final-check.log).
- [x] **maker ≠ checker** — [окремий reviewer report](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/reviews/cbcfa7f.md). Знайдено P1: масштабування зображення зменшувало колайдер. [Regression](https://github.com/DmitryyR/fruit-merge-capstone/commit/f224a78) та [fix](https://github.com/DmitryyR/fruit-merge-capstone/commit/e77427a).
- [x] **Специфікації наперед (SDD)** — [docs-only commit c941d33](https://github.com/DmitryyR/fruit-merge-capstone/commit/c941d33) до першого коду, [рішення й уточнення](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/decisions.md).
- [ ] **Журнал рівнів довіри** — окремою практикою не заявляється.
- [ ] **Project Factory** — не використовувалася: невеликий проєкт, достатньо вимог, правил і перевірок.
- [ ] Інше — не заявляється.

## Інструменти та MCP

Codex desktop; GitHub connector для читання умов; GitHub CLI для repo/fork/push; PowerShell, Node/npm. TypeScript, Vite, Phaser/Matter, Vitest, Playwright. Skills: brainstorming, writing-plans, executing-plans, test-driven-development, frontend-design, systematic-debugging, requesting-code-review, verification-before-completion. Окремий fresh-context reviewer-субагент. Посібник DOCX прочитано локально; його промпти не сприймалися як виконані дії.

## Що вирішував(ла) я, а що агент

Учасник вимагав вимоги, план та AGENTS.md до реалізації, переглянув пропозицію й погодив обсяг, стек, каталог 30 рівнів, послідовне виконання та окремого checker. Project Factory дозволив лише за доречності; агент обґрунтував відмову від неї. Ризик практичної недосяжності rank30 був показаний до погодження.

Агент написав код, початкові SVG, тести й документацію; після погодження макета створив через imagegen нові растрові фрукти й фон та за прямим дозволом учасника оптимізував їх у WebP; запускав перевірки та виправляв підтверджені проблеми. Реальні втручання агента: відділив помилку sandbox від поведінкового red; уточнив некоректну часову передумову cooldown-тесту; після незалежного review відтворив і виправив зменшений фізичний колайдер. Додаткових рішень або ручних втручань учасника не вигадували.

## Перевірка

`npm ci` → `npx playwright install chromium` → `npm run check`.

Перевірена ревізія набору коду/тестів: `c568427fa89df264b7e2e9d12de99ae7b82b1a60`; пакет документів із raw logs: `7d966bd7106684e7b3c1ef2749143661010b74fc`.

```text
Unit: 76 passed
Integration: 7 passed
Browser: 33 passed (desktop + touch + production smoke)
CHECK PASSED — types, lint, unit, integration, both builds, browsers, production isolation.
```

[Сирий фінальний вивід](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/runs/sizes-check-2.log). [Успішний Linux CI e77427a](https://github.com/DmitryyR/fruit-merge-capstone/actions/runs/37154207746) перевірив production fix із попередніми 72 unit/integration та тими самими 24 browser scenarios. [Звіт з обмеженнями](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/qa/acceptance-report.md).

Фізичний телефон, довгі партії та ручне досягнення rank30 не перевірені. Відео й подання на навчальній платформі ще не виконані; цей draft не заявляє повну готовність capstone до приймання.


## Погоджене оновлення оформлення

Учасник надав візуальні референси, наполіг на збереженні поточної посудини, погодив макет і локальну оптимізацію графіки. Додано садовий фон, кремові панелі та 30 фруктів у новому порядку. Фізичні параметри й правила не змінювалися; бонусні механіки не додавалися. 31 графічний ресурс: 52,5 МБ → 0,8 МБ.

[План](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/visual-refresh-plan.md), [desktop](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/screenshots/visual-desktop.png), [mobile](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/screenshots/visual-mobile.png), [окреме review](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/reviews/visual-8d2108b.md). Скриншоти містять контрольовану сцену, не ручне проходження. Автор додатково захистив старий SVG-генератор від перезапису WebP: regression red 962470e → fix 8a798dc. Фінальний check: 68 unit + 7 integration + 24 browser, exit 0.


## Розміри фруктів SIZ-01–05

За прямим запитом учасника всі 30 радіусів переведено на геометричну прогресію 15.12..172.8 px (+8.7633% за рівень). Відкалібровано видиме тіло без прозорих полів/листя, фізика й спрайт мають спільний центр. Spawn і merge використовують одну конфігурацію; результат merge затискається над дном. Посудина, очки, черга й рекорд збережені. Додано read-only `?view=sizes` для всіх 30 рівнів.

[Специфікація](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/fruit-size-plan.md), [таблиця до/після](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/fruit-diameters.md), [скриншот](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/screenshots/sizes-desktop.png), [журнал red→green](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/runs/sizes-work-log.md), [незалежне рев'ю c568427](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/reviews/sizes-c568427.md): approve, actionable findings немає. [Фінальний check](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/runs/sizes-check-2.log): 76 unit + 7 integration + 33 browser, exit 0. Сцени високих рівнів синтетичні.


## Публікація

GitHub Pages публікує production тільки після успішного повного check. [Перша успішна публікація 7defe3b](https://github.com/DmitryyR/fruit-merge-capstone/actions/runs/37206623225). Публічну адресу перевірено в ізольованому Chromium: HTTP 200, 30 фруктів і фон без помилок, drop/pause/restart, desktop/mobile та діагностика; тестового API немає. Локальний рекорд збережений на локальній адресі, автоматичного перенесення між адресами немає. Живе демо не замінює ще не надане відео.
