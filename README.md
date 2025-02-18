# 개발자 협업 스타일 테스트

개발자들의 협업 성향을 분석하고 팀 구성원들의 특성을 파악할 수 있는 설문 기반 테스트 어플리케이션입니다.

## 주요 기능

- **개발자 성향 테스트**: 12개의 질문을 통해 개발자의 협업 스타일을 분석
- **다차원 분석**: 커뮤니케이션, 꼼꼼함, 품질중심, 일정중심, 팀워크 등 5가지 차원에서 평가
- **결과 시각화**: 레이더 차트를 통한 개인 성향 시각화
- **관리자 대시보드**: 팀별 통계 및 다양한 분석 차트 제공

## 기술 스택

- **Frontend**: Next.js App Router, TypeScript
- **UI Library**: shadcn/ui
- **Authentication**: NextAuth.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Styling**: Tailwind CSS

## 프로젝트 구조
```bash
src/
├── app/                    # App Router
│   ├── admin/             # 관리자 대시보드
│   ├── survey/            # 설문 페이지
│   └── api/               # API 라우트
├── components/ui/            # 공통 컴포넌트
├── types/                 # 타입 정의
├── utils/                 # 유틸리티 함수
├── questions/             # 질문 데이터
└── models/               # Mongoose 모델
```

## 주요 결과 유형

- **Chill Guy**: 무난하고 긍정적인 태도로 팀을 관망
- **Meticulous Reviewer**: 높은 기준과 꼼꼼한 리뷰로 코드 품질을 높이는 파수꾼
- **Bug Hunter**: 품질과 안정성을 최우선으로 생각하는 버그 사냥꾼
- **Communication Overloader**: 활발한 소통으로 팀을 이끄는 적극적인 소통가
- **Sprint Warrior**: 빠른 개발 속도와 효율성을 추구하는 개발자
- **Team Buffer**: 팀의 조화를 중시하는 협업 전문가
- **Silent Artisan**: 묵묵히 자신의 일을 완성도 있게 해내는 장인

## 관리자 대시보드
- "/admin" 경로로 접속
- 로그인 후 관리자 페이지로 이동
- **팀별 통계**: 각 팀의 설문 응답 통계
- **차트 시각화**: 레이더 차트, 히스토그램, 팀 비율 등

## 로컬 개발 환경 설정

1. MongoDB 설정

```bash
# Docker로 MongoDB 컨테이너 실행
docker-compose up -d mongodb

# MongoDB 컨테이너에 접속
docker exec -it mongodb mongosh

# 데이터베이스 생성 및 선택
use survey-db

# 테스트 관리자 계정 생성
db.admins.insertOne({
  id: "yourAdminUserName",
  password: "yourPassword",
})
```

2. 환경 변수 설정
```bash
cp .sampleenv .env
```

3. MongoDB 연결 문자열 설정
```bash
# .env 파일
MONGODB_URI=mongodb://admin:password@localhost:27017/survey-db
```

4. 의존성 설치
```bash
npm install (or any other package manager)
```

5. 개발 서버 실행
```bash
npm run dev (or any other package manager)
```
