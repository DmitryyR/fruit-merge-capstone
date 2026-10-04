# Поточний стан Fruit Merge

04.10.2026. Користувач погодив план. Гру реалізовано; навчальна здача ще не завершена.

Публічне демо: **https://dmitryyr.github.io/fruit-merge-capstone/**. GitHub Pages автоматично публікує production після green check. Перший deploy 7defe3b перевірено в браузері без авторизації: HTTP 200, усі ресурси, drop/pause/restart і діагностика; [докази публікації](deployment.md). Локальний запуск лишився доступний; локальний рекорд автоматично не переноситься між різними адресами сайту.

Останнє доповнення SIZ-01–05: радіуси тепер за замовленою геометричною прогресією 15.12..172.8 px, калібрування тіла всіх 30 спрайтів, спільний розмір spawn/merge, захист merge біля дна. Окрема read-only діагностика `?view=sizes`. [Таблиця фактичних діаметрів](evidence/fruit-diameters.md), [журнал](evidence/runs/sizes-work-log.md). Фінальний check розмірів: 76 unit + 7 integration + 33 browser, exit 0, [лог](evidence/runs/sizes-check-2.log). Рекорд і правила гри збережено; відкриту партію користувача не перезавантажували. Незалежне [рев'ю c568427](reviews/sizes-c568427.md): approve, actionable findings немає.

Оформлення оновлено за погодженим макетом: садовий фон, кремові панелі, 30 нових фруктів у порядку референсів. Посудина та фізика збережені. Користувач дозволив оптимізацію: 31 ресурс зменшено з 52 455 221 до 797 534 байтів. Оптимізована версія пройшла check (68 unit + 6 integration + 24 browser, exit 0); [лог](evidence/runs/visual-optimized-check.log). Desktop 1440×900 та mobile 390×844 оглянуто, overflow немає. Окремий reviewer схвалив ревізію 8d2108b; [звіт](reviews/visual-8d2108b.md). Після цього автор захистив старий SVG-генератор: regression red 962470e → fix 8a798dc7e0a138b886cc1236318beac273e578ed; фінальний check: 68 unit + 7 integration + 24 browser, exit 0 ([лог](evidence/runs/visual-final-check.log)). Runtime вигляд після review не змінювався. У чинному PR вже зазначено ім’я Dmitriy Remarenko; при оновленні воно зберігається.

- Окремий repo: https://github.com/DmitryyR/fruit-merge-capstone, гілка codex/fruit-merge-capstone. SalesHub не змінювався.
- T0: docs-only commit c941d33 до тестів і коду.
- T1–T4: 30 рівнів/ресурсів, фізика, input, merge, pause/gameOver/restart, рекорд, адаптивний HUD, check і CI.
- T5: незалежний checker знайшов P1 колайдера; regression f224a78 показав red, fix e77427a перевірено. Додаткові integration докази у 700d191.
- Остаточний check: 68 unit + 6 integration + 24 browser, типи/lint/build/production isolation проходять. Дивись docs/evidence/index.md.
- Fresh install/check для e77427a успішні; Linux GitHub CI також успішний. Візуально оглянуто 1440×900 і 390×844, без горизонтального overflow.
- T6: створено [draft PR #22](https://github.com/koldovsky/2026-agentic-engineering-crash-course-capstone/pull/22) у репозиторій курсу; лише submission README. Ім’я Dmitriy Remarenko вже внесене до PR. Відеозапис готовий і опублікований у release capstone-video-v1; [сторінка програвача](https://dmitryyr.github.io/fruit-merge-capstone/capstone.html) опублікована й перевірена без входу. URL завдання навчальної платформи невідомий; подання й фінальне приймання не заявляються виконаними.

Реальний телефон, довгі партії й досягнення rank30 вручну не перевірялися. Hidden-tab перевірка синтетична. Ці обмеження описані у звіті.

Використані Codex, GitHub connector/CLI, PowerShell, Node/npm, TypeScript, Phaser, Vitest, Playwright та окремий reviewer-субагент. Project Factory не використовувалася.

Фінальна відеопідготовка: MP4 113.633с, 1920×1080 H.264/AAC30fps; український чоловічий голос Ostap,24 субтитри,38.733с реального браузерного запису. [Матеріали й перевірки](submission/final-check.md). Свіжий check на ffa173d:76unit+7integration+33browser,exit0; незалежний capstone reviewer approve. Runtime/ресурси/тести не змінені. Залишаються фінальний перегляд учасником і подання PR у навчальній платформі.

Фінальний статус відеоздачі: PR #22 і README форку оновлені, повторне читання підтвердило точний збіг із локальними матеріалами; PR лишається draft, не merged. [Квитанція](evidence/video/submission-update.json). Великі медіа тільки в release/Pages та локальному artifacts, не у звичайному git.
