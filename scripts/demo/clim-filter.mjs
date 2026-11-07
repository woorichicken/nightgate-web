/**
 * 녹화 전용 — CLI Manager Control API 앞에 두는 읽기 전용 필터.
 *
 * 왜 필요한가: Nightgate 콘솔은 CLI Manager 의 세션을 전부 보여 준다. 녹화 머신에는
 * 다른 프로젝트 세션이 수십 개 떠 있어서 그대로 찍으면 영상에 남의 작업이 나온다.
 * 그래서 녹화용으로 연 세션 하나만 통과시키고, 경로가 담긴 cwd 는 뺀다.
 * 세션 화면은 실제 터미널 내용 그대로다.
 *
 * 사용: node scripts/demo/clim-filter.mjs <세션 id> [포트]
 */
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { homedir } from "node:os";
import { join } from "node:path";

const DEFAULT_PORT = 4798;
const sessionId = process.argv[2];
const port = Number(process.argv[3] ?? DEFAULT_PORT);
if (!sessionId) throw new Error("세션 id 가 필요하다");

const discovery = JSON.parse(readFileSync(join(homedir(), ".climanager", "control-api.json"), "utf8"));

async function upstream(path) {
  const response = await fetch(discovery.url + path, {
    headers: { Authorization: `Bearer ${discovery.token}`, "X-Client-Name": "nightgate-demo" },
  });
  if (!response.ok) throw new Error(`CLI Manager ${response.status} on ${path}`);
  return response.json();
}

function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://filter.local");
  try {
    if (req.method !== "GET") return send(res, 405, { error: "read only" });
    if (url.pathname === "/v1/sessions") {
      const payload = await upstream("/v1/sessions");
      const sessions = Array.isArray(payload) ? payload : payload.sessions;
      const only = sessions.filter((s) => s.id === sessionId).map(({ cwd, ...rest }) => rest);
      return send(res, 200, only);
    }
    if (url.pathname === `/v1/sessions/${sessionId}/output`) {
      return send(res, 200, await upstream(url.pathname + url.search));
    }
    send(res, 404, { error: "not found" });
  } catch (error) {
    send(res, 502, { error: String(error) });
  }
}).listen(port, "127.0.0.1", () => console.log(`clim filter on http://127.0.0.1:${port} → ${sessionId}`));
