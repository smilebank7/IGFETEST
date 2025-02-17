"use client"

import { useState, useCallback } from "react"
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

  const handleTeamNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value)
    setError("")
  }, [])

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setError("")
  }, [])

  const handleStartSurvey = useCallback(() => {
    if (!teamName.trim() || !name.trim()) {
      setError("팀 이름과 본인 이름을 모두 입력해주세요.")
      return
    }

    // sessionStorage에 사용자 정보 저장
    sessionStorage.setItem(
      "surveyUser",
      JSON.stringify({
        teamName,
        name,
        startTime: new Date().toISOString(),
      })
    )

    // 첫 번째 설문 단계로 이동
    router.push("/survey/1")
  }, [teamName, name, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">개발자 협업 스타일 테스트</CardTitle>
          <CardDescription className="text-center">
            팀 이름과 본인 이름을 입력해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="teamName">팀 이름</Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={handleTeamNameChange}
              placeholder="팀 이름을 입력하세요"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="이름을 입력하세요"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleStartSurvey}>
            시작하기
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

