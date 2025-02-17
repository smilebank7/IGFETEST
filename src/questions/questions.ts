import { Question } from '../types/survey'

// 설문 질문 타입 정의
export type QuestionType = "choice" | "score" | "multiChoice"

// 차원(Dimension) 정의
export type Dimension = "Communication" | "Strictness" | "QualityFocus" | "DeadlineFocus" | "TeamFocus"

// 결과 유형 정의
export type ResultType = 
  | "ChillGuy"
  | "MeticulousReviewer" 
  | "BugHunter"
  | "CommunicationOverloader"
  | "SprintWarrior"
  | "TeamBuffer"
  | "SilentArtisan"

// 샘플 질문 데이터
export const questions: Question[] = [
  {
    id: 1,
    type: "choice",
    text: "코드 리뷰 시, 사소한 부분까지도 꼼꼼히 확인하는 편인가요?",
    options: [
      { text: "중요 로직만 확인, 나머지는 신경 안 씀", score: 1 },
      { text: "큰 문제 없으면 넘어가는 편", score: 2 },
      { text: "필요하면 세부사항도 확인 (보통 수준)", score: 3 },
      { text: "꽤 꼼꼼하게 확인", score: 4 },
      { text: "주석·네이밍까지 절대 놓치지 않는 깐깐함", score: 5 }
    ],
    multipleAllowed: false
  },
  {
    id: 2,
    type: "choice",
    text: "Slack, Teams 등 메신저 알림에 얼마나 빠르게 반응하나요?",
    options: [
      { text: "필요하면 하루 뒤에라도 답장 (느긋)", score: 1 },
      { text: "종종 놓칠 때가 많다", score: 2 },
      { text: "평균 정도", score: 3 },
      { text: "한두 시간 내에는 꼭 답변", score: 4 },
      { text: "거의 실시간 대응, 핸드폰도 알림 ON", score: 5 }
    ],
    multipleAllowed: false
  },
  {
    id: 3,
    type: "score",
    text: "새로운 라이브러리나 기술을 도입할 때, 팀원 의견을 우선 고려하는 편인가요?"
  },
  {
    id: 4,
    type: "multiChoice",
    text: "협업 시, 가장 중요하다고 생각하는 요소를 모두 고르세요. (복수 선택 가능)",
    options: [
      { text: "빠른 의사결정", score: 1 },
      { text: "자율성 보장", score: 2 },
      { text: "코드 품질(충분한 리뷰, 테스트)", score: 3 },
      { text: "문서화 & 일정 관리(Jira 등)", score: 4 },
      { text: "팀원 간 긴밀한 소통/공감", score: 5 }
    ],
    multipleAllowed: true
  },
  {
    id: 5,
    type: "choice",
    text: "긴급한 버그가 발생하면, 원인분석보다 즉시 핫픽스에 집중하는 편인가요?",
    options: [
      { text: "바로 해결이 최우선(분석은 뒷순위)", score: 1 },
      { text: "급하면 임시방편이라도 써야 한다", score: 2 },
      { text: "상황에 따라 다르다 (중립)", score: 3 },
      { text: "가급적 원인을 확인한 뒤 고치는 편", score: 4 },
      { text: "원인 미파악 상태로는 절대 릴리스 불가", score: 5 }
    ],
    multipleAllowed: false
  },
  {
    id: 6,
    type: "score",
    text: "데드라인(마감 기한)을 어느 정도로 중요하게 여기나요?"
  },
  {
    id: 7,
    type: "multiChoice",
    text: "코드 리뷰 시, 주로 지적하거나 확인하는 항목을 모두 골라주세요.",
    options: [
      { text: "간단한 컨벤션(세미콜론, 띄어쓰기 등)", score: 1 },
      { text: "네이밍/주석 등 가독성 이슈", score: 2 },
      { text: "성능 최적화(로직 효율)", score: 3 },
      { text: "테스트 커버리지", score: 4 },
      { text: "UI/UX 혹은 실제 사용자 사용성", score: 5 }
    ],
    multipleAllowed: true
  },
  {
    id: 8,
    type: "choice",
    text: "팀 미팅(데일리·위클리) 때, 본인이 직접 발언하는 빈도는?",
    options: [
      { text: "듣기 위주", score: 1 },
      { text: "가끔 필요한 말만", score: 2 },
      { text: "보통 수준", score: 3 },
      { text: "의견 제시를 자주 하는 편", score: 4 },
      { text: "내가 주도해서 회의를 진행하는 경우도 많다", score: 5 }
    ],
    multipleAllowed: false
  },
  {
    id: 9,
    type: "score",
    text: "팀원들과 페어 프로그래밍(혹은 모브 프로그래밍)을 하는 것을 얼마나 선호하나요?"
  },
  {
    id: 10,
    type: "choice",
    text: "프로젝트 진행 시, 품질 vs 일정 중 더 우선시하는 쪽은?",
    options: [
      { text: "일정이 우선, 기한 맞추는 게 중요", score: 1 },
      { text: "약간 일정 쪽 선호", score: 2 },
      { text: "상황에 따라 균형", score: 3 },
      { text: "약간 품질 쪽 우선", score: 4 },
      { text: "품질을 위해 일정이 늦어져도 괜찮다", score: 5 }
    ],
    multipleAllowed: false
  },
  {
    id: 11,
    type: "choice",
    text: "다른 팀원의 의견에 얼마나 영향을 많이 받나요?",
    options: [
      { text: "내 입장을 고수하는 편", score: 1 },
      { text: "웬만해선 내 의견에 확신이 크다", score: 2 },
      { text: "필요하면 조율하나, 적당한 수준", score: 3 },
      { text: "상대방 근거가 타당하면 적극 수용", score: 4 },
      { text: "팀 의견을 가장 우선적으로 반영", score: 5 }
    ],
    multipleAllowed: false
  },
  {
    id: 12,
    type: "choice",
    text: "협업 트러블 발생 시, 갈등 해소를 위해 노력하는 편인가요?",
    options: [
      { text: "갈등은 어쩔 수 없다고 생각, 각자 해결", score: 1 },
      { text: "크게 신경 안 쓰거나 무시", score: 2 },
      { text: "어느 정도 중재 시도", score: 3 },
      { text: "적극적으로 조율·소통해 해결", score: 4 },
      { text: "갈등 해결에 최우선 집중, 내가 직접 나서서 화해시킴", score: 5 }
    ],
    multipleAllowed: false
  }
]

