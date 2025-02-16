"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SurveyEntryPage() {
  const router = useRouter()
  const [teamName, setTeamName] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleStartSurvey = () => {
    if (!teamName.trim() || !name.trim()) {
      setError("팀 이름과 본인 이름을 모두 입력해주세요.")
      return
    }

    // localStorage에 사용자 정보 저장
    localStorage.setItem(
      "surveyUser",
      JSON.stringify({
        teamName,
        name,
        startTime: new Date().toISOString(),
      })
    )

    // 첫 번째 설문 단계로 이동
    router.push("/survey/1")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">설문조사</CardTitle>
          <CardDescription className="text-center">
            이 설문조사에 참여해 주셔서 감사합니다. 시작하기 전에 아래 정보를 입력해 주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <div className="space-y-2">
            <Label htmlFor="teamName">팀 이름</Label>
            <Input
              id="teamName"
              placeholder="팀 이름을 입력하세요"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">본인 이름</Label>
            <Input 
              id="name" 
              placeholder="이름을 입력하세요" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleStartSurvey}>
            설문 시작하기
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

