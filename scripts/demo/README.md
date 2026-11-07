# 데모 다시 찍기

사이트의 영상은 실제 Nightgate 콘솔을 Playwright 로 조작한 녹화다. 필요한 것은 넷이다.

| 필요한 것 | 쓰임 |
| --- | --- |
| Nightgate 체크아웃 | 콘솔·예제 카드 |
| Muse Glimmer 엔드포인트 | 실제 판정(`NIGHTGATE_LOCAL_URL`, 기본 `http://127.0.0.1:11435/v1`). 우리는 DGX Spark 로 SSH 터널을 건다 |
| CLI Manager 세션 하나 | 터미널 칸에 보일 실제 세션. `clim-filter.mjs` 가 이 세션만 통과시킨다 |
| [screenstudio-alt](https://github.com/connerkward/screenstudio-alternative-skill) `polish.py` | 합성 커서와 유휴 압축 |

## 순서

```bash
# 1. 깨끗한 홈에 예제 카드만 넣는다
export NIGHTGATE_HOME=<빈 폴더>
(cd <nightgate> && node src/cli.ts seed)

# 2. 필터와 콘솔을 띄운다 (쓰고 나면 PID 로 닫는다)
node scripts/demo/clim-filter.mjs <세션 id> 4798 &
(cd <nightgate> && CLIM_URL=http://127.0.0.1:4798 CLIM_TOKEN=demo NIGHTGATE_PORT=4790 node src/cli.ts serve) &

# 3. 찍는다
node scripts/demo/scenario.mjs <출력 폴더> http://127.0.0.1:4790/
```

그다음 `demo-video` 스킬의 3단계(후처리)·3.5단계(`verify-demo.mjs`)를 돌린다. 시나리오의 클릭은 6번이다.

## 규칙

- 예제 카드 말고 실제 카드를 찍지 않는다. 고객 데이터와 내부 계획이 들어 있을 수 있다.
- 필터 없이 찍지 않는다. 녹화 머신의 다른 세션 이름이 영상에 나온다.
- 모델 대기 구간은 빨리 돌려도 되지만 결과를 지어내지 않는다. 사이트 본문에 빨리 돌렸다고 적혀 있다.
