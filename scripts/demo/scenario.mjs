import { record } from "../record-demo.mjs";

/**
 * Nightgate 콘솔 데모 — 카드를 실제로 판정하고, 라벨을 남기고, 재검증 결과를 본다.
 *
 * 사용: node scripts/demo/scenario.mjs <출력 폴더> <콘솔 URL>
 * 콘솔을 띄우는 법은 이 폴더 README.
 */
const REVIEW_TIMEOUT_MS = 8 * 60_000; // Glimmer 가 공유 장비라 줄을 서면 평소(약 100초)보다 길어진다
// 재검증 두 줄이 화면 아래쪽에 오는 위치. 그 아래에 원본 콘솔이 찍는 「null」 글자(원본 결함)가 있어 화면 밖에 둔다
const CLAIMS_TOP = 750;

await record({
  outDir: process.argv[2] ?? "./demo-out",
  url: process.argv[3] ?? "http://127.0.0.1:4790/",
  scenario: async (a) => {
    /** 요소가 화면 위쪽에 오도록 스크롤한다. a.click 은 스크롤을 대신 해 주지 않는다. */
    async function bringIntoView(selector, topMargin) {
      const y = await a.page.locator(selector).first().evaluate((el) => el.getBoundingClientRect().top);
      await a.scroll(y - topMargin);
    }

    // 1. 터미널 — CLI Manager 에 떠 있는 세션을 읽는다
    await a.wait(1200);
    await a.click(".sessions li", { pause: 1800 });

    // 2. 판정 — 실제 Muse Glimmer 호출이라 끝날 때까지 기다린다
    await a.click("#review-btn", { pause: 1000 });
    await a.page.waitForFunction(
      () => document.querySelectorAll("#human .item").length > 0 && document.getElementById("review-progress").textContent === "",
      undefined,
      { timeout: REVIEW_TIMEOUT_MS, polling: 500 },
    );
    await a.wait(4000);

    // 3. 라벨 — 첫 칸(gpt-5 가 쓴 카드), 그다음 칸(muse-spark 가 쓴 카드)
    await a.click('#human button:text-is("Yes, this needed me")', { pause: 2600 });
    await a.click('#human button:text-is("Yes, this needed me")', { pause: 3200 });

    // 4. 접힌 칸 — 에이전트에게 넘어간 두 건을 펴 본다
    // 펼치기 전에는 페이지가 짧아 끝까지 안 올라가므로, 펼친 뒤 한 번 더 스크롤한다
    await bringIntoView("#handled-title", 160);
    await a.click("#handled-title", { pause: 800 });
    await bringIntoView("#handled-title", 90);
    await a.wait(3000);
    await a.click('#handled button:text-is("Right, agent decides")', { pause: 2200 });

    // 5. 재검증 — 실패한 주장이 이름과 함께 남는다
    await bringIntoView("#claims", CLAIMS_TOP);
    await a.wait(3800);
  },
});
