"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TeamAverageChart } from "./components/TeamAverageChart"
import { TeamTotalChart } from "./components/TeamTotalChart"
import { TeamDeviationChart } from "./components/TeamDeviationChart"
import { PersonalityDistributionChart } from "./components/PersonalityDistributionChart"
import { TeamCollaborationChart } from "./components/TeamCollaborationChart"
import { QualitySpeedBalanceChart } from "./components/QualitySpeedBalanceChart"
import { SurveyResponse } from '@/models/SurveyResponse'

type ChartType = 
  | "teamAverage" 
  | "teamTotal" 
  | "teamDeviation"
  | "personalityDistribution"
  | "teamCollaboration"
  | "qualitySpeedBalance"

export default function AdminPage() {
  const [responses, setResponses] = useState<SurveyResponse[]>([])
  const [selectedChart, setSelectedChart] = useState<ChartType>("teamAverage")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/survey/response')
        const data = await res.json()
        setResponses(data.data)
      } catch (error) {
        console.error('Failed to fetch survey responses:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const renderChart = () => {
    switch(selectedChart) {
      case "teamAverage":
        return <TeamAverageChart responses={responses} />
      case "teamTotal":
        return <TeamTotalChart responses={responses} />
      case "teamDeviation":
        return <TeamDeviationChart responses={responses} />
      case "personalityDistribution":
        return <PersonalityDistributionChart responses={responses} />
      case "teamCollaboration":
        return <TeamCollaborationChart responses={responses} />
      case "qualitySpeedBalance":
        return <QualitySpeedBalanceChart responses={responses} />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-600">관리자 페이지 로딩 중...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-[1200px] mx-auto">
        <CardHeader className="space-y-4">
          <CardTitle>설문 결과 통계</CardTitle>
          <Select
            value={selectedChart}
            onValueChange={(value: ChartType) => setSelectedChart(value)}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="차트 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="teamAverage">팀별 평균 점수</SelectItem>
              <SelectItem value="teamTotal">팀별 총점</SelectItem>
              <SelectItem value="teamDeviation">팀별 표준편차</SelectItem>
              <SelectItem value="personalityDistribution">개발자 성향 분포</SelectItem>
              <SelectItem value="teamCollaboration">팀 협업 지표</SelectItem>
              <SelectItem value="qualitySpeedBalance">품질/속도 균형</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative w-full" style={{ paddingTop: '50%' }}>
            <div className="absolute top-0 left-0 w-full h-full">
              {renderChart()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
