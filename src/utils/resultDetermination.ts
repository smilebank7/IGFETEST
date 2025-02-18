import { Dimension, ResultType } from '../types/survey'

export const determineResultType = (scores: Record<Dimension, number>): ResultType => {
  // Silent Artisan 로직
  if (isSilentArtisan(scores)) {
    return ResultType.SilentArtisan
  }

  // Chill Guy 로직
  if (isChillGuy(scores)) {
    return ResultType.ChillGuy
  }

  // 최고점이 너무 낮으면 ChillGuy
  const maxScore = Math.max(...Object.values(scores))
  if (maxScore < 13) {  
    return ResultType.ChillGuy
  }

  // 동점자 처리 로직
  const dominantDimensions = Object.entries(scores)
    .filter(([, score]) => score === maxScore)
    .map(([dimension]) => dimension as Dimension)

  if (dominantDimensions.length > 1) {
    if (dominantDimensions.includes('Strictness') && scores.QualityFocus > 12) {
      return ResultType.MeticulousReviewer
    }
    if (dominantDimensions.includes('QualityFocus') && scores.Strictness > 12) {
      return ResultType.BugHunter
    }
    if (dominantDimensions.includes('Communication') && scores.TeamFocus > 12) {
      return ResultType.CommunicationOverloader
    }
    if (dominantDimensions.includes('DeadlineFocus') && scores.QualityFocus > 12) {
      return ResultType.SprintWarrior
    }
    if (dominantDimensions.includes('TeamFocus') && scores.Communication > 17) {
      return ResultType.TeamBuffer
    }
  }

  // 단일 최고점에 대한 검증
  if (dominantDimensions.length === 1) {
    const primaryDimension = dominantDimensions[0]
    const score = scores[primaryDimension]
    
    const thresholds: Record<Dimension, number> = {
      TeamFocus: 18,  
      Communication: 13, 
      Strictness: 13,   
      QualityFocus: 13, 
      DeadlineFocus: 13
    }
    
    if (score >= thresholds[primaryDimension]) {
      const typeMap: Record<Dimension, ResultType> = {
        Communication: ResultType.CommunicationOverloader,
        Strictness: ResultType.MeticulousReviewer,
        QualityFocus: ResultType.BugHunter,
        DeadlineFocus: ResultType.SprintWarrior,
        TeamFocus: ResultType.TeamBuffer
      }
      return typeMap[primaryDimension]
    }
  }

  return ResultType.ChillGuy
}

const isChillGuy = (scores: Record<Dimension, number>): boolean => {
  return (
    scores.Strictness < 12 && 
    scores.TeamFocus < 15 && 
    scores.Communication < 15 && 
    scores.QualityFocus < 15 && 
    scores.DeadlineFocus < 15
  )
}

const isSilentArtisan = (scores: Record<Dimension, number>): boolean => {
  return (
    scores.QualityFocus > 18 &&
    scores.Communication < 12 &&
    scores.TeamFocus < 12
  )
}