# Публікація гри · 04.10.2026

Запит користувача: зробити перегляд доступним іншим людям без локального запуску. Обрано GitHub Pages у наявному публічному репозиторії гри. Нові акаунти, платні ресурси, домен і сервер не потрібні.

DEP-01: публічна HTTPS-адреса відкривається без авторизації; фон, усі 30 фруктів та діагностика завантажуються з підтеки репозиторію.
DEP-02: deploy тільки після наявного повного check, лише із власної default-гілки, artifact тільки production dist. PR не може запустити deploy. Pages write та OIDC доступні лише deploy job.
DEP-03: перевірити публічну гру в ізольованому браузері: boot, відсутність test API/помилок ресурсів, drop, pause/restart, 30 diagnostic canvas; оновити README і навчальний PR живим посиланням.

План: доповнити CI двома кроками пакування/деплою; увімкнути Pages workflow; дочекатися green check та deployment; перевірити реальну URL; записати фактичний результат нижче. Runtime гри не змінюється. Активна користувацька партія залишається відкритою на 4181.

Локальний рекорд зберігається на іншому origin і автоматично не мігрує в публічну версію. Це властивість браузерного localStorage; дані на локальній адресі не видаляються.

Офіційні джерела: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Vite static deploy](https://vite.dev/guide/static-deploy.html). `vite preview` призначений для локальної перевірки збірки.

## Фактичний результат

Опубліковано: **https://dmitryyr.github.io/fruit-merge-capstone/**. Pages build_type=workflow, HTTPS enforced. Ревізія першого deploy: `7defe3bfc49c3888e4808f67a77223a1a8765aef`.

[Actions run 37206623225](https://github.com/DmitryyR/fruit-merge-capstone/actions/runs/37206623225): check і deploy завершено success. [Збережений результат](evidence/runs/pages-deploy.json).

`node scripts/verify-deployment.mjs` → exit 0. Ізольований Chromium без авторизації: HTTPS 200, 30 WebP фруктів + фон без помилок, 10 реальних drop-жестів, pause/restart, desktop 1440×900 та mobile 390×844 без горизонтального overflow, 30 canvas у діагностиці, production test API відсутній. [JSON перевірки](evidence/runs/public-deployment.json), [desktop](evidence/screenshots/public-desktop.png), [mobile](evidence/screenshots/public-mobile.png). Desktop-скриншот оглянуто; видно реальну партію з 40 очками після випадкової черги. Час у JSON UTC; перевірка виконана 04.10.2026 за Europe/Kiev.

Тести запускалися у власному тимчасовому профілі. Відкрита локальна партія користувача та її рекорд не змінювалися. Реальний телефон і браузери поза Chromium цим прогоном не перевірялись.
