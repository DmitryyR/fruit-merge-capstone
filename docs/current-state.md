# Поточний стан Fruit Merge

04.10.2026. Користувач погодив план. Гру реалізовано; навчальна здача ще не завершена.

- Окремий repo: https://github.com/DmitryyR/fruit-merge-capstone, гілка codex/fruit-merge-capstone. SalesHub не змінювався.
- T0: docs-only commit c941d33 до тестів і коду.
- T1–T4: 30 рівнів/ресурсів, фізика, input, merge, pause/gameOver/restart, рекорд, адаптивний HUD, check і CI.
- T5: незалежний checker знайшов P1 колайдера; regression f224a78 показав red, fix e77427a перевірено. Додаткові integration докази у 700d191.
- Остаточний check: 68 unit + 6 integration + 24 browser, типи/lint/build/production isolation проходять. Дивись docs/evidence/index.md.
- Fresh install/check для e77427a успішні; Linux GitHub CI також успішний. Візуально оглянуто 1440×900 і 390×844, без горизонтального overflow.
- T6: форк курсу створено; оформлюється draft PR. Точне ім'я для сертифіката, готовий відеозапис і URL завдання навчальної платформи не надані. PR не можна назвати остаточною здачею до заповнення цих полів і подання.

Реальний телефон, довгі партії й досягнення rank30 вручну не перевірялися. Hidden-tab перевірка синтетична. Ці обмеження описані у звіті.

Використані Codex, GitHub connector/CLI, PowerShell, Node/npm, TypeScript, Phaser, Vitest, Playwright та окремий reviewer-субагент. Project Factory не використовувалася.

Наступні дії: записати 1–2 хв демо за docs/submission/video-script.md, додати справжнє ім'я й відео в PR, перевірити доступ без логіну, подати клікабельний PR URL у правильне поле платформи та перевірити збереження.
