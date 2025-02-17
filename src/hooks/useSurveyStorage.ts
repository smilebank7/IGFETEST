import { Answer } from '../types/survey'

export const useSurveyStorage = () => {
  const saveAnswers = (answers: Record<number, Answer>) => {
    sessionStorage.setItem("surveyAnswers", JSON.stringify(answers))
  }

  const clearAnswers = () => {
    sessionStorage.removeItem("surveyAnswers")
  }

  const loadAnswers = (): Record<number, Answer> => {
    const saved = sessionStorage.getItem("surveyAnswers")
    return saved ? JSON.parse(saved) : {}
  }

  return {
    saveAnswers,
    clearAnswers,
    loadAnswers
  }
} 