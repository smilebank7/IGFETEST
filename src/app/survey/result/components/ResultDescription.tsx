import { ResultType } from "@/questions/questions"
import { Card, CardContent } from "@/components/ui/card"

interface ResultDescriptionProps {
  type: ResultType
}

export function ResultDescription({ type }: ResultDescriptionProps) {
  const description = getTypeDescription(type)

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">{description.title}</h3>
        <p className="text-gray-600 mb-4">{description.summary}</p>
        <div className="space-y-2">
          <h4 className="font-medium">주요 특징:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {description.traits.map((trait, index) => (
              <li key={index}>{trait}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

function getTypeDescription(type: ResultType) {
  const descriptions = {
    ChillGuy: {
      title: "여유로운 긍정러 (Chill Guy)",
      summary: "무난하고 긍정적인 태도로 팀의 분위기 메이커 역할을 합니다.",
      traits: [
        "꼭 필요한 것에만 집중하는 실용주의적 성향",
        "갈등 상황에서 중립적 입장 유지",
        "유연한 태도로 팀 분위기를 부드럽게 만듦"
      ]
    },
    MeticulousReviewer: {
      title: "깐깐한 리뷰어 (Meticulous Reviewer)",
      summary: "높은 기준과 꼼꼼한 리뷰로 코드 품질을 높이는 파수꾼입니다.",
      traits: [
        "코드 컨벤션과 품질에 대한 높은 기준 보유",
        "세세한 부분까지 놓치지 않는 꼼꼼함",
        "체계적인 코드 리뷰 진행"
      ]
    },
    BugHunter: {
      title: "버그 헌터 (Bug Hunter)",
      summary: "품질과 안정성을 최우선으로 생각하는 버그 사냥꾼입니다.",
      traits: [
        "사소한 버그도 놓치지 않는 날카로운 통찰력",
        "품질을 위해서라면 시간을 더 투자하는 성향",
        "테스트와 디버깅에 강점"
      ]
    },
    CommunicationOverloader: {
      title: "소통 폭주기관차 (Communication Overloader)",
      summary: "활발한 소통으로 팀의 협업을 이끄는 적극적인 소통가입니다.",
      traits: [
        "빠른 피드백과 활발한 의견 교환",
        "회의와 토론을 주도적으로 이끔",
        "팀 내 정보 공유를 활성화"
      ]
    },
    SprintWarrior: {
      title: "스프린트 전사 (Sprint Warrior)",
      summary: "빠른 개발과 일정 준수를 중시하는 속도 중심 개발자입니다.",
      traits: [
        "데드라인 준수를 최우선으로 생각",
        "빠른 의사결정과 실행력",
        "효율적인 시간 관리"
      ]
    },
    TeamBuffer: {
      title: "팀워크 버퍼 (Team Buffer)",
      summary: "팀의 화합과 시너지를 만드는 협업의 윤활유 역할을 합니다.",
      traits: [
        "갈등 해결과 중재에 탁월",
        "팀원들의 의견을 경청하고 조율",
        "팀 문화 형성에 긍정적 영향"
      ]
    },
    SilentArtisan: {
      title: "고독한 장인 (Silent Artisan)",
      summary: "묵묵히 자신의 일을 완성도 있게 해내는 장인 정신의 소유자입니다.",
      traits: [
        "높은 품질의 결과물 추구",
        "독립적인 작업 선호",
        "깊이 있는 기술적 고민"
      ]
    }
  }
  
  return descriptions[type]
} 