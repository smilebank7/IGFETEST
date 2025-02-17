import { useState, useCallback } from 'react'
import { Answer, ResultType } from '../types/survey'
import { calculateDimensionScores } from '../utils/scoreCalculator'
import { determineResultType } from '../utils/resultDetermination'
import { useSurveyStorage } from './useSurveyStorage'

export const usePersonalityTest = () => {
  const [answers, setAnswers] = useState<Record<number, Answer>>({})
  const [result, setResult] = useState<ResultType | null>(null)
  const { saveAnswers, clearAnswers } = useSurveyStorage()

  const submitAnswer = useCallback((questionId: number, answer: Answer) => {
    const newAnswers = {
      ...answers,
      [questionId]: answer
    }
    setAnswers(newAnswers)
    saveAnswers(newAnswers)
  }, [answers, saveAnswers])

  const calculateResult = useCallback(() => {
    const scores = calculateDimensionScores(answers)
    const resultType = determineResultType(scores)
    setResult(resultType)
    clearAnswers()
  }, [answers, clearAnswers])

  return {
    answers,
    result,
    submitAnswer,
    calculateResult
  }
} 