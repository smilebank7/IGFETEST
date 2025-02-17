"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DimensionChart } from "./components/DimensionChart"
import { ResultDescription } from "./components/ResultDescription"
import { calculateDimensionScores, determineResultType } from "@/utils/scoreCalculator"
import { ResultType, ResultTypeDisplay } from "@/types/survey"
import { useAtom } from 'jotai'
import { surveyStateAtom } from '@/store/survey'
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
  const [, setShowWarning] = useState(false)
  const [, setWarningMessage] = useState("")

  useEffect(() => {
    const saveResponseToDB = async (result: SurveyResult) => {
      try {
        const response = {
          teamName: surveyState.user?.teamName,
          userName: surveyState.user?.name,
          answers: surveyState.answers,
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
        
        console.log('Response saved successfully');
      } catch (error) {
        console.error('Error saving response:', error);
      }
    };

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
      
      const result = {
        type,
        dimensionScores,
        surveyUser: surveyState.user
      }

      setResult(result)
      saveResponseToDB(result)
    } catch (error) {
      console.error("Error calculating result:", error)
      setWarningMessage("결과 계산 중 오류가 발생했습니다.")
      setShowWarning(true)
    }
  }, [surveyState, router])

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