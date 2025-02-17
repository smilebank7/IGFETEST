"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { questions, Answer } from "@/questions/questions"
import { QuestionCard } from "./components/QuestionCard"
import { WarningModal } from "./components/WarningModal"

interface SurveyUser {
  teamName: string
  name: string
  startTime: string
}

export default function SurveyPage() {
  const router = useRouter()
  const { step } = useParams() as { step: string }
  const currentStep = parseInt(step) - 1
  
  const [answers, setAnswers] = useState<Record<number, Answer>>({})
  const [surveyUser, setSurveyUser] = useState<SurveyUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    const savedAnswers = sessionStorage.getItem("surveyAnswers")
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    }
  }, [])

  useEffect(() => {
    if (currentStep < 0 || currentStep >= questions.length) {
      router.push("/survey/1")
    }
  }, [currentStep, router])

  useEffect(() => {
    try {
      const savedUser = sessionStorage.getItem("surveyUser")
      if (!savedUser) {
        router.push("/")
        return
      }
      const parsedUser = JSON.parse(savedUser)
      setSurveyUser(parsedUser)
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
    sessionStorage.setItem("surveyAnswers", JSON.stringify(newAnswers))
  }

  const handleNavigation = () => {
    if (!answers[currentQuestion.id]) {
      setShowWarning(true)
      return
    }

    if (isLastQuestion) {
      router.push("/survey/result")
    } else {
      router.push(`/survey/${currentStep + 2}`)
    }
  }

  const handlePrevious = () => {
    router.push(`/survey/${currentStep}`)
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
        onPrevious={handlePrevious}
        isLastQuestion={isLastQuestion}
        isFirstQuestion={currentStep === 0}
      />
      <WarningModal 
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        message="질문에 답변해 주세요."
      />
    </div>
  )
}

