import { Answer } from '../types/survey'

export const useSurveyStorage = () => {
  const saveAnswers = (answers: Record<number, Answer>) => {
    localStorage.setItem("surveyAnswers", JSON.stringify(answers))
  }

  const clearAnswers = () => {
    localStorage.removeItem("surveyAnswers")
  }

  const loadAnswers = (): Record<number, Answer> => {
    const saved = localStorage.getItem("surveyAnswers")
    return saved ? JSON.parse(saved) : {}
  }

  return {
    saveAnswers,
    clearAnswers,
    loadAnswers
  }
} 