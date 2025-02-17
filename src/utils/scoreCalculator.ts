import { Answer, Dimension, ResultType } from '../types/survey'

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

  // 디버깅을 위한 로그 추가
  console.log('Calculated scores:', scores);

  return scores
}

export const determineResultType = (scores: Record<Dimension, number>): ResultType => {
  // Chill Guy 특별 판별 로직
  const isChillGuy = 
    scores.Strictness < 12 && 
    scores.TeamFocus < 15 && 
    scores.Communication < 15 && 
    scores.QualityFocus < 15 && 
    scores.DeadlineFocus < 15

  if (isChillGuy) {
    return "ChillGuy"
  }

  // 최고점 차원 찾기
  const maxScore = Math.max(...Object.values(scores));
  const dominantDimensions = Object.entries(scores)
    .filter(([, score]) => score === maxScore)
    .map(([dimension]) => dimension as Dimension);

  // 단일 최고점 기준 매핑
  const typeMap: Record<Dimension, ResultType> = {
    Communication: "CommunicationOverloader",
    Strictness: "MeticulousReviewer",
    QualityFocus: "BugHunter",
    DeadlineFocus: "SprintWarrior",
    TeamFocus: "TeamBuffer"
  };

  return typeMap[dominantDimensions[0]] || "ChillGuy";
} 