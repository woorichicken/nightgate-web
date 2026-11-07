/**
 * 이 파일 하나만 고치면 사이트 내용이 전부 바뀐다.
 *
 * 컴포넌트는 여기서 읽기만 한다 — 문구·링크·이미지를 컴포넌트 안에 직접 쓰지 않는다.
 * 그래야 다음 프로젝트가 "복사해서 내용만 바꾸기"로 끝난다.
 *
 * 채워야 할 곳은 전부 TODO(create-opensource) 로 표시해 뒀다.
 */

// ─────────────────────────────────────────────────────────────
// 정체성
// ─────────────────────────────────────────────────────────────
/**
 * 플레이스홀더는 GitHub 에 **실재하지 않는 이름**이어야 한다.
 * `your-org/your-repo` 는 실제로 존재해서, 채우기 전 미리보기에 남의 저장소
 * 별 개수가 그대로 떴다(실측). 채우기 전 상태는 배지가 비어 있는 게 맞다.
 */
export const repo = {
  owner: "woorichicken",
  name: "nightgate",
  branch: "main",
} as const;

export const repoUrl = `https://github.com/${repo.owner}/${repo.name}`;

export const site = {
  /** 제품/프로젝트 이름. 헤더·OG·JSON-LD 에 그대로 쓴다. */
  name: "Nightgate",
  /** 한 줄. 검색 결과와 OG 설명의 첫 문장이 된다. */
  tagline: "Your coding agents work all night. In the morning, see only the decisions that are yours.",
  /** 두세 문장. meta description 으로 나간다(155자 안쪽 권장). */
  description:
    "Nightgate filters what overnight coding agents ask you down to the decisions only you can make, judged by Muse Glimmer on your own hardware.",
  /** 배포 도메인. metadataBase·sitemap·canonical 의 기준. */
  url: "https://nightgate.solhun.com",
  lang: "en",
  locale: "en_US",
  logo: "/logo.svg",
  /** OG 이미지(1200x630). 없으면 데모 이미지를 쓴다. */
  ogImage: "/og.png",
  license: "MIT",
  /** 검색 키워드. 과하게 넣지 않는다 — 5~12개. */
  keywords: ["coding agents", "overnight agents", "human in the loop", "agent triage", "Muse Glimmer", "local LLM", "Ollama", "LoRA", "CLI Manager", "open source"],
} as const;

// ─────────────────────────────────────────────────────────────
// 설치 — OSS 홈페이지에서 가장 많이 복사되는 한 줄
// ─────────────────────────────────────────────────────────────
export type InstallOption = { label: string; command: string };

export const install: {
  /** 히어로 바로 아래에 기본으로 뜨는 탭 */
  options: InstallOption[];
  /** 설치 뒤 확인용 한 줄(선택). 없으면 렌더 안 함. */
  verify?: string;
  /** verify 앞에 붙는 안내(선택). 명령만 덩그러니 있으면 무엇인지 안 읽힌다. */
  verifyLabel?: string;
} = {
  options: [
    { label: "git", command: "git clone https://github.com/woorichicken/nightgate" },
  ],
  verify: "cd nightgate && pnpm install",
  verifyLabel: "Needs Node 22.18+. Then:"
};

/** 30초 안에 뭔가 돌아가는 최소 예제. 히어로 다음에 온다. */
export const quickStart: { language: string; code: string } = {
  language: "bash",
  code: `# Copy the example cards in
node src/cli.ts seed

# Judge them. With no model running,
# every non-rule ask goes to you
node src/cli.ts review

# Read the morning page
node src/cli.ts morning

# Or open the console on port 4777
node src/cli.ts serve`,
};

