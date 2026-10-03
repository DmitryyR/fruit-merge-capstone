# Поточний стан Fruit Merge

04.10.2026. Користувач погодив план. Гру реалізовано; навчальна здача ще не завершена.

Останнє доповнення SIZ-01–05: радіуси тепер за замовленою геометричною прогресією 15.12..172.8 px, калібрування тіла всіх 30 спрайтів, спільний розмір spawn/merge, захист merge біля дна. Окрема read-only діагностика `?view=sizes`. [Таблиця фактичних діаметрів](evidence/fruit-diameters.md), [журнал](evidence/runs/sizes-work-log.md). Фінальний check розмірів: 76 unit + 7 integration + 33 browser, exit 0, [лог](evidence/runs/sizes-check-2.log). Рекорд і правила гри збережено; відкриту партію користувача не перезавантажували. Незалежне [рев'ю c568427](reviews/sizes-c568427.md): approve, actionable findings немає.

Оформлення оновлено за погодженим макетом: садовий фон, кремові панелі, 30 нових фруктів у порядку референсів. Посудина та фізика збережені. Користувач дозволив оптимізацію: 31 ресурс зменшено з 52 455 221 до 797 534 байтів. Оптимізована версія пройшла check (68 unit + 6 integration + 24 browser, exit 0); [лог](evidence/runs/visual-optimized-check.log). Desktop 1440×900 та mobile 390×844 оглянуто, overflow немає. Окремий reviewer схвалив ревізію 8d2108b; [звіт](reviews/visual-8d2108b.md). Після цього автор захистив старий SVG-генератор: regression red 962470e → fix 8a798dc7e0a138b886cc1236318beac273e578ed; фінальний check: 68 unit + 7 integration + 24 browser, exit 0 ([лог](evidence/runs/visual-final-check.log)). Runtime вигляд після review не змінювався. У чинному PR вже зазначено ім’я Dmitriy Remarenko; при оновленні воно зберігається.

- Окремий repo: https://github.com/DmitryyR/fruit-merge-capstone, гілка codex/fruit-merge-capstone. SalesHub не змінювався.
- T0: docs-only commit c941d33 до тестів і коду.
- T1–T4: 30 рівнів/ресурсів, фізика, input, merge, pause/gameOver/restart, рекорд, адаптивний HUD, check і CI.
- T5: незалежний checker знайшов P1 колайдера; regression f224a78 показав red, fix e77427a перевірено. Додаткові integration докази у 700d191.
- Остаточний check: 68 unit + 6 integration + 24 browser, типи/lint/build/production isolation проходять. Дивись docs/evidence/index.md.
- Fresh install/check для e77427a успішні; Linux GitHub CI також успішний. Візуально оглянуто 1440×900 і 390×844, без горизонтального overflow.
- T6: створено [draft PR #22](https://github.com/koldovsky/2026-agentic-engineering-crash-course-capstone/pull/22) у репозиторій курсу; лише submission README. Ім’я Dmitriy Remarenko вже внесене до PR. Готовий відеозапис і URL завдання навчальної платформи ще не надані. PR не можна назвати остаточною здачею до заповнення цих полів і подання.

Реальний телефон, довгі партії й досягнення rank30 вручну не перевірялися. Hidden-tab перевірка синтетична. Ці обмеження описані у звіті.

Використані Codex, GitHub connector/CLI, PowerShell, Node/npm, TypeScript, Phaser, Vitest, Playwright та окремий reviewer-субагент. Project Factory не використовувалася.

Наступні дії: записати 1–2 хв демо за docs/submission/video-script.md, додати відео в PR, перевірити доступ без логіну, подати клікабельний PR URL у правильне поле платформи та перевірити збереження.
