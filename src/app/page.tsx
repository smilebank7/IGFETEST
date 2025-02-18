"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SurveySkeleton } from "./components/SurveySkeleton"
import { PrivacyConsent } from "./components/PrivacyConsent"

export default function SurveyEntryPage() {
  const router = useRouter()
  const [teamName, setTeamName] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [hasConsented, setHasConsented] = useState<boolean | null>(null)

  useEffect(() => {
    const consented = sessionStorage.getItem("privacyConsented") === "true"
    setHasConsented(consented)
    setIsLoading(false)
  }, [])

  const handlePrivacyConsent = useCallback(() => {
    sessionStorage.setItem("privacyConsented", "true")
    setHasConsented(true)
  }, [])

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

    if (!hasConsented) {
      setError("개인정보 수집 및 이용에 동의해주세요.")
      return
    }

    setIsLoading(true)
    sessionStorage.setItem(
      "surveyUser",
      JSON.stringify({
        teamName,
        name,
        startTime: new Date().toISOString(),
      })
    )

    router.push("/survey/1")
  }, [teamName, name, router, hasConsented])

  if (isLoading) return <SurveySkeleton />

  if (!hasConsented) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-2xl text-center">개발자 협업 스타일 설문</CardTitle>
              <CardDescription className="text-center">
                설문을 시작하기 전에 개인정보 수집에 동의해주세요.
              </CardDescription>
            </CardHeader>
          </Card>
          <PrivacyConsent 
            onConsent={handlePrivacyConsent}
            show={true}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">개발자 협업 스타일 설문</CardTitle>
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
            <Button 
              className="w-full" 
              onClick={handleStartSurvey}
            >
              시작하기
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

