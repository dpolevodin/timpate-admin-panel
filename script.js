(async () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Выбор файла
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".txt";

  const file = await new Promise((resolve) => {
    fileInput.onchange = (e) => resolve(e.target.files[0]);
    fileInput.click();
  });

  if (!file) {
    console.log("Файл не выбран");
    return;
  }

  const text = await file.text();

  const rooms = text
    .split(/\r?\n/)
    .map((r) => r.trim())
    .filter(Boolean);

  const input = document.getElementById("hilton-link-input");
  const button = document.getElementById("hilton-download-qr-btn");

  if (!input) {
    console.error("Не найден input #hilton-link-input");
    return;
  }

  if (!button) {
    console.error("Не найдена кнопка #hilton-download-qr-btn");
    return;
  }

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const url = `https://pay.tipmate.me/team/10?room=${room}`;

    // Способ корректно обновить React controlled input
    const setter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    ).set;

    setter.call(input, url);

    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));

    console.log(`${i + 1}/${rooms.length}: ${room}`);

    button.click();

    // Пауза между скачиваниями
    await sleep(800);
  }

  console.log("Готово!");
})();
