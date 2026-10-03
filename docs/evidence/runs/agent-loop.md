# Фактично виконаний цикл агента

Вхід: користувач погодив план фразою «я погоджуюсь». Агент виконує етапи послідовно без окремого ручного промпта на кожне виправлення. Умови зупинки записані в AGENTS.md: зелений результат або максимум 3 раунди для одного дефекту/етапу, зовнішній блокер чи зміна вимог.

## T1 Правила

- Tests-first revision `dbae53e`: команда `node node_modules/vitest/vitest.mjs run tests/unit`, [red](T1-red.log), exit 1, 37 failing + 9 passing. Початковий sandbox запуск не зміг читати конфігурацію збирача; він не зарахований як поведінковий red. Повтор із доступом до середовища показав саме неімплементовані контракти.
- Агент реалізував каталог і merge без зміни очікувань. Команда та сама; [green](T1-green.log), exit 0, 46/46. Implementation revision `e9f013d`. Зупинка: green.

## T2–T3 Доменні правила

- Tests-first revision `1017ee5`: `node node_modules/vitest/vitest.mjs run`, [red](T2-T3-red.log), exit 1: 23 failing, 49 passing.
- Реалізовано input conversion, reservation/queue merge, session, danger, storage. [Green](T2-T3-green.log), exit 0: 72/72. Implementation revision `e5323ee`.
- Ruling: взаємопов'язані чисті контракти T2/T3 перевірено спільним циклом перед UI; порядок specs→tests→code збережений. Ціна відхилення — менш дрібні межі етапів, не менше покриття.

## Браузерний цикл

1. На `6eb6cb7` команда `node node_modules/playwright/cli.js test`: [перший прогін](browser-first.log), exit 1, 19 pass / 3 fail. Два cooldown-тести припускали, що зовнішні browser round trips тривають <300 мс; це неправда в цьому середовищі. Один desktop-тест вичерпав загальні 20 секунд, хоча вже пройшов gameOver і restart.
2. Агент зробив cooldown-події в одному JS turn; основне drop/merge перевіряється окремо реальними mouse/touch. Загальний тестовий бюджет 60 с, пороги danger й cooldown не змінено. Уточнення збережено в `cbcfa7f`. `node scripts/check.mjs`: [повний повтор](check-round2.log), exit 0, 72 unit/integration + 22 browser. Зупинка: green. Це зміна некоректної часової передумови тесту з поясненням, а не приховування дефекту продукту.

## Окремий checker і виправлення продукту

Checker по `cbcfa7f` знайшов зменшення колайдера після масштабування картинки. Автор перевірив internals Phaser, додав regression `f224a78`, запустив `node node_modules/playwright/cli.js test --project=desktop -g "physics bodies preserve"` і отримав [справжній red](review-physics-red.log), exit 1. Потім виправив порядок викликів у `e77427a` та запустив `node scripts/check.mjs`; результат — [final-check.log](final-check.log).

Саме цей цикл є прикладом maker ≠ checker, а не self-review. Число раундів виправлення конкретного physics-дефекту: 1. Підсумковий статус береться з логу, а не з цієї оповіді.

## Контроль команди

[Negative control](check-negative-control.log): у тимчасовій копії навмисно додано неправильне очікування -1 для merge очок. Check має зупинитися на unit з exit 1; тест після експерименту автоматично відновлений. Це контроль перевірки, не випадково знайдений дефект і не вигаданий red реалізації.

Всі red/green файли збережені як фактичний вивід. Час у сирих логах — час execution host; користувацькі дати й дедлайн ведуться за Europe/Kiev. Незакомічені UI-прогони прив'язано до наступного commit, tests-first та regression мають окремі commits.
