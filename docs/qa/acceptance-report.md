# Звіт приймання гри

04.10.2026. Production code fix: `e77427a5a545ae55a2a3f769b3a777954e126fbb`; додаткові інтеграційні перевірки: `700d191`. Це історична базова перевірка. Оновлення оформлення та фінальний стан наведено нижче.

Докази: [остаточний check](../evidence/runs/final-acceptance.log), [fresh install](../evidence/runs/fresh-install.log), [fresh check e77427a](../evidence/runs/fresh-check.log), [незалежне рев'ю](../reviews/cbcfa7f.md), [CI e77427a](https://github.com/DmitryyR/fruit-merge-capstone/actions/runs/37154207746).

| Вимога | Статус | Доказ |
|---|---|---|
| FR-01 | Pass | catalog unit; browser: усі 30 textures; asset register |
| FR-02 | Pass автоматично | unit clamp/coordinates; реальні mouse/touch drops; перевірка колайдерів усіх рівнів |
| FR-03 | Pass | 29 переходів unit; дубль/трійка/ланцюг integration; реальне Matter зіткнення E2E |
| FR-04 | Pass | точні очки unit/integration, score=10 після справжнього зіткнення |
| FR-05 | Pass | RNG bounds, queue unit; same-frame cooldown E2E |
| FR-06 | Pass | 1999/2000, grace fraction, thresholds/reset/remove unit; browser gameOver |
| FR-07 | Pass | pause/resume/restart unit та browser; 10 restart; paused snapshot незмінний |
| FR-08 | Pass | storage failure/invalid unit; best після restart/reload browser |
| FR-09 | Частково ручне | 390×844 і 1440×900, resize та touch emulation pass; фізичний телефон не перевірений |
| NFR-01 | Pass | резервування двох учасників, duplicate/reversed/self/triple/chain та failure rollback |
| NFR-02 | Pass | offset+scale unit, browser resize і outside/secondary pointer |
| NFR-03 | Pass | browser 10 restart + 1 collision listener + 1 drop; integration replay старих ID |
| NFR-04 | Pass | пошкодження, винятки read/write, збереження більшого рекорду |
| NFR-05 | Pass | production smoke, відсутній global test API і bundle marker; missing asset alert |
| NFR-06 | Pass | npm ci в archived checkout; повний check; lockfile та Linux CI |
| NFR-07 | Частково ручне | семантичні кнопки, focus style, візуальний перегляд; synthetic visibility event проходить. Повний аудит accessibility не проводився |

## Межі висновку

- Фізичний телефон не був доступний. Емуляція touch не видається за прогін на телефоні.
- Візуально оглянуті desktop/mobile screenshots зі спеціально підготовленою сценою; це не проходження партії до високих рівнів.
- Тривалий баланс/досяжність rank30 у звичайній грі не перевірені; математичне обмеження описане у вимогах.
- Рецензент перевіряв cbcfa7f; автор відтворив P1 тестом, виправив і перевірив. Другого незалежного review виправлення не було.
- Вимірювання Matter velocity за реальний 1-секундний крок і replay старих collision ID додані після review; обидва проходять.
- Часові бюджети Playwright відрізняються від таймерів гри; збільшення загального test timeout не змінює 300/1000/2000 мс ігрових правил.
- Відео, сертифікатне ім'я й платформа ще потребують даних користувача. PR буде draft до їх завершення; повна навчальна здача поки не виконана.

## Оновлення оформлення 04.10.2026

Перевірена ревізія коду/ресурсів/тестів: `8a798dc7e0a138b886cc1236318beac273e578ed`. [Фінальний check](../evidence/runs/visual-final-check.log): 68 unit + 7 integration + 24 browser, typecheck/lint/обидві збірки/production isolation — pass, exit 0. [Незалежний review](../reviews/visual-8d2108b.md) перевіряв 8d2108b; подальший guard історичного генератора перевірено окремим red→green.

V-01–04: pass для погодженого обсягу. Автор оглянув desktop 1440×900 і mobile 390×844; reviewer додатково 320×568 та keyboard focus/Enter. Горизонтального overflow немає. Усі 30 WebP завантажуються, фізичні діаметри незмінні. Зображення на скриншотах — підготовлена сцена, не ручне проходження. Після стиснення 31 ресурс займає 797 534 байти.

Реальний телефон, Safari/Firefox, тривалі партії, повна доступність Canvas та rank30 вручну не перевірені. Fresh-install baseline не видається за новий fresh-install цього оновлення. Ім’я вже є в PR; відео й навчальна платформа залишаються незавершеними.
