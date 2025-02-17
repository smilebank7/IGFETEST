import { Answer, Dimension, ResultType, IDimensionScores } from '../types/survey'
import { calculateScoreForQuestion } from './questionScoring'

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
    const questionScores = calculateScoreForQuestion(qId, answer)
    
    // 각 항목별 점수 누적
    Object.entries(questionScores).forEach(([dimension, score]) => {
      scores[dimension as Dimension] += score
    })
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
    return ResultType.ChillGuy
  }

  // 최고점 차원 찾기
  const maxScore = Math.max(...Object.values(scores));
  const dominantDimensions = Object.entries(scores)
    .filter(([, score]) => score === maxScore)
    .map(([dimension]) => dimension as Dimension);

  // 단일 최고점 기준 매핑
  const typeMap: Record<Dimension, ResultType> = {
    Communication: ResultType.CommunicationOverloader,
    Strictness: ResultType.MeticulousReviewer,
    QualityFocus: ResultType.BugHunter,
    DeadlineFocus: ResultType.SprintWarrior,
    TeamFocus: ResultType.TeamBuffer
  };

  return typeMap[dominantDimensions[0]] || ResultType.ChillGuy;
}

// MongoDB에 저장하기 위한 형식으로 변환하는 함수 추가
export const convertToMongoDBFormat = (scores: Record<Dimension, number>): IDimensionScores => {
  return {
    communication: scores.Communication,
    strictness: scores.Strictness,
    qualityFocus: scores.QualityFocus,
    deadlineFocus: scores.DeadlineFocus,
    teamFocus: scores.TeamFocus,
  };
}; 