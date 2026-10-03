# Перевірені докази

04.10.2026. Базова версія: code revision e77427a, набір тестів 700d191. Наступний розділ окремо фіксує візуальне оновлення.

## Оновлення оформлення

[Погоджений план](../visual-refresh-plan.md), [макет](../design/approved-visual.png), [походження ресурсів](../asset-register.md). [Повний check оптимізованої версії](runs/visual-optimized-check.log): 68 unit + 6 integration + 24 browser, exit 0. [Перший check PNG-версії](runs/visual-check.log) теж успішний; це верифікація, а не новий TDD-цикл.

V-01: [desktop](screenshots/visual-desktop.png) та [mobile](screenshots/visual-mobile.png), візуально оглянуті. На скриншотах контрольована сцена, не проходження гри; рахунок 0 відповідає setup без merge. Немає горизонтальної прокрутки.

V-02: [аудит 30 WebP](runs/visual-webp-audit.json): 256×256, прозорість 0..255; 30 textures перевірено браузерними тестами. [Параметри оптимізації](runs/visual-optimization.json): 31 ресурс 52 455 221 → 797 534 байтів. [Аудит вихідних PNG](runs/visual-asset-audit.json) збережено окремо.

V-03: config, matter-adapter, domain, input та services не змінювалися; перевірка діаметрів усіх 30 фізичних тіл проходить.

V-04: [окремий reviewer](../reviews/visual-8d2108b.md) схвалив 8d2108b. Автор окремо відтворив ризик перезапису WebP старим SVG-генератором: [red](runs/visual-legacy-red.log), test commit 962470e → fix 8a798dc7e0a138b886cc1236318beac273e578ed. [Фінальний check](runs/visual-final-check.log): 68 unit + 7 integration + 24 browser, exit 0. Перевірявся робочий diff, пізніше зафіксований у 8a798dc; наступні зміни лише документаційні. Це авторський regression, не знахідка незалежного reviewer.

## Розміри SIZ-01–05

[Специфікація до реалізації](../fruit-size-plan.md), regression 74e55de і [red](runs/sizes-red.log), реалізація 15c70a3 із знайденим layout regression, [green check](runs/sizes-check-2.log): 76 unit + 7 integration + 33 browser, exit 0. [Журнал причин та виправлень](runs/sizes-work-log.md), [фактичні діаметри до/після та скриншоти](fruit-diameters.md). [Незалежний reviewer](../reviews/sizes-c568427.md): approve для c568427, без actionable findings. Старі числа тестів нижче стосуються відповідних історичних ревізій.

## Докази базової реалізації

| Практика | Реальний доказ | Статус |
|---|---|---|
| Контекст-інженерія | [AGENTS.md](../../AGENTS.md), [журнал застосування правил](runs/agent-loop.md): red не підмінено помилкою sandbox; виправлення тестової передумови пояснене; checker відокремлений | Виконано |
| SDD | [Перший docs-only commit c941d33](https://github.com/DmitryyR/fruit-merge-capstone/commit/c941d33), вимоги/дизайн/план; [рішення й уточнення](../decisions.md) | Виконано до коду |
| Верифікація / TDD | [Тест merge](../../tests/unit/merge.test.ts), [T1 red](runs/T1-red.log), [T1 green](runs/T1-green.log), [остаточний check](runs/final-acceptance.log), [контроль помилкового assertion](runs/check-negative-control.log) | 68 unit + 6 integration + 24 browser; exit 0 фінального check |
| Loop engineering | [Журнал фактичних раундів](runs/agent-loop.md), [перший browser run](runs/browser-first.log), [повтор](runs/check-round2.log), причина зупинки та commits | Виконано; check сам по собі не заявляється агентним циклом |
| Maker ≠ checker | [Окремий reviewer](../reviews/cbcfa7f.md), [regression red](runs/review-physics-red.log), [fix e77427a](https://github.com/DmitryyR/fruit-merge-capstone/commit/e77427a), final check | P1 знайдено, відтворено і виправлено |

[Успішний GitHub CI для e77427a](https://github.com/DmitryyR/fruit-merge-capstone/actions/runs/37154207746) перевірив production fix із 72 unit/integration та 24 browser. Додаткові 2 integration tests увійшли в 700d191; локальний остаточний check містить 74 unit/integration.

[Fresh install](runs/fresh-install.log) та [fresh check](runs/fresh-check.log) виконані на архівованій копії e77427a. [Acceptance report](../qa/acceptance-report.md) називає обмеження. Сирі логи містять фактичний вивід; прив'язку red до ревізій подано в журналі.

Project Factory і журнал рівнів довіри як окремі практики не заявляються. Рішення людини: вимагати план до реалізації, погодити обсяг і стек, окремого checker, не додавати непотрібну фабрику. Агент реалізував код, тести, ресурси, виправлення та документацію. [Рішення](../decisions.md).

Ім’я Dmitriy Remarenko вже внесене до PR. Відео та подання на платформі ще не виконані. [Сценарій відео](../submission/video-script.md) не видається за готове відео.
