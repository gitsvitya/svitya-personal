# Публикация svitya.com на VPS Спринтбокс

Вариант для VPS/VDS Спринтбокс с Ubuntu 24.04, доступом `root` и самостоятельным
управлением сервером. Сайт собирается на Linux, запускается как служба systemd,
а nginx принимает запросы к домену и передает их приложению Next.js.

Если у вас обычный виртуальный хостинг с выбором Node.js в панели Спринтхост,
используйте [основную инструкцию для тарифа Восток-1](deploy-sprinthost.md).

Шаги установки ниже рассчитаны на чистый Ubuntu 24.04 или сервер, на котором вы
самостоятельно управляете Node.js и nginx. Если сервер уже обслуживает сайты или
управляется Hestia/ISPmanager, настройку нового домена нужно согласовать с существующей
конфигурацией. Панель может перезаписать созданные вручную файлы nginx.

## 1 Подготовка и резервная копия

В личном кабинете Спринтбокс найдите IP-адрес бокса, установленную ОС и данные SSH.
Для стандартного бокса используется пользователь `root`; см.
[подключение к Спринтбоксу по SSH](https://help.sprintbox.ru/service-work/ssh-connect).

Перед изменениями создайте резервную копию бокса через панель, особенно если на нем
уже есть данные. Возможности описаны в
[инструкции Спринтбокс по бекапам](https://help.sprintbox.ru/backup/create-rsync-backup).

На Mac проверьте проект по шагу 2 [основной инструкции](deploy-sprinthost.md).
Создайте архив исходников по шагу 5 той же инструкции.
Для отправки на VPS используйте следующий блок:

```bash
SVITYA_LOGIN='root'
SVITYA_SERVER='SERVER_IP'
SVITYA_RELEASE='20261007-01'
scp "/tmp/svitya-source-$SVITYA_RELEASE.tar.gz" \
  "$SVITYA_LOGIN@$SVITYA_SERVER:~/"
ssh "$SVITYA_LOGIN@$SVITYA_SERVER"
```

Замените `SERVER_IP` на адрес VPS. Имя публикации должно совпадать с именем архива.
При первом подключении сверьте адрес сервера и подтвердите ключ; введите пароль,
если сервер запрашивает его.

После подключения команды выполняются **на VPS под `root`**, если прямо не указано
другое. Выполняйте команды по очереди и переходите дальше после успешного завершения:

```bash
cat /etc/os-release
uname -m
df -h /
```

Подтвердите Ubuntu 24.04. Для другой ОС потребуется адаптировать установку пакетов.

## 2 Установка Node.js и nginx

На VPS:

```bash
apt-get update
apt-get install -y curl ca-certificates nginx nano snapd
curl -fsSL https://deb.nodesource.com/setup_24.x -o /tmp/svitya-nodesource-24.sh
bash /tmp/svitya-nodesource-24.sh
apt-get install -y nodejs
node --version
npm --version
command -v node
```

Версия Node.js должна начинаться с `v24.`. Используется репозиторий NodeSource
для конкретной ветки 24; установка описана в
[документации NodeSource](https://github.com/nodesource/distributions/blob/master/DEV_README.md),
а [скрипт ветки 24](https://github.com/nodesource/distributions/blob/master/scripts/deb/setup_24.x)
доступен отдельно. В проекте эта же ветка используется для автоматических проверок.

Сохраните путь из `command -v node`: ниже предполагается `/usr/bin/node`.

Создайте отдельного пользователя для запуска приложения:

```bash
adduser --disabled-password --gecos '' svitya
install -d -o svitya -g svitya /home/svitya/builds/svitya
install -d -o svitya -g svitya /home/svitya/apps/svitya/releases
```

Этот шаг выполняется один раз. Если пользователь `svitya` уже существует,
используйте его существующий домашний каталог вместо повторного создания.

## 3 Сборка сайта

Под `root` передайте архив пользователю приложения:

```bash
SVITYA_RELEASE='20261007-01'
install -m 600 -o svitya -g svitya \
  "/root/svitya-source-$SVITYA_RELEASE.tar.gz" \
  "/home/svitya/svitya-source-$SVITYA_RELEASE.tar.gz"
su - svitya
```

Теперь команды выполняются **под пользователем `svitya`**:

```bash
SVITYA_RELEASE='20261007-01'
SVITYA_SOURCE="$HOME/builds/svitya/$SVITYA_RELEASE"
SVITYA_RELEASE_DIR="$HOME/apps/svitya/releases/$SVITYA_RELEASE"
mkdir -p "$SVITYA_SOURCE" "$SVITYA_RELEASE_DIR"
tar -xzf "$HOME/svitya-source-$SVITYA_RELEASE.tar.gz" -C "$SVITYA_SOURCE"
cd "$SVITYA_SOURCE"
npm ci --include=dev
npm run build
```

После успешной сборки:

```bash
cp -a "$SVITYA_SOURCE/.next/standalone/." "$SVITYA_RELEASE_DIR/"
cd "$SVITYA_RELEASE_DIR"
node --check server.js
node -e 'console.log(require("sharp").versions)'
ln -sfn "$SVITYA_RELEASE_DIR" "$HOME/apps/svitya/current"
exit
```

`current` указывает на выбранную готовую версию приложения. После `exit` вы снова
работаете под `root`. В комплекте должны присутствовать `server.js`, `node_modules`,
`.next/static` и `public`. При ошибке сборки или проверки `sharp` сначала исправьте ее,
затем переходите к запуску.

Если сборке не хватает памяти, можно подготовить Linux-комплект через Docker на Mac
по разделу 6 [основной инструкции](deploy-sprinthost.md). Для этого VPS используйте
образ `node:24-bookworm` и архитектуру из `uname -m`. Передайте полученный архив
пользователю `svitya`, распакуйте его в новый каталог версии и выполните проверку
`sharp` и создание ссылки `current` выше. Повторная установка зависимостей готовому
комплекту не требуется.

## 4 Постоянный запуск через systemd

Под `root` откройте файл службы:

```bash
nano /etc/systemd/system/svitya.service
```

Вставьте:

```ini
[Unit]
Description=svitya.com Next.js
After=network.target

[Service]
Type=simple
User=svitya
Group=svitya
WorkingDirectory=/home/svitya/apps/svitya/current
Environment=NODE_ENV=production
Environment=HOSTNAME=127.0.0.1
Environment=PORT=3000
ExecStart=/usr/bin/node /home/svitya/apps/svitya/current/server.js
Restart=on-failure
RestartSec=5
TimeoutStopSec=30

[Install]
WantedBy=multi-user.target
```

Если `command -v node` показал другой путь, замените `/usr/bin/node` в `ExecStart`.
Сохраните файл в nano: `Control+O`, `Enter`, затем `Control+X`.

Включите службу:

```bash
systemctl daemon-reload
systemctl enable --now svitya
systemctl status svitya --no-pager
curl -I http://127.0.0.1:3000/ru/about
```

Статус должен быть `active (running)`, а локальная страница должна отвечать `200`.
systemd запускает приложение после перезагрузки VPS и перезапускает его при аварийном
завершении. Механизм служб описан в
[документации systemd](https://github.com/systemd/systemd/blob/main/man/systemd.service.xml).

Приложение слушает только `127.0.0.1:3000`. Доступ посетителей будет идти через nginx
по обычному адресу сайта.

## 5 Подключение домена через nginx

Под `root` создайте конфигурацию нового сайта:

```bash
nano /etc/nginx/sites-available/svitya.com
```

Вставьте:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name svitya.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
    }
}
```

Сохраните файл и выполните:

```bash
ln -s /etc/nginx/sites-available/svitya.com /etc/nginx/sites-enabled/svitya.com
nginx -t
systemctl enable --now nginx
systemctl reload nginx
```

Если ссылка уже существует, повторно создавать ее не нужно. Если `nginx -t` обнаружил
ошибку, исправьте конфигурацию до перезагрузки. Не удаляйте конфигурации других сайтов.
Если IPv6 отключен в ОС, уберите строку `listen [::]:80;` и повторите проверку.

Пути конфигурации описаны в
[инструкции Спринтбокс по nginx](https://help.sprintbox.ru/web-servers/nginx),
а параметры передачи запросов в
[документации nginx](https://nginx.org/en/docs/http/ngx_http_proxy_module.html).
Все запросы передаются Next.js, включая публичные файлы, изображения, sitemap и robots;
отдельно копировать их в `public_html` на этом VPS не требуется.

В DNS `svitya.com` направьте запись `A` на IP-адрес VPS. Если существует запись `AAAA`,
она должна вести на этот же VPS по IPv6 либо быть убрана при отсутствии IPv6.
Записи почты при переносе только сайта сохраняются.

Разрешите входящие TCP-соединения на порты **80 и 443** в файрволе Спринтбокс и,
если включен отдельный файрвол Ubuntu, в нем тоже. Сохраните доступ к SSH.
Порт `3000` снаружи не нужен. Настройки панели описаны в
[инструкции по файрволу](https://help.sprintbox.ru/network/firewall).

На Mac проверьте HTTP:

```bash
curl -I http://svitya.com/ru/about
```

До выпуска SSL ожидается `200`. Для проверки nginx до переключения DNS можно использовать:

```bash
curl --resolve svitya.com:80:SERVER_IP -I http://svitya.com/ru/about
```

Замените `SERVER_IP` на адрес VPS. Для выпуска сертификата DNS уже должен направлять
домен на этот сервер.

## 6 HTTPS и сертификат

После успешной проверки HTTP выполните на VPS под `root`:

```bash
snap install --classic certbot
ln -s /snap/bin/certbot /usr/local/bin/certbot
certbot --nginx -d svitya.com --redirect
certbot renew --dry-run
```

Если команда `certbot` уже настроена, повторное создание ссылки не требуется.
Во время выпуска сертификата укажите свою почту и ответьте на вопросы Certbot.
Он добавит HTTPS в конфигурацию nginx и перенаправление с HTTP.
`renew --dry-run` проверяет автоматическое продление. Порядок установки описан в
[официальной инструкции Certbot для nginx](https://certbot.eff.org/instructions?ws=nginx&os=snap).

Для дополнительного адреса `www.svitya.com` сначала настройте его DNS и добавьте
это имя в `server_name`, затем выпустите сертификат сразу для обоих имен:

```bash
certbot --nginx -d svitya.com -d www.svitya.com --redirect
```

Этот дополнительный шаг нужен только при использовании `www`.

## 7 Проверка сайта

Повторите проверку страниц, изображений, PDF, языков и телефона из шага 10
[основной инструкции](deploy-sprinthost.md).

В конфигурации с Certbot перенаправление HTTP на HTTPS обычно отвечает `301`;
проверьте также правильный адрес в заголовке `Location`. Сам сайт должен отвечать
`200`, а несуществующие страницы `404`.

Команды диагностики на VPS под `root`:

```bash
systemctl status svitya --no-pager
journalctl -u svitya -n 100 --no-pager
nginx -t
tail -n 50 /var/log/nginx/error.log
```

При `502 Bad Gateway` проверьте статус приложения, журнал службы и ответ
`http://127.0.0.1:3000/ru/about`. При отсутствии подключения снаружи проверьте DNS
и файрвол. При ошибке обработки изображений проверьте Linux-версию `sharp`.

## 8 Обновление и возврат

Отправьте новые исходники и повторите сборку из шага 3 с новым именем публикации.
Подготовьте новую версию до изменения ссылки `current`. До переключения сохраните
прежнее имя версии:

```bash
readlink -f /home/svitya/apps/svitya/current
```

Под пользователем `svitya` переключите ссылку на готовую новую версию, например:

```bash
ln -sfn "$HOME/apps/svitya/releases/20261007-02" "$HOME/apps/svitya/current"
```

Затем под `root`:

```bash
systemctl restart svitya
systemctl status svitya --no-pager
curl -I http://127.0.0.1:3000/ru/about
```

Перезапуск одной службы вызывает короткий перерыв. После него проверьте публичный сайт.
Для возврата под пользователем `svitya` укажите прежнюю версию в `current` и снова
перезапустите службу под `root`:

```bash
ln -sfn "$HOME/apps/svitya/releases/20261007-01" "$HOME/apps/svitya/current"
```

Сохраняйте предыдущую исправную версию до проверки новой. Открытым вкладкам посетителей
после обновления может потребоваться перезагрузка: новый процесс обслуживает файлы
только выбранной версии сборки.

Инструкцию установки и запуск службы нужно подтвердить на вашем VPS. Локальный запуск
на Mac проверяет сайт и комплект сборки, но не подтверждает настройку nginx, DNS,
сертификата и операционной системы сервера.
