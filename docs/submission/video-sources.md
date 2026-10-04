# Джерела кадрів і тверджень

Записано 2026-10-04T14:26:18.682Z. HEAD: ffa173db7db51a364c761de902b6bd7a6f758486. Git tree src: 5241134f516801909b7dd3c21e8acecb55f38269. Ігровий код/ресурси/тести не змінювалися під час відеопідготовки; додано лише матеріали, скрипти монтажу, окрему сторінку програвача та пакування відео в CI.

Raw: artifacts/capstone/raw/. Фінальні медіа виключені зі звичайного git; [публічний release](https://github.com/DmitryyR/fruit-merge-capstone/releases/tag/capstone-video-v1).

| Кадр | Походження | Що саме доводить |
|---|---|---|
| gameplay.webm | Ізольований Playwright Chromium, 1920×1080, CSS zoom115%; локальна E2E-збірка4180 | Справжні pointer events, Matter collision, score10, pause/resume/restart. 38.733с у монтажі, з них26.5с окремого gameplay-сегмента |
| context.png | Прочитані AGENTS.md, merge-coordinator.ts, git log --reverse | Конкретне правило резервування і його виконання; docs-only commit перед кодом |
| verification.png | review-physics-red.log, git show e77427a, final-check.log | Історичний red→fix→green, явно позначений збереженим прогоном |
| review.png | capstone-review.md, capstone-final-check.log/.json | Нове незалежне review та окремий авторський check116 |
| outro.png | human-agent-roles.md, стислий виклад | Межа підтверджених рішень людини й роботи агента |

Сценарій нижчих/вищих фруктів підготовлений: rank20,18,1 встановлені одноразово до початку кадру. Далі API лише читає snapshots; злиття та очки не задаються напряму. Увесь gameplay має підпис «Тестовий сценарій». Після першого merge10 додатковий фрукт дав ще20; restart показує фактичний best30, а не вигаданий рекорд. Живу вкладку користувача4181 та її прогрес не змінювали.

У фрагментах документів перенесено рядки й вибрано лише потрібні частини. Повний historical diff збережено raw/historical-fix.diff. Результати логів не переписані. Текст «сто шістнадцять» =76unit+7integration+33browser. Попередній historical green із24browser не видається за поточний.

Для кожного речення озвучення посилання наведено в [video-script.md](video-script.md); машинні дані запису — [recording.json](../evidence/video/recording.json), [монтаж](../evidence/video/build-manifest.json), [voice metadata](../evidence/video/voice-metadata.json). Точні байти готових файлів — [files.json](../evidence/video/files.json).

Озвучення: Microsoft Edge TTS, uk-UA-OstapNeural, Male, -3%. WordBoundary таймінги з фактичної відповіді сервісу; окремий MP3 і AAC у MP4 походять з одного нормалізованого master WAV. Музики немає. Це не особистий голос учасника.
