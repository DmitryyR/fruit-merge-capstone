# Перевірені докази

04.10.2026. Code revision e77427a; фінальний набір тестів 700d191. Останні commits із документацією не змінюють код гри.

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

Відео, точне сертифікатне ім'я та подання на платформі — ще не виконані. [Сценарій відео](../submission/video-script.md) не видається за готове відео.
