## Ім'я

Очікується точне ім'я та прізвище від учасника для сертифіката. Не визначалося за GitHub username. PR залишається draft до заповнення цього поля та відео.

## Проєкт

«Фруктовий сад» — браузерна Fruit Merge: скидання мишею/дотиком, злиття однакових фруктів, 30 рівнів каталогу, очки, пауза, нова гра та локальний рекорд. Без сервера й акаунтів.

**Де код:** [DmitryyR/fruit-merge-capstone](https://github.com/DmitryyR/fruit-merge-capstone/tree/ec568ec8ea271ae3fd040fececbcfbeff01b2573). У цьому PR додано лише `submissions/dmitry-fruit-merge/README.md`; кореневі файли курсу не змінені.

## Відео-демо (1–2 хв)

**Посилання:** ще не надане. [Сценарій для запису](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/docs/submission/video-script.md). Це незавершений крок здачі, а не готове відео.

## Застосовані практики Agentic Engineering

- [x] **Контекст-інженерія** — [AGENTS.md](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/AGENTS.md), [застосування правил у робочому журналі](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/docs/evidence/runs/agent-loop.md).
- [x] **Цикли (loop engineering)** — [фактичні раунди перевірки, виправлень і повторних прогонів](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/docs/evidence/runs/agent-loop.md), із ревізіями, raw logs та причиною зупинки. Агент виконував їх у межах одного погодженого плану, без промпта на кожну правку.
- [x] **Верифікація** — [merge test](https://github.com/DmitryyR/fruit-merge-capstone/blob/700d191/tests/unit/merge.test.ts), [red](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/docs/evidence/runs/T1-red.log), [green](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/docs/evidence/runs/T1-green.log), [final check](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/docs/evidence/runs/final-acceptance.log).
- [x] **maker ≠ checker** — [окремий reviewer report](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/docs/reviews/cbcfa7f.md). Знайдено P1: масштабування зображення зменшувало колайдер. [Regression](https://github.com/DmitryyR/fruit-merge-capstone/commit/f224a78) та [fix](https://github.com/DmitryyR/fruit-merge-capstone/commit/e77427a).
- [x] **Специфікації наперед (SDD)** — [docs-only commit c941d33](https://github.com/DmitryyR/fruit-merge-capstone/commit/c941d33) до першого коду, [рішення й уточнення](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/docs/decisions.md).
- [ ] **Журнал рівнів довіри** — окремою практикою не заявляється.
- [ ] **Project Factory** — не використовувалася: невеликий проєкт, достатньо вимог, правил і перевірок.
- [ ] Інше — не заявляється.

## Інструменти та MCP

Codex desktop; GitHub connector для читання умов; GitHub CLI для repo/fork/push; PowerShell, Node/npm. TypeScript, Vite, Phaser/Matter, Vitest, Playwright. Skills: brainstorming, writing-plans, executing-plans, test-driven-development, frontend-design, systematic-debugging, requesting-code-review, verification-before-completion. Окремий fresh-context reviewer-субагент. Посібник DOCX прочитано локально; його промпти не сприймалися як виконані дії.

## Що вирішував(ла) я, а що агент

Учасник вимагав вимоги, план та AGENTS.md до реалізації, переглянув пропозицію й погодив обсяг, стек, каталог 30 рівнів, послідовне виконання та окремого checker. Project Factory дозволив лише за доречності; агент обґрунтував відмову від неї. Ризик практичної недосяжності rank30 був показаний до погодження.

Агент написав код, оригінальні SVG, тести й документацію; запускав перевірки та виправляв підтверджені проблеми. Реальні втручання агента: відділив помилку sandbox від поведінкового red; уточнив некоректну часову передумову cooldown-тесту; після незалежного review відтворив і виправив зменшений фізичний колайдер. Додаткових рішень або ручних втручань учасника не вигадували.

## Перевірка

`npm ci` → `npx playwright install chromium` → `npm run check`.

Перевірена ревізія набору коду/тестів: `700d191`; пакет документів із raw logs: `ec568ec8ea271ae3fd040fececbcfbeff01b2573`.

```text
Unit: 68 passed
Integration: 6 passed
Browser: 24 passed (desktop + touch + production smoke)
CHECK PASSED — types, lint, unit, integration, both builds, browsers, production isolation.
```

[Сирий фінальний вивід](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/docs/evidence/runs/final-acceptance.log). [Успішний Linux CI e77427a](https://github.com/DmitryyR/fruit-merge-capstone/actions/runs/37154207746) перевірив production fix із попередніми 72 unit/integration та тими самими 24 browser scenarios. [Звіт з обмеженнями](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/docs/qa/acceptance-report.md).

Фізичний телефон, довгі партії та ручне досягнення rank30 не перевірені. Відео й подання на навчальній платформі ще не виконані; цей draft не заявляє повну готовність capstone до приймання.
