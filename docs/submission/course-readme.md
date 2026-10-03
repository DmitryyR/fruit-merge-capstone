# Фруктовий сад — Fruit Merge

Браузерна гра зі злиттям фруктів, 30 рівнями каталогу, паузою, перезапуском і локальним рекордом. Стек: TypeScript, Vite, Phaser/Matter, Vitest, Playwright.

- [Репозиторій гри](https://github.com/DmitryyR/fruit-merge-capstone).
- [Перевірена версія та інструкція запуску](https://github.com/DmitryyR/fruit-merge-capstone/tree/7d966bd7106684e7b3c1ef2749143661010b74fc).
- [Матриця доказів](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/index.md).
- [Звіт приймання та обмеження](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/qa/acceptance-report.md).
- [Незалежне рев'ю, знайдений дефект і відповідь автора](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/reviews/cbcfa7f.md).

Запуск: Node.js 22.12+, `npm ci`, `npm run dev`. Перевірка: `npx playwright install chromium`, `npm run check`.

Остаточний локальний прогін: 76 unit + 7 integration + 33 browser tests, typecheck, lint, обидві збірки та production isolation — pass. Вищі рівні перевірені контрольованими сценами; фізичний телефон і тривалий баланс не заявляються перевіреними.

Статус здачі: чернетка до додавання відео 1–2 хвилини; ім’я Dmitriy Remarenko вже внесене в PR. Посилання на відео ще не надане; [сценарій](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/submission/video-script.md) не замінює запис.

Погоджене оформлення: сад, кремові панелі й 30 нових фруктів; посудина та фізика збережені. [Огляд змін](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/visual-refresh-plan.md), [незалежне review](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/reviews/visual-8d2108b.md).


## Розміри фруктів SIZ-01–05

За прямим запитом учасника всі 30 радіусів переведено на геометричну прогресію 15.12..172.8 px (+8.7633% за рівень). Відкалібровано видиме тіло без прозорих полів/листя, фізика й спрайт мають спільний центр. Spawn і merge використовують одну конфігурацію; результат merge затискається над дном. Посудина, очки, черга й рекорд збережені. Додано read-only `?view=sizes` для всіх 30 рівнів.

[Специфікація](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/fruit-size-plan.md), [таблиця до/після](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/fruit-diameters.md), [скриншот](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/screenshots/sizes-desktop.png), [журнал red→green](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/runs/sizes-work-log.md), [незалежне рев'ю c568427](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/reviews/sizes-c568427.md): approve, actionable findings немає. [Фінальний check](https://github.com/DmitryyR/fruit-merge-capstone/blob/7d966bd7106684e7b3c1ef2749143661010b74fc/docs/evidence/runs/sizes-check-2.log): 76 unit + 7 integration + 33 browser, exit 0. Сцени високих рівнів синтетичні.
