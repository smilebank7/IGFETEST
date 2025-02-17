import { useState, useCallback } from 'react'
import { Answer, ResultType } from '../types/survey'
import { calculateDimensionScores, determineResultType } from '../utils/scoreCalculator'

export const usePersonalityTest = () => {
  const [answers, setAnswers] = useState<Record<number, Answer>>({})
  const [result, setResult] = useState<ResultType | null>(null)

  const submitAnswer = useCallback((questionId: number, answer: Answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }, [])

  const calculateResult = useCallback(() => {
    const scores = calculateDimensionScores(answers)
    const resultType = determineResultType(scores)
    setResult(resultType)
  }, [answers])

  return {
    answers,
    result,
    submitAnswer,
    calculateResult
  }
} 