export type Answer = string | string[] | number

// 차원별 점수 계산 함수 수정
export const calculateDimensionScores = (answers: Record<number, Answer>): Record<Dimension, number> => {
  const scores: Record<Dimension, number> = {
    Communication: 0,
    Strictness: 0,
    QualityFocus: 0,
    DeadlineFocus: 0,
    TeamFocus: 0
  }

  Object.entries(answers).forEach(([questionId, answer]) => {
    const qId = parseInt(questionId)
    const numericAnswer = Number(answer)
    
    switch(qId) {
      case 1: // 코드 리뷰 꼼꼼도
        scores.Strictness += numericAnswer * 1.5
        break
      case 2: // 메신저 응답
        scores.Communication += numericAnswer * 1.5
        break
      case 3: // 새 기술 도입 시 팀원 의견
        scores.TeamFocus += numericAnswer * 0.8
        scores.QualityFocus += numericAnswer * 0.3
        break
      case 4: // 협업 중요 요소 (다중선택)
        if (Array.isArray(answer)) {
          answer.forEach(choice => {
            const score = Number(choice)
            if (score === 1) scores.DeadlineFocus += 1.5
            if (score === 2) scores.TeamFocus += 1
            if (score === 3) scores.QualityFocus += 1.5
            if (score === 4) scores.DeadlineFocus += 1
            if (score === 5) scores.TeamFocus += 1.5
          })
        }
        break
      case 5: // 버그 대응
        scores.QualityFocus += numericAnswer * 1.5
        if (numericAnswer <= 2) scores.DeadlineFocus += 1.5
        break
      case 6: // 데드라인
        scores.DeadlineFocus += numericAnswer * 0.8
        break
      case 7: // 코드 리뷰 항목 (다중선택)
        if (Array.isArray(answer)) {
          answer.forEach(choice => {
            const score = Number(choice)
            if (score <= 2) scores.Strictness += 0.8
            if (score >= 3) scores.QualityFocus += 0.8
          })
        }
        break
      case 8: // 미팅 발언
        scores.Communication += numericAnswer * 1.5
        break
      case 9: // 페어 프로그래밍
        scores.Communication += numericAnswer * 0.8
        scores.TeamFocus += numericAnswer * 0.8
        break
      case 10: // 품질 vs 일정
        scores.QualityFocus += numericAnswer * 1.5
        scores.DeadlineFocus += (6 - numericAnswer) * 1.5
        break
      case 11: // 의견 수용도
        scores.TeamFocus += numericAnswer * 1.5
        break
      case 12: // 갈등 해소
        scores.TeamFocus += numericAnswer * 1.5
        scores.Communication += numericAnswer * 0.8
        break
    }
  })

  return scores
}

// 결과 타입 결정 함수 수정
export const determineResultType = (scores: Record<Dimension, number>): ResultType => {
  // Chill Guy 특별 판별 로직 - 임계값 조정
  const isChillGuy = 
    scores.Strictness < 12 && 
    scores.TeamFocus < 15 && 
    scores.Communication < 15 && 
    scores.QualityFocus < 15 && 
    scores.DeadlineFocus < 15;

  if (isChillGuy) {
    return "ChillGuy";
  }

  // Silent Artisan 특별 판별 로직 - 임계값 조정
  const isSilentArtisan = 
    scores.QualityFocus > 20 && 
    scores.Communication < 12;

  if (isSilentArtisan) {
    return "SilentArtisan";
  }

  // 나머지 유형은 가장 높은 점수를 기준으로 결정
  const maxScore = Math.max(...Object.values(scores));
  
  // 최고점이 너무 낮으면 ChillGuy로 분류
  if (maxScore < 15) {
    return "ChillGuy";
  }

  const dominantDimensions = Object.entries(scores)
    .filter(([, score]) => score === maxScore)
    .map(([dimension]) => dimension as Dimension);

  // 동점인 경우 우선순위 결정 - 임계값 조정
  if (dominantDimensions.length > 1) {
    if (dominantDimensions.includes("Strictness") && scores.QualityFocus > 15) {
      return "MeticulousReviewer";
    }
    if (dominantDimensions.includes("QualityFocus") && scores.Strictness > 15) {
      return "BugHunter";
    }
    if (dominantDimensions.includes("TeamFocus") && scores.TeamFocus > 15) {
      return "TeamBuffer";
    }
  }

  // 단일 최고점 기준 매핑
  const typeMap: Record<Dimension, ResultType> = {
    Communication: "CommunicationOverloader",
    Strictness: "MeticulousReviewer",
    QualityFocus: "BugHunter",
    DeadlineFocus: "SprintWarrior",
    TeamFocus: "TeamBuffer"
  };

  return typeMap[dominantDimensions[0]];
};
