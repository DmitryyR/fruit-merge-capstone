# Фруктовий сад — Fruit Merge

Браузерна гра зі злиттям фруктів, 30 рівнями каталогу, паузою, перезапуском і локальним рекордом. Стек: TypeScript, Vite, Phaser/Matter, Vitest, Playwright.

- [Репозиторій гри](https://github.com/DmitryyR/fruit-merge-capstone).
- [Перевірена версія та інструкція запуску](https://github.com/DmitryyR/fruit-merge-capstone/tree/ec568ec8ea271ae3fd040fececbcfbeff01b2573).
- [Матриця доказів](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/docs/evidence/index.md).
- [Звіт приймання та обмеження](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/docs/qa/acceptance-report.md).
- [Незалежне рев'ю, знайдений дефект і відповідь автора](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/docs/reviews/cbcfa7f.md).

Запуск: Node.js 22.12+, `npm ci`, `npm run dev`. Перевірка: `npx playwright install chromium`, `npm run check`.

Остаточний локальний прогін: 68 unit + 6 integration + 24 browser tests, typecheck, lint, обидві збірки та production isolation — pass. Вищі рівні перевірені контрольованими сценами; фізичний телефон і тривалий баланс не заявляються перевіреними.

Статус здачі: чернетка до додавання справжнього імені учасника та відео 1–2 хвилини. Посилання на відео ще не надане; [сценарій](https://github.com/DmitryyR/fruit-merge-capstone/blob/ec568ec8ea271ae3fd040fececbcfbeff01b2573/docs/submission/video-script.md) не замінює запис.
