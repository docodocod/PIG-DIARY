# 🐷 PIG-DIARY

<div align="center">

**나만의 일기장을 공유하고 소통하는 소셜 다이어리 플랫폼**

[기능 소개](#-주요-기능) • [시작하기](#-시작하기) • [기술 스택](#-기술-스택) • [프로젝트 구조](#-프로젝트-구조)

</div>

---

## 📖 프로젝트 소개

**PIG-DIARY**는 사용자들이 일상의 순간을 기록하고 공유하며, 다른 사용자들과 소통할 수 있는 소셜 다이어리 플랫폼입니다. 이미지, 해시태그, 댓글, 좋아요 기능을 통해 풍부한 경험을 제공하며, 실시간 채팅과 AI 챗봇을 통해 더욱 역동적인 커뮤니케이션을 지원합니다.

## ✨ 주요 기능

### 🔐 인증 시스템
- **다양한 로그인 방식**
  - 로컬 회원가입/로그인
  - Google OAuth 2.0
  - Kakao 소셜 로그인
  - Naver 소셜 로그인
- 세션 기반 인증
- 비밀번호 암호화 (bcrypt)
- JWT 토큰 지원

### 📝 일기/게시글 작성
- 텍스트 및 이미지 업로드 (다중 이미지 지원)
- 해시태그 기능 (#태그 자동 추출 및 검색)
- 댓글 및 좋아요 기능
- 게시글 수정/삭제

### 💬 실시간 채팅
- Socket.io 기반 실시간 채팅
- 채팅방 생성 및 관리
- 1:1 및 그룹 채팅 지원
- 채팅 이미지 전송

### 🤖 AI 챗봇
- OpenAI GPT API 연동
- 자연어 대화 지원
- 실시간 응답

### 👥 소셜 기능
- 사용자 프로필 관리
- 팔로우/팔로워 시스템
- 프로필 이미지 업로드
- 사용자 검색

### 🗺️ 맛집 검색
- Kakao Map API 연동
- 위치 기반 맛집 검색
- 즐겨찾기 기능
- 지도에 마커 표시

### 🌤️ 날씨 정보
- 실시간 날씨 정보 표시
- 위치 기반 날씨 조회

## 🛠️ 기술 스택

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.19.2
- **Template Engine**: Nunjucks 3.2.4
- **ORM**: Sequelize 6.32.1
- **Database**: MySQL/MariaDB

### Authentication & Security
- **Passport.js** - 인증 미들웨어
- **bcrypt** - 비밀번호 암호화
- **helmet** - 보안 헤더 설정
- **hpp** - HTTP Parameter Pollution 방지
- **csurf** - CSRF 보호

### Real-time Communication
- **Socket.io** 4.7.2 - 실시간 양방향 통신
- **ws** 8.13.0 - WebSocket 지원

### AI & External APIs
- **OpenAI** 4.24.7 - ChatGPT API
- **Kakao Map API** - 지도 및 장소 검색
- **Weather API** - 날씨 정보

### File Upload
- **Multer** 1.4.5 - 파일 업로드 처리
- 이미지 최적화 및 저장

### Logging & Monitoring
- **Winston** 3.11.0 - 로깅 시스템
- **Morgan** 1.10.0 - HTTP 요청 로깅
- **PM2** 5.4.0 - 프로세스 관리

### Utilities
- **moment** 2.29.4 - 날짜/시간 처리
- **nodemailer** 6.9.12 - 이메일 전송
- **uuid** 9.0.0 - 고유 ID 생성
- **color-hash** 2.0.2 - 색상 해시 생성

## 📁 프로젝트 구조

```
PIG-DIARY/
├── app.js                 # 애플리케이션 진입점
├── package.json           # 프로젝트 의존성
├── config/
│   └── config.js         # 데이터베이스 설정
├── src/
│   ├── controllers/      # 컨트롤러 (비즈니스 로직)
│   │   ├── auth.js       # 인증 관련
│   │   ├── chatBot.js    # 챗봇 관련
│   │   ├── index.js      # 메인 페이지
│   │   ├── post.js       # 게시글 관련
│   │   ├── room.js       # 채팅방 관련
│   │   └── user.js       # 사용자 관련
│   ├── middlewares/      # 미들웨어
│   │   ├── index.js      # 미들웨어 설정
│   │   └── morganMiddleware.js  # 로깅 미들웨어
│   ├── models/           # 데이터베이스 모델
│   │   ├── chat.js       # 채팅 모델
│   │   ├── comment.js    # 댓글 모델
│   │   ├── favorite.js   # 좋아요 모델
│   │   ├── hashtag.js    # 해시태그 모델
│   │   ├── post.js       # 게시글 모델
│   │   ├── room.js       # 채팅방 모델
│   │   ├── upload.js     # 업로드 모델
│   │   └── user.js       # 사용자 모델
│   ├── modules/          # 유틸리티 모듈
│   │   ├── Logger.js     # 로거 설정
│   │   └── verifyToken.js # 토큰 검증
│   ├── passport/         # Passport 전략
│   │   ├── googleStrategy.js  # Google OAuth
│   │   ├── kakaoStrategy.js   # Kakao OAuth
│   │   ├── localStrategy.js   # 로컬 인증
│   │   └── naverStrategy.js   # Naver OAuth
│   ├── routes/           # 라우터
│   │   ├── auth.js       # 인증 라우트
│   │   ├── chatBot.js    # 챗봇 라우트
│   │   ├── index.js      # 메인 라우트
│   │   ├── post.js       # 게시글 라우트
│   │   ├── room.js       # 채팅방 라우트
│   │   └── user.js       # 사용자 라우트
│   └── utils/            # 유틸리티 함수
│       ├── chatGPT.js    # ChatGPT API 호출
│       ├── dateFormat.js # 날짜 포맷팅
│       ├── emailSender.js # 이메일 전송
│       ├── encrypt.js    # 암호화 유틸
│       └── socket.js     # Socket.io 설정
├── public/               # 정적 파일
│   ├── css/             # 스타일시트
│   └── img/             # 이미지 파일
├── views/               # 템플릿 파일
│   ├── main.html        # 메인 페이지
│   ├── login.html       # 로그인 페이지
│   ├── chat.html        # 채팅 페이지
│   ├── chat-bot.html    # 챗봇 페이지
│   └── ...              # 기타 페이지
└── uploads/            # 업로드된 파일
    ├── posts/           # 게시글 이미지
    ├── profiles/        # 프로필 이미지
    └── chats/           # 채팅 이미지
```

## 🚀 시작하기

### 필수 요구사항

- Node.js (v14.0.0 이상)
- MySQL 또는 MariaDB
- npm 또는 yarn

### 설치 방법

1. **저장소 클론**
```bash
git clone https://github.com/docodocod/PIG-DIARY.git
cd PIG-DIARY
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# 서버 설정
SERVER_PORT=5000
NODE_ENV=development

# 데이터베이스 설정
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# 세션 설정
COOKIE_SECRET=your_cookie_secret_key

# OAuth 설정
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
KAKAO_CLIENT_ID=your_kakao_client_id
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Kakao Map API
KAKAO_MAP_API_KEY=your_kakao_map_api_key
```

4. **데이터베이스 생성**

MySQL/MariaDB에서 데이터베이스를 생성하세요:

```sql
CREATE DATABASE pig_diary CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

5. **애플리케이션 실행**

개발 모드:
```bash
npm run dev
```

프로덕션 모드:
```bash
npm start
```

서버가 실행되면 브라우저에서 `http://localhost:5000`으로 접속하세요.

## 📝 사용 방법

### 회원가입 및 로그인
1. 메인 페이지에서 로그인 버튼 클릭
2. 소셜 로그인(Google, Kakao, Naver) 또는 이메일 회원가입 선택
3. 프로필 정보 입력 및 프로필 이미지 업로드

### 일기 작성
1. 메인 페이지에서 "일기 작성" 버튼 클릭
2. 제목과 내용 입력
3. 이미지 업로드 (여러 장 가능)
4. 해시태그 추가 (#태그명 형식)
5. 게시 버튼 클릭

### 채팅하기
1. "채팅 목록" 메뉴 클릭
2. 새 채팅방 생성 또는 기존 채팅방 입장
3. 실시간으로 메시지 주고받기
4. 이미지 전송 가능

### AI 챗봇 사용
1. "AI 챗봇" 메뉴 클릭
2. 질문이나 대화 입력
3. ChatGPT가 응답 생성

### 맛집 검색
1. "맛집 검색" 메뉴 클릭
2. 원하는 지역 또는 음식 종류 입력
3. 지도에서 위치 확인
4. 즐겨찾기 추가 가능

## 🔧 개발

### 스크립트

- `npm run dev` - 개발 모드 실행 (nodemon)
- `npm start` - 프로덕션 모드 실행 (PM2)
- `npm test` - 테스트 실행

### 코드 스타일

- Express.js 컨벤션 준수
- MVC 패턴 적용
- RESTful API 설계 원칙 준수
