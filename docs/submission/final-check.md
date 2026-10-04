# Перевірка фінального пакета · 04.10.2026

Фінальні MP4/MP3/SRT створені. [Release без логіну](https://github.com/DmitryyR/fruit-merge-capstone/releases/tag/capstone-video-v1). Публічний програвач перевірено після deploy (нижче); це не приймання учасником.

| Перевірка | Фактичний результат / доказ |
|---|---|
| Повний check гри | Exit0,76unit+7integration+33browser; typecheck/lint/обидві збірки/production isolation. [Лог](../evidence/runs/capstone-final-check.log), [метадані](../evidence/runs/capstone-final-check.json) |
| Ревізія | ffa173db7db51a364c761de902b6bd7a6f758486, чисте дерево перед check, diffSHA256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| Незалежний reviewer | [Approve](../reviews/capstone-review.md), нових підтверджених дефектів немає; власні браузерні сценарії відокремлено від авторського check |
| Тривалість і формат | FFmpeg probe/decode:113.63с,1920×1080,H.264 High,yuv420p,30fps,AAC LC48000Hz mono. [Фактичний вивід](../evidence/video/final-decode.log) |
| Повне декодування | FFmpeg -v error -xerror -i MP4 -f null -:exit0,stderr порожній;3409 кадрів у повному прогоні |
| Звук | Вимір готового AAC: -16.21LUFS, -1.92dBTP. [Аналіз](../evidence/video/final-av-quality.log); немає кліпінгу |
| Чорні кадри | blackdetect=d=0.1:pix_th=0.02:жодної black_start події. Це автоматична перевірка майже чорних проміжків≥0.1с |
| Візуальний огляд | Оглянуто витягнуті кадри кожної з6 сцен, окремо merge/pause/restart. Текст читабельний; титри в межах кадру; нижня смуга не закриває поле/score |
| Gameplay | 38.733с фактичного запису, окремий активний сегмент26.5с; [події](../evidence/video/recording.json) підтверджують справжній drop→merge10, pause snapshot, restart score0 і фактичний best30 |
| Субтитри | 24 блоки, максимум2 рядки; час із TTS WordBoundary, остання межа112.527с<113.633с. [SRT](captions-ua.srt) |
| Факти озвучення | [Кожна сцена пов’язана з джерелами](video-script.md); історичні докази відокремлені від поточної підготовки |
| Байти файлів | MP4 9114551байтів, SHA256 2082b9a788e34166d4f69a356b80e1dcca1d969a01d6b64ea9ae943158663e35; [MP4/MP3/SRT](../evidence/video/files.json) |
| Прогрес користувача | Власний browser context; існуючу вкладку4181 і її рекорд/партію не змінювали |

Матеріальні обмеження: суб’єктивне прослуховування недоступне — технічна перевірка не доводить природність вимови. Потрібен фінальний перегляд учасником. Реальний телефон, Safari/Firefox, довгі партії до rank30 і повна доступність Canvas не перевірені. Тестові сцени не є ручним проходженням. На цьому етапі check відразу green; новий TDD-цикл продукту не заявляється.

Журнал підготовки: початковий текст158.7с скорочено до112.36с голосу; assertion запису уточнено для реального додаткового merge; завеликий фрагмент коду скорочено до потрібного рядка; піковий запас аудіо збільшено після виміру AAC. Це правки сценарію/монтажу, а не вигадані дефекти гри. Передача тексту TTS спершу була зупинена автоматичним review; після перевірки явного дозволу в розділі7 користувацького TXT та уточнення несекретного payload дозволена. Захист TLS збережено.


## Публікація перевірена

[CI і deploy d8182c0](https://github.com/DmitryyR/fruit-merge-capstone/actions/runs/37210015889) завершилися success: повний check, завантаження release MP4, перевірка SHA-256, Pages. [Фактичний CI log](../evidence/video/ci-deploy.log), [jobs](../evidence/video/ci-deploy.json).

[Програвач](https://dmitryyr.github.io/fruit-merge-capstone/capstone.html) перевірено04.10.2026 в новому анонімному Chromium: HTTP200, readyState4, H.2641920×1080,113.633333с; playback просувається, seek працює. MP4 на Pages і всі3 release-файли завантажуються без логіну, SHA-256 збігаються з локальними. Mobile390×844 без горизонтального overflow; pageerrors=[]. [Машинний доказ](../evidence/video/public-player.json). Людське прослуховування не заявляється.
