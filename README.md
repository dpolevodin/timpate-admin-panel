Deployed: https://dpolevodin.github.io/timpate-admin-panel/

## QR Code Batch Generation

Для массовой генерации QR-кодов используется скрипт:

```bash
node scripts/generate-all.cjs room_numbers.txt
```

### Предварительная настройка

1. Установите зависимости проекта:

```bash
npm install
```

2. Установите Playwright и Chromium (только один раз):

```bash
npm install -D playwright
npx playwright install chromium
```

3. Запустите приложение локально:

```bash
npm run dev
```

По умолчанию скрипт ожидает, что приложение доступно по адресу:

```
http://localhost:5173
```

### Подготовка файла с номерами комнат

Создайте текстовый файл, например `room_numbers.txt`.

Каждый номер комнаты должен находиться на отдельной строке:

```text
1101
1102
1103
1104
1201
1202
```

### Запуск генерации

Из корня проекта выполните:

```bash
node scripts/generate-all.cjs room_numbers.txt
```

### Результат

После завершения работы скрипта будет создан каталог:

```
output/
```

В нем появятся PNG-файлы для каждой комнаты:

```
output/
├── tipmate_qr_hilton_room_1101.png
├── tipmate_qr_hilton_room_1102.png
├── tipmate_qr_hilton_room_1103.png
└── ...
```

Каждый QR-код содержит ссылку вида:

```
https://pay.tipmate.me/team/10?room=<ROOM_NUMBER>
```

Например:

```
https://pay.tipmate.me/team/10?room=1101
```

### Примечания

- Скрипт автоматически читает все номера комнат из указанного TXT-файла.
- Для каждой комнаты открывается страница генератора QR, после чего изображение сохраняется в папку `output`.
- Перед повторной генерацией рекомендуется очистить папку `output`, чтобы избежать смешивания старых и новых файлов.