const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const INPUT_FILE = process.argv[2];
const GO_TO_URL = "http://localhost:5173/timpate-admin-panel/"

if (!INPUT_FILE) {
  console.log("Usage: node scripts/generate-all.js room_numbers.txt");
  process.exit(1);
}

const OUTPUT_DIR = path.join(process.cwd(), "output");

fs.rmSync(OUTPUT_DIR, {
  recursive: true,
  force: true,
});

fs.mkdirSync(OUTPUT_DIR, {
  recursive: true,
});

const rooms = fs
  .readFileSync(INPUT_FILE, "utf8")
  .split(/\r?\n/)
  .map((x) => x.trim())
  .filter(Boolean);

(async () => {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage({
    viewport: {
      width: 1800,
      height: 2600,
    },
  });

  //
  // если React запускается локально
  //
  await page.goto(GO_TO_URL, {
    waitUntil: "networkidle",
  });

  // если используешь gh-pages
  // await page.goto("https://dpolevodin.github.io/timpate-admin-panel/", {
  //     waitUntil: "networkidle"
  // });

  for (const room of rooms) {
    const url = `https://pay.tipmate.me/team/10?room=${room}`;

    await page.fill("#hilton-link-input", "");

    await page.fill("#hilton-link-input", url);

    await page.waitForTimeout(300);

    const card = page.locator("#hilton-qr-card");

    await card.screenshot({
      path: path.join(OUTPUT_DIR, `tipmate_qr_hilton_room_${room}.png`),
    });

    console.log(`✔ ${room}`);
  }

  await browser.close();

  console.log("Done.");
})();