// ─────────────────────────────────────────────────────────────
// 히어로
// ─────────────────────────────────────────────────────────────
export const hero = {
  /** 로고 옆 작은 배지. 없애려면 null. */
  badge: { text: "MIT · v0.1.0 · runs on your hardware" },
  /** 배열의 각 원소가 한 줄. 2줄이 가장 안정적이다. */
  title: ["Sleep through the night.", "Wake up to your decisions."],
  subtitle:
    "Overnight agents leave a pile of \"please decide\" behind. Nightgate keeps the asks only you can settle, and re-checks claims like \"tests pass\" before you believe them.",
  primaryCta: { label: "Get started", href: "#install" },
  secondaryCta: { label: "GitHub", href: repoUrl },
  /** 히어로 스크롤 애니메이션 안에 들어갈 데모. mp4 또는 이미지. */
  media: {
    type: "video" as "image" | "video",
    src: "/demo.mp4",
    /** 영상이 뜨기 전·자동재생이 막혔을 때 보이는 정지 화면. 영상이면 넣는다. */
    poster: "/demo-poster.jpg" as string | undefined,
    alt: "The Nightgate console judges the two example cards with Muse Glimmer, keeps four asks for the human, and records a label for the judge",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 기능 섹션 — 좌우 번갈아 배치된다
// ─────────────────────────────────────────────────────────────
export type Feature = {
  title: string;
  body: string;
  link?: { label: string; href: string };
  media: { type: "image" | "video"; src: string; alt: string };
};

export const featuresIntro = {
  badge: "Key Features",
  heading: "What it does",
  body: "The videos show the real console judging the two example cards from the repository, live on Muse Glimmer. The wait for the model is sped up.",
};

export const features: Feature[] = [
  {
    title: "Only your decisions reach the morning page",
    body: "A rule floor catches git push, production deploys, migrations, and payments with no model call. Muse Glimmer judges the rest against six kinds of human decision. A model can add work for you but never remove a rule hit, and anything unsure ends with you.",
    link: { label: "How the judge works →", href: `${repoUrl}#how-it-works` },
    media: { type: "video", src: "/feature-judge.mp4", alt: "Pressing Review new cards: the morning page shows 4 asks for the human and folds 2 away as handled by agents" },
  },
  {
    title: "Claims get re-checked",
    body: "Agents say the work is done. Nightgate checks HTTP status and files every time. It re-runs commands only from an allowlist and only when you turn that on, because agents write the cards.",
    link: { label: "The report card format →", href: `${repoUrl}/blob/${repo.branch}/prompts/agent-card.md` },
    media: { type: "video", src: "/feature-claims.mp4", alt: "The claims line reads 1 verified, 1 failed, 1 not checked, with the failed claim named: new index page exists, file not found" },
  },
  {
    title: "The judge learns your line",
    body: "Every \"this needed me\" or \"agent could have decided\" is saved as a labelled row for a LoRA on Glimmer. Only cards written by Meta models can train it, and other vendors' cards are evaluation only. The training script is in the repo, but the LoRA has not been trained yet.",
    link: { label: "What may train the judge →", href: `${repoUrl}/blob/${repo.branch}/docs/decisions/0001-training-data-policy.md` },
    media: { type: "video", src: "/feature-learning.mp4", alt: "Clicking Agent could have decided saves the label and the Learning panel count goes up" },
  },
];

// ─────────────────────────────────────────────────────────────
// FAQ — JSON-LD(FAQPage)로도 나가니 실제 질문만 쓴다
// ─────────────────────────────────────────────────────────────
export const faq: { question: string; answer: string }[] = [
  {
    question: "What do I need to run it?",
    answer:
      "Node 22.18+ and any OpenAI-compatible endpoint serving Muse Glimmer, for example Ollama. We run the 19.7 GB GGUF on a DGX Spark at about 30 seconds per ask. The README has the setup commands.",
  },
  {
    question: "What happens if no model is running?",
    answer:
      "Nothing is dropped. Rule hits still apply, and every other ask goes to you, marked as a fallback. You just lose the filtering.",
  },
  {
    question: "Does Nightgate start or control my agents?",
    answer:
      "No. Agents write a report card when they stop, and Nightgate reads it. It can also show live terminals from CLI Manager through that app's local API, read-only.",
  },
  {
    question: "Does anything leave my machine?",
    answer:
      "The asks stay local by default. If you set META_API_KEY, asks Glimmer is unsure about go to Muse Spark through the Meta Model API, but asks marked sensitive never do. HTTP evidence checks do call the URLs written in a card. The console listens on 127.0.0.1 and needs a token on any other address.",
  },
  {
    question: "How far along is it?",
    answer:
      "v0.1.0, measured on example cards: 2 cards and 6 asks took about 100 seconds, 4 asks went to the human, 2 were folded away, and 1 failed claim was caught. The Meta Model API tier has not been called, the LoRA has not been trained, and the evaluation set from real nights is not labelled yet.",
  },
  {
    question: "What license is Nightgate under?",
    answer:
      "MIT. You can use it commercially, modify it, and redistribute it, as long as you keep the copyright notice.",
  },
  {
    question: "How do I report a bug?",
    answer: `Open an issue at ${repoUrl}/issues with your Node version, the command you ran, and its output. Remove anything private from report cards first.`,
  },
];

// ─────────────────────────────────────────────────────────────
// 후원 — 결제 대신 들어가는 자리. 안 쓰면 enabled: false
// ─────────────────────────────────────────────────────────────
export const sponsor = {
  enabled: false,
  heading: "Support the project",
  body: "This project is maintained in the open. Sponsorship funds the time it takes.",
  cta: { label: "Sponsor on GitHub", href: `https://github.com/sponsors/${repo.owner}` },
};

// ─────────────────────────────────────────────────────────────
// 마지막 CTA
// ─────────────────────────────────────────────────────────────
export const cta = {
  heading: "Point it at last night's agents",
  body: "No signup and no account. It runs on your machine, and the source is short enough to read first.",
};

// ─────────────────────────────────────────────────────────────
// 네비게이션 — 없는 페이지를 넣지 않는다(404 로 신뢰를 깎는다)
// ─────────────────────────────────────────────────────────────
export const nav: { label: string; items: { href: string; label: string }[] }[] = [
  {
    label: "Resources",
    items: [
      { href: "/docs", label: "Docs" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    label: "Community",
    items: [
      { href: "/roadmap", label: "Roadmap" },
      { href: "/feedback", label: "Feedback" },
    ],
  },
];

export const footer = {
  columns: [
    {
      title: "Project",
      links: [
        { label: "Docs", href: "/docs" },
        { label: "Changelog", href: "/changelog" },
        { label: "Roadmap", href: "/roadmap" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "GitHub", href: repoUrl },
        { label: "Issues", href: `${repoUrl}/issues` },
        { label: "Feedback", href: "/feedback" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "License", href: `${repoUrl}/blob/${repo.branch}/LICENSE` },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// 사이트 검증 코드 — 없으면 비워 둔다(빈 값이 들어가면 태그를 안 만든다)
// ─────────────────────────────────────────────────────────────
export const verification: Record<string, string> = {
  // "naver-site-verification": "...",
  // "google-site-verification": "...",
};

// ─────────────────────────────────────────────────────────────
// /docs 페이지 — 진짜 문서가 따로 있으면 여기서 링크만 보낸다
// ─────────────────────────────────────────────────────────────
export const docs = {
  heading: "Documentation",
  body: "Install it, run the example cards, then point it at your own agents with the guides below.",
  /** 외부 문서 사이트가 있으면 채운다. 없으면 null → 버튼을 그리지 않는다. */
  externalUrl: null as string | null,
  guides: [
    {
      title: "README",
      description: "How it works, Glimmer setup, environment variables, and what has been measured.",
      href: `${repoUrl}#readme`,
    },
    {
      title: "Report card format",
      description: "The instructions to append to an overnight agent's prompt, and the JSON it writes.",
      href: `${repoUrl}/blob/${repo.branch}/prompts/agent-card.md`,
    },
    {
      title: "Training data policy",
      description: "Which decisions may train the judge, which stay evaluation only, and why.",
      href: `${repoUrl}/blob/${repo.branch}/docs/decisions/0001-training-data-policy.md`,
    },
  ],
}
