import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PrivacyConsentProps {
  onConsent: () => void
  show: boolean
}

export function PrivacyConsent({ onConsent, show }: PrivacyConsentProps) {
  if (!show) return null

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <div className="text-sm text-gray-600">
          <h3 className="font-medium text-lg mb-3">개인정보 수집 및 이용 동의</h3>
          <p className="mb-3">다음의 개인정보 항목이 수집 및 이용됩니다:</p>
          <ul className="list-disc pl-5 mb-3 space-y-1">
            <li>팀 이름</li>
            <li>사용자 이름</li>
            <li>설문 응답 내용</li>
          </ul>
          <div className="bg-gray-50 p-3 rounded-md mb-3">
            <p className="font-medium mb-2">수집 목적</p>
            <p>개발자 협업 스타일 분석 및 팀 성향 파악</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="font-medium mb-2">보관 기간</p>
            <p>설문기간 종료 후 즉시 폐기</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4">
        <Button 
          className="w-full" 
          onClick={onConsent}
          size="lg"
        >
          동의하고 계속하기
        </Button>
      </CardFooter>
    </Card>
  )
} 