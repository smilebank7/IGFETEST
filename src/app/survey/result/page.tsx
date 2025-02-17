"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DimensionChart } from "./components/DimensionChart"
import { ResultDescription } from "./components/ResultDescription"
import { calculateDimensionScores, determineResultType } from "@/utils/scoreCalculator"
import { ResultType, ResultTypeDisplay } from "@/types/survey"
import { Button } from "@/components/ui/button"
import { WarningModal } from "../[step]/components/WarningModal"

interface SurveyResult {
  type: ResultType
  dimensionScores: Record<string, number>
  surveyUser: {
    name: string
    teamName: string
  }
}

export default function ResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<SurveyResult | null>(null)
  const [showWarning, setShowWarning] = useState(false)
  const [warningMessage, setWarningMessage] = useState("")

  useEffect(() => {
    const saveResponseToDB = async (result: SurveyResult) => {
      // 이미 저장되었는지 확인
      const isAlreadySaved = sessionStorage.getItem("surveyResponseSaved")
      if (isAlreadySaved === "true") {
        return
      }

      try {
        const response = {
          teamName: result.surveyUser.teamName,
          userName: result.surveyUser.name,
          answers: result.dimensionScores,
          dimensionScores: {
            communication: result.dimensionScores.Communication,
            strictness: result.dimensionScores.Strictness,
            qualityFocus: result.dimensionScores.QualityFocus,
            deadlineFocus: result.dimensionScores.DeadlineFocus,
            teamFocus: result.dimensionScores.TeamFocus,
          },
          resultType: result.type,
        };

        const res = await fetch('/api/survey/response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(response),
        });

        if (!res.ok) throw new Error('Failed to save response');
        
        // 저장 성공 시 플래그 설정
        sessionStorage.setItem("surveyResponseSaved", "true")
        console.log('Response saved successfully');
      } catch (error) {
        console.error('Error saving response:', error);
      }
    };

    try {
      const surveyUser = sessionStorage.getItem("surveyUser")
      const surveyAnswers = sessionStorage.getItem("surveyAnswers")

      if (!surveyUser || !surveyAnswers) {
        setWarningMessage("설문에 참여하지 않았습니다.")
        setShowWarning(true)
        return
      }

      const user = JSON.parse(surveyUser)
      const answers = JSON.parse(surveyAnswers)
      
      const dimensionScores = calculateDimensionScores(answers)
      const type = determineResultType(dimensionScores)
      
      const resultData = {
        type,
        dimensionScores,
        surveyUser: user
      }

      setResult(resultData)
      saveResponseToDB(resultData)
    } catch (error) {
      console.error("Error calculating result:", error)
      setWarningMessage("결과 계산 중 오류가 발생했습니다.")
      setShowWarning(true)
    }
  }, [router])

  const handleWarningClose = () => {
    setShowWarning(false)
    router.push("/")
  }

  if (showWarning) {
    return (
      <WarningModal
        isOpen={showWarning}
        onClose={handleWarningClose}
        message={warningMessage}
      />
    )
  }

  if (!result) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
  return ResultTypeDisplay[type] || type;
}