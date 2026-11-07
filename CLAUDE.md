# CLAUDE.md

`nightgate-web` 저장소의 작업 지침. `AGENTS.md`는 이 파일만 가리킨다.

## 이 저장소가 하는 일

[Nightgate](https://github.com/woorichicken/nightgate)의 소개 사이트(https://nightgate.solhun.com)다.
`oss-landing-template` 을 복제해 `site.config.ts` 를 채웠다. 제품 코드는 원본 저장소에 있고 여기에는 없다.
사이트 문구의 근거는 원본 README 와 코드다 — 원본에서 안 되는 기능을 된다고 쓰지 않는다
(Meta Model API 계층 미호출 · LoRA 미학습 · 실제 밤 평가셋 미라벨, FAQ 「How far along is it?」).

## 깨지 말아야 할 것

### 문구·링크·이미지는 site.config.ts 에만 있다

컴포넌트는 읽기만 한다. 새 섹션을 만들 때 문구를 컴포넌트 안에 쓰면 그 순간
"복사해서 내용만 바꾸기"가 무너진다 — 다음 사람이 파일을 전수로 뒤지게 된다.

검사: `grep -rn '"[A-Z][a-z]\{4,\}' components/*.tsx` 로 나오는 문자열이
UI 라벨(Copy·Copied·GitHub)이 아니라 **제품 문구**면 config 로 빼야 한다.

### 없는 라우트를 링크하지 않는다

`nav` · `footer.columns` · `app/sitemap.ts` 는 실제로 존재하는 경로만 담는다.
페이지를 지우면 이 셋에서도 지운다. 사이트맵의 404 는 사이트 전체 색인 신뢰도를 깎는다.

### 근거 없는 숫자를 만들지 않는다

별 개수·기여자·릴리스 버전은 전부 `lib/github.ts` 가 GitHub API 에서 읽는다.
하드코딩하거나 "예시값"을 넣지 않는다. API 가 실패하면 그 조각을 **숨긴다** —
`★ 0` 을 그리면 죽은 프로젝트로 보이므로, 값이 없으면 아예 안 그린다.

원본(solhun-web-page)에 있던 후기 3개와 `aggregateRating 4.9/150` JSON-LD 는
지어낸 값이라 통째로 뺐다. 다시 넣지 않는다.

### 쓰기 API 는 키가 없으면 전부 막힌다

`lib/admin-auth.ts` 의 `isAdmin` 은 `ADMIN_API_KEY` 가 없으면 **무조건 false** 다.
"키 미설정 = 인증 통과"로 뒤집는 변경을 넣지 않는다. 비교는 상수 시간으로 한다
(앞자리부터 순차 비교하면 응답 시간으로 키를 한 글자씩 맞출 수 있다).

### 피드백에 쓰기 API 를 열지 않는다

`/api/feedback` 은 GET 과 DELETE 만 있다. 에이전트가 제보를 등록할 수 있으면
이 페이지의 존재 이유가 사라진다.

## 검증 기준

"됐다"고 말하기 전에 확인한다.

- `pnpm typecheck` 와 `pnpm build` 가 통과해야 한다. 빌드는 GitHub API 를 실제로
  치므로, 레이트리밋에 걸리면 배지가 비어도 **빌드는 성공해야** 한다(그게 설계다).
- `site.config.ts` 를 고쳤으면 **화면을 열어** 반영을 본다. 타입이 통과했다고
  문구가 바뀐 게 아니다.
- 라우트를 추가/삭제했으면 `nav`·`footer`·`sitemap.ts` 세 곳을 같이 고쳤는지 본다.
  한 곳만 고치면 나머지가 404 를 가리킨다.
- API 를 고쳤으면 **키 없이 한 번, 틀린 키로 한 번** 쳐서 둘 다 401 인지 본다.
  200 을 받는 경로가 하나라도 있으면 쓰기가 열린 것이다.

## 개발 명령

```bash
pnpm install
pnpm dev -p 3220    # 라쏘런 허용 호스트에 localhost:3220 이 들어 있다
pnpm typecheck
pnpm build
pnpm db:generate && pnpm db:migrate
```

## 로고

- 3D 클레이 심볼 `brand/logo/`(`logo-maker`). 원본·프롬프트·비용은 `brand/logo/source/*.json`.
- 머리·바닥글 `public/logo.svg`, 탭 `app/icon.svg`·`app/favicon.ico`, iOS `app/apple-icon.png`, 공유 카드 `public/og.png`(`brand/og.html` 을 1200×630 으로 찍는다).

## 데모 영상

- `public/demo.mp4`·`public/feature-*.mp4` 는 **실제 Nightgate 콘솔**을 Playwright 로 조작한 녹화다. 판정은 실제 Muse Glimmer 호출이고, 카드는 원본 `examples/cards` 2장이다. 모델 대기 구간만 빠르게 돌렸다.
- 다시 찍기: `scripts/demo/` 의 README.

## 피드백 위젯 (feedback-kit)

- 부착 타입: **global**(홈페이지 방문자 전원). 배선은 `components/feedback/FeedbackWidget.tsx`, 마운트는 `app/layout.tsx`.
- 수집처: 라쏘런 프로젝트 「Nightgate 홈페이지 (nightgate-web)」 · 소스 `nightgate-web`. 허용 호스트: `nightgate.solhun.com`, `nightgate-web.vercel.app`, `localhost:3220`
  (호스트를 늘리면 `dp update-source-hosts` 도 같이 — 안 맞으면 버튼은 뜨는데 보내면 403).
- 환경변수 `NEXT_PUBLIC_DP_FEEDBACK_URL`·`_KEY` — 빌드 때 인라인되므로 Vercel production·preview 에 둘 다 넣는다. 비면 위젯이 조용히 사라진다.

## 배포

- GitHub `woorichicken/nightgate-web`(public) → Vercel `gyeonghunjeong-7007s-projects/nightgate-web`, production branch `main`. main 에 push 하면 자동 배포된다. 수동 `vercel --prod` 는 쓰지 않는다.
- env: `NEXT_PUBLIC_DP_FEEDBACK_URL`·`_KEY`(production·preview), `DATABASE_URL`·`ADMIN_API_KEY`(sensitive, production·preview). DB 는 Neon `nightgate-web`(`odd-forest-69254633`, aws-us-east-2).
