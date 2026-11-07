# Backlog

Found while building this site. Not fixed here.

| # | Problem | Evidence | Fix idea |
|---|---|---|---|
| 1 | Widget label is Korean ("피드백") on an English site — feedback-kit-web 0.15 has no label/locale prop | `grep 피드백 node_modules/@solhun/feedback-kit-web/dist/index.js` | Belongs to woorichicken/feedback-kit: add a `labels`/`locale` prop |
| 2 | Upstream console prints the word `null` under the claims line | `web/app.js` passes `null` to `replaceChildren` when no card is unreviewed. The DOM turns it into text. It shows at the page bottom in `public/demo.mp4` | Belongs to woorichicken/nightgate: filter out the null before `replaceChildren` |
