"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { questions, Answer } from "@/questions/questions"
import { QuestionCard } from "./components/QuestionCard"

interface SurveyUser {
  teamName: string
  name: string
  startTime: string
}

export default function SurveyPage() {
  const router = useRouter()
  const { step } = useParams() as { step: string }
  const currentStep = parseInt(step) - 1
  
  const [answers, setAnswers] = useState<Record<number, Answer>>(() => {
    if (typeof window === "undefined") return {}
    const savedAnswers = localStorage.getItem("surveyAnswers")
    return savedAnswers ? JSON.parse(savedAnswers) : {}
  })
  const [surveyUser, setSurveyUser] = useState<SurveyUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 유효하지 않은 step으로 접근시 첫 페이지로 리다이렉트
  useEffect(() => {
    if (currentStep < 0 || currentStep >= questions.length) {
      router.push("/survey/1")
    }
  }, [currentStep, router])

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("surveyUser")
      if (!savedUser) {
        router.push("/")
        return
      }
      setSurveyUser(JSON.parse(savedUser))
    } catch (error) {
      console.error("Error loading user data:", error)
      router.push("/")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const currentQuestion = questions[currentStep]
  const isLastQuestion = currentStep === questions.length - 1

  const handleAnswerChange = (value: Answer) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(newAnswers)
    localStorage.setItem("surveyAnswers", JSON.stringify(newAnswers))
  }

  const handleNavigation = () => {
    if (!answers[currentQuestion.id]) {
      alert("질문에 답변해 주세요.")
      return
    }

    if (isLastQuestion) {
      localStorage.removeItem("surveyAnswers") // 설문 완료 시 임시 저장 데이터 삭제
      router.push("/survey/result")
    } else {
      router.push(`/survey/${currentStep + 2}`)
    }
  }

  if (isLoading) return <div>로딩 중...</div>
  if (!surveyUser) return null
  if (!currentQuestion) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <QuestionCard
        currentStep={currentStep}
        totalSteps={questions.length}
        question={currentQuestion}
        answer={answers[currentQuestion.id]}
        onAnswerChange={handleAnswerChange}
        onNavigate={handleNavigation}
        isLastQuestion={isLastQuestion}
      />
    </div>
  )
}

