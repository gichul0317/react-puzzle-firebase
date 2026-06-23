# HTML Puzzle Game

HTML semantic tag pairs을 맞추는 React 퍼즐 게임입니다. 사용자가 이름을 입력하고 게임을 시작하면 HTML 태그 카드들이 랜덤하게 배치되고, 같은 태그의 여는/닫는 카드를 맞추면 잠깐 공개된 뒤 사라집니다.

Live page: https://gichul0317.github.io/react-puzzle-firebase/

## 주요 기능

- 사용자 이름 입력 후 게임 시작
- 매 게임마다 퍼즐 카드 랜덤 배치
- 매칭된 카드의 태그 값을 잠깐 보여준 뒤 깜빡이며 제거
- 제거된 카드 자리 유지
- 게임 완료 후에만 Firebase Realtime Database에 점수 저장
- 시작 화면에서 `See Scores`로 완료된 사용자 점수 확인
- `Play Again`으로 시작 화면 복귀

## Tech Stack

- React 17
- Vite
- Vitest
- Firebase Realtime Database
- GitHub Pages

## 로컬 실행

```bash
npm install
npm run start
```

Vite dev server가 실행되면 보통 아래 주소에서 확인할 수 있습니다.

```text
http://localhost:5173/react-puzzle-firebase/
```

이미 `5173` 포트가 사용 중이면 Vite가 다른 포트를 자동으로 안내합니다.

## 환경 변수

Firebase 설정은 `.env.local`에 `VITE_` prefix로 넣어야 합니다. `.env.local`은 git에 커밋하지 않습니다.

```bash
VITE_API_KEY=...
VITE_AUTH_DOMAIN=...
VITE_PROJECT_ID=...
VITE_STORAGE_BUCKET=...
VITE_MESSAGING_SENDER_ID=...
VITE_APP_ID=...
```

## Scripts

```bash
npm run start
```

Vite 개발 서버를 실행합니다.

```bash
npm test
```

Vitest 테스트를 실행합니다.

```bash
npm run build
```

프로덕션 빌드를 `dist/` 폴더에 생성합니다.

```bash
npm run deploy
```

`dist/` 빌드 결과를 `gh-pages` 브랜치로 배포합니다.

## 배포 순서

소스 브랜치와 라이브 페이지 상태가 어긋나지 않도록 아래 순서를 권장합니다.

```bash
npm test
npm run build
git add .
git commit -m "Update puzzle game"
git push origin build
npm run deploy
```

`npm run deploy`는 `predeploy`로 `npm run build`를 먼저 실행한 뒤, `gh-pages -d dist`로 GitHub Pages 브랜치에 배포합니다.
