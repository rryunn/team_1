# 📒 가계부 프로젝트
Vue.js와 Pinia를 활용한 가계부 웹 애플리케이션

## 🧭 프로젝트 소개
이 프로젝트는 사용자가 월별 수입과 지출을 기록하고, 카테고리별로 거래 내역을 분석하며, 전체 재무 상태를 시각적으로 확인할 수 있도록 돕는 가계부 웹 애플리케이션입니다. 

## 🛠️ 기술 스택
프레임워크: Vue 3 (Composition API)

상태 관리: Pinia

라우팅: Vue Router

HTTP 클라이언트: Axios

개발 서버: Vite

스타일링: CSS (Scoped)

가상 백엔드: JSON Server

## ⚙️ 주요 기능
### 📊 대시보드 (Dashboard)
- 사용자 프로필 표시
  
- 선택한 월에 따라 총 수입, 지출, 순수익 데이터를 갱신
  
- 최근 거래 내역 표시

### 🧾 전체 거래 내역 (TotalTransaction)
- 거래 내역을 일별, 카테고리별 조회 가능
  
- 페이지네이션으로 나눠서 표시  

- 날짜 필터링으로 연도별, 월별, 일별로 조회 가능

### ✍️ 거래 등록 및 수정
- 거래 정보 등록 

- 거래의 상세 정보를 조회하고, 폼 입력값을 수정 및 삭제 가능

### 👤 사용자 프로필
- 사용자의 이름, 이메일 확인 및 수정 가능

### 🚫 404 페이지
- 존재하지 않는 경로로 접근 시 404 에러 페이지 표시



## 🚀 프로젝트 실행 방법
### 1. 레포지토리 클론

```
git clone https://github.com/rryunn/team_1.git
cd team_1
```
### 2. 패키지 설치

```
npm install
```
### 3. JSON Server 실행

```
npx json-server --watch db.json --port 3000
```
### 4. 개발 서버 실행

```
npm run dev
```
## 📁 프로젝트 구조
```
team_1/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── stores/
│   ├── utils/
│   ├── App.vue
│   └── main.js
├── db.json
├── package.json
└── vite.config.js
```
