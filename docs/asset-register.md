# Реєстр ресурсів

04.10.2026. 30 фруктів і садовий фон створені вбудованим imagegen за наданими користувачем референсами та погодженим макетом. Кожний фрукт згенеровано окремо з прозорим тлом. Код — MIT. Старі SVG і генератор збережено як історичні ресурси; поточна гра використовує WebP.

Користувач прямо дозволив локальну оптимізацію. Pillow зменшує фрукти до 256×256 та кодує WebP quality 88 із прозорістю; фон 1536×1024. [Скрипт](../scripts/optimize-assets.py) необов’язковий для запуску гри; для повторення потрібні Pillow та оригінальні PNG.

[Точні промпти](design/imagegen-prompts.json), [погоджений макет](design/approved-visual.png), [розміри й SHA256 оригіналів](evidence/runs/visual-optimization.json). Оригінали збережені локально; runtime-ресурси містяться в репозиторії та не залежать від локальних шляхів джерел.

[Фон саду](../public/assets/orchard/background.webp).

| ID | Назва | Runtime-файл |
|---|---|---|
| fruit-01 | Чорниця | [WebP](../public/assets/fruits/fruit-01.webp) |
| fruit-02 | Журавлина | [WebP](../public/assets/fruits/fruit-02.webp) |
| fruit-03 | Вишня | [WebP](../public/assets/fruits/fruit-03.webp) |
| fruit-04 | Малина | [WebP](../public/assets/fruits/fruit-04.webp) |
| fruit-05 | Ожина | [WebP](../public/assets/fruits/fruit-05.webp) |
| fruit-06 | Аґрус | [WebP](../public/assets/fruits/fruit-06.webp) |
| fruit-07 | Виноград | [WebP](../public/assets/fruits/fruit-07.webp) |
| fruit-08 | Полуниця | [WebP](../public/assets/fruits/fruit-08.webp) |
| fruit-09 | Лічі | [WebP](../public/assets/fruits/fruit-09.webp) |
| fruit-10 | Інжир | [WebP](../public/assets/fruits/fruit-10.webp) |
| fruit-11 | Слива | [WebP](../public/assets/fruits/fruit-11.webp) |
| fruit-12 | Абрикос | [WebP](../public/assets/fruits/fruit-12.webp) |
| fruit-13 | Мандарин | [WebP](../public/assets/fruits/fruit-13.webp) |
| fruit-14 | Ківі | [WebP](../public/assets/fruits/fruit-14.webp) |
| fruit-15 | Лимон | [WebP](../public/assets/fruits/fruit-15.webp) |
| fruit-16 | Лайм | [WebP](../public/assets/fruits/fruit-16.webp) |
| fruit-17 | Груша | [WebP](../public/assets/fruits/fruit-17.webp) |
| fruit-18 | Авокадо | [WebP](../public/assets/fruits/fruit-18.webp) |
| fruit-19 | Яблуко | [WebP](../public/assets/fruits/fruit-19.webp) |
| fruit-20 | Апельсин | [WebP](../public/assets/fruits/fruit-20.webp) |
| fruit-21 | Персик | [WebP](../public/assets/fruits/fruit-21.webp) |
| fruit-22 | Хурма | [WebP](../public/assets/fruits/fruit-22.webp) |
| fruit-23 | Маракуя | [WebP](../public/assets/fruits/fruit-23.webp) |
| fruit-24 | Гранат | [WebP](../public/assets/fruits/fruit-24.webp) |
| fruit-25 | Манго | [WebP](../public/assets/fruits/fruit-25.webp) |
| fruit-26 | Пітахая | [WebP](../public/assets/fruits/fruit-26.webp) |
| fruit-27 | Кокос | [WebP](../public/assets/fruits/fruit-27.webp) |
| fruit-28 | Ананас | [WebP](../public/assets/fruits/fruit-28.webp) |
| fruit-29 | Диня | [WebP](../public/assets/fruits/fruit-29.webp) |
| fruit-30 | Кавун | [WebP](../public/assets/fruits/fruit-30.webp) |
