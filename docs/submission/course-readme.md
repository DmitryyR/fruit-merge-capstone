# Фруктовий сад — Fruit Merge

Браузерна гра зі злиттям фруктів, 30 рівнями каталогу, паузою, перезапуском і локальним рекордом. Стек: TypeScript, Vite, Phaser/Matter, Vitest, Playwright.

- [Репозиторій гри](https://github.com/DmitryyR/fruit-merge-capstone).
- [Перевірена версія та інструкція запуску](https://github.com/DmitryyR/fruit-merge-capstone/tree/ba7416001e524e70b139204305f5fa4d9822c329).
- [Матриця доказів](https://github.com/DmitryyR/fruit-merge-capstone/blob/ba7416001e524e70b139204305f5fa4d9822c329/docs/evidence/index.md).
- [Звіт приймання та обмеження](https://github.com/DmitryyR/fruit-merge-capstone/blob/ba7416001e524e70b139204305f5fa4d9822c329/docs/qa/acceptance-report.md).
- [Незалежне рев'ю, знайдений дефект і відповідь автора](https://github.com/DmitryyR/fruit-merge-capstone/blob/ba7416001e524e70b139204305f5fa4d9822c329/docs/reviews/cbcfa7f.md).

Запуск: Node.js 22.12+, `npm ci`, `npm run dev`. Перевірка: `npx playwright install chromium`, `npm run check`.

Остаточний локальний прогін: 68 unit + 7 integration + 24 browser tests, typecheck, lint, обидві збірки та production isolation — pass. Вищі рівні перевірені контрольованими сценами; фізичний телефон і тривалий баланс не заявляються перевіреними.

Статус здачі: чернетка до додавання відео 1–2 хвилини; ім’я Dmitriy Remarenko вже внесене в PR. Посилання на відео ще не надане; [сценарій](https://github.com/DmitryyR/fruit-merge-capstone/blob/ba7416001e524e70b139204305f5fa4d9822c329/docs/submission/video-script.md) не замінює запис.

Погоджене оформлення: сад, кремові панелі й 30 нових фруктів; посудина та фізика збережені. [Огляд змін](https://github.com/DmitryyR/fruit-merge-capstone/blob/ba7416001e524e70b139204305f5fa4d9822c329/docs/visual-refresh-plan.md), [незалежне review](https://github.com/DmitryyR/fruit-merge-capstone/blob/ba7416001e524e70b139204305f5fa4d9822c329/docs/reviews/visual-8d2108b.md).
