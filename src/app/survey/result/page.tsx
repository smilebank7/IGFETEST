"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DimensionChart } from "./components/DimensionChart"
import { ResultDescription } from "./components/ResultDescription"
import { calculateDimensionScores, determineResultType } from "@/utils/scoreCalculator"
import type { ResultType } from "@/types/survey"
import { useAtom } from 'jotai'
import { surveyStateAtom } from '@/store/survey'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface SurveyResult {
  type: ResultType
  dimensionScores: Record<string, number>
  surveyUser: {
    name: string
  }
}

export default function ResultPage() {
  const router = useRouter()
  const [surveyState] = useAtom(surveyStateAtom)
  const [result, setResult] = useState<SurveyResult | null>(null)
  const [showWarning, setShowWarning] = useState(false)
  const [warningMessage, setWarningMessage] = useState("")

  useEffect(() => {
    try {
      if (!surveyState.user) {
        setWarningMessage("설문 참여자 정보가 없습니다.")
        setShowWarning(true)
        return
      }

      if (Object.keys(surveyState.answers).length === 0) {
        setWarningMessage("설문 응답 내역이 없습니다.")
        setShowWarning(true)
        return
      }

      const dimensionScores = calculateDimensionScores(surveyState.answers)
      const type = determineResultType(dimensionScores)
      
      setResult({
        type,
        dimensionScores,
        surveyUser: surveyState.user
      })
    } catch (error) {
      console.error("Error calculating result:", error)
      setWarningMessage("결과 계산 중 오류가 발생했습니다.")
      setShowWarning(true)
    }
  }, [surveyState, router])

  const handleWarningClose = () => {
    setShowWarning(false)
    router.push("/")
  }

  if (!result) return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg text-gray-600">결과를 계산중입니다...</p>
          </CardContent>
        </Card>
        <Dialog open={showWarning} onOpenChange={setShowWarning}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>안내</DialogTitle>
              <DialogDescription>{warningMessage}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleWarningClose}>
                처음으로 돌아가기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {result.surveyUser.name}님의 개발자 협업 스타일은
              <br />
              <span className="text-3xl font-bold text-blue-600 mt-2">
                {getResultType(result.type)}
              </span>
              입니다!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <ResultDescription type={result.type} />
            {Object.keys(result.dimensionScores).length > 0 && (
              <DimensionChart scores={result.dimensionScores} />
            )}
            <div className="flex justify-center mt-8">
              <Button 
                onClick={() => router.push("/")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                다시 검사하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function getResultType(type: ResultType): string {
  const typeMap = {
    ChillGuy: "Chill Guy",
    MeticulousReviewer: "깐깐한 리뷰어",
    BugHunter: "버그 헌터",
    CommunicationOverloader: "소통 폭주기관차",
    SprintWarrior: "스프린트 전사",
    TeamBuffer: "팀워크 버퍼",
    SilentArtisan: "고독한 장인"
  }
  return typeMap[type]
} 