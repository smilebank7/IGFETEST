import { ResultType } from "@/questions/questions"
import { Card, CardContent } from "@/components/ui/card"

interface ResultDescriptionProps {
  type: ResultType
}

interface TypeDescription {
  title: string;
  summary: string;
  traits: string[];
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

function getTypeDescription(type: ResultType): TypeDescription {
  const descriptions: Record<ResultType, TypeDescription> = {
    ChillGuy: {
      title: "Chill Guy",
      summary: "무난하고 긍정적인 태도로 팀을 관망합니다.",
      traits: [
        "꼭 필요한 것에만 집중하는 실용주의적 성향",
        "갈등 상황에서 중립적 입장 유지",
        "유연한 태도로 관망"
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
      traits: ["버그 발견에 탁월", "품질 중심적 사고", "꼼꼼한 테스트"]
    },
    CommunicationOverloader: {
      title: "소통 폭주기관차 (Communication Overloader)",
      summary: "활발한 소통으로 팀을 이끄는 적극적인 소통가입니다.",
      traits: ["활발한 의사소통", "적극적인 피드백", "팀 분위기 메이커"]
    },
    SprintWarrior: {
      title: "스프린트 전사 (Sprint Warrior)",
      summary: "빠른 개발 속도와 효율성을 추구하는 개발자입니다.",
      traits: ["빠른 개발 속도", "데드라인 준수", "효율적인 작업방식"]
    },
    TeamBuffer: {
      title: "팀워크 버퍼 (Team Buffer)",
      summary: "팀의 조화를 중시하는 협업 전문가입니다.",
      traits: ["원활한 팀워크", "갈등 중재", "협력적인 태도"]
    },
    SilentArtisan: {
      title: "고독한 장인 (Silent Artisan)",
      summary: "묵묵히 자신의 일을 완성도 있게 해내는 장인입니다.",
      traits: ["높은 집중력", "독립적인 작업방식", "완성도 추구"]
    }
  };
  
  return descriptions[type];
} 