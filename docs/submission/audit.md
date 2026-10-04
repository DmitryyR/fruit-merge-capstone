# Аудит підготовки відео · 04.10.2026

Підстава: користувач прямо доручив виконати Codex_Capstone_Video_Prompt_UA.txt. Гра у вкладеному окремому repo fruit-merge-capstone; сусідній SalesHub не чіпаємо. Початкове дерево чисте, HEAD fddc76b. Остаточне приймання лишається користувачеві.

| Факт | Доказ | Прогалина | Дія |
|---|---|---|---|
| TypeScript/Vite/Phaser 3.90/Matter, 30 фруктів, merge, score, pause/restart/gameOver, local record | package.json, src/game, README | Потрібна актуальна перевірка для ролика | Запустити check з SHA, diff hash, датою й exit code |
| Production доступний без входу | https://dmitryyr.github.io/fruit-merge-capstone/, docs/deployment.md | Запису демонстрації немає | Записати реальні pointer input і фізичний merge |
| 76 unit + 7 integration + 33 browser у попередньому фінальному check | sizes-check-2.log, GitHub CI | Історичний результат не є свіжим прогоном | Зберегти capstone-final-check.log + metadata |
| Реальні red/green та незалежна знахідка колайдера | cbcfa7f review → f224a78 regression → e77427a fix | Не треба вигадувати новий дефект | Показати як історичний цикл зі збережених файлів |
| SDD перед першим кодом | c941d33 docs-only, наступні commits | Старі plan/design містять baseline параметри | Чітко відділити історію від поточних розмірів |
| Оформлення й 30 розмірів перевірені | c568427, sizes review, fruit-diameters.md | Свіжого загального review ще немає | Окремий reviewer, read-only, поточна ревізія |
| Playwright/Chromium і Node доступні | node_modules, локальні browser binaries | FFmpeg/TTS немає в PATH | Локально встановити video-only залежності без зміни залежностей гри |
| Чоловічий український голос прямо замовлений | Файл запиту: бажано uk-UA-OstapNeural | Сервіс TTS ще не перевірено | edge-tts з TLS-перевіркою, виміряти справжню тривалість |
| PR #22 відкритий draft, ім’я Dmitriy Remarenko відоме з PR | Поточний PR, docs/submission/pr-draft.md | Відео ще немає; URL платформи невідомий | Підготувати й опублікувати відео; заповнити draft, залишити особистий перегляд і подання |

Актуальні README/RUBRIC/PR template отримані з GitHub 04.10.2026: SHA файлів відповідно 18c5388fe1cc16ea93fc32f417abce620f91a107, c09ffac38ea0b37ef4273d7e77e19f92c4d53449, d2b1de75337a6f2be59887e37e193fb7fe4d228c. Зміст збігається з початково прочитаними умовами. Вимога курсу — працюючий продукт, доведені практики, відео 60–120 с, опис ролей людини й агента. Конкретні 30 фруктів та чоловічий голос — вибір користувача, не вимога курсу.

Початковий DOCX вже прочитаний у цій роботі; його SHA й зіставлення з курсом зафіксовані в docs/requirements.md. Новий TXT є явно делегованою користувачем специфікацією підготовки; шаблонні твердження перевіряємо за фактами.
