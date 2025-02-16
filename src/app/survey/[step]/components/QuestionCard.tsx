import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Question, Answer } from "@/questions/questions"
import { ChoiceQuestion } from "./ChoiceQuestion"
import { ScoreQuestion } from "./ScoreQuestion"
import { MultiChoiceQuestion } from "./MultiChoiceQuestion"

interface QuestionCardProps {
  currentStep: number
  totalSteps: number
  question: Question
  answer: Answer
  onAnswerChange: (value: Answer) => void
  onNavigate: () => void
  isLastQuestion: boolean
}

export function QuestionCard({
  currentStep,
  totalSteps,
  question,
  answer,
  onAnswerChange,
  onNavigate,
  isLastQuestion
}: QuestionCardProps) {
  const renderQuestion = () => {
    switch (question.type) {
      case "choice":
        return (
          <ChoiceQuestion
            options={question.options || []}
            value={answer as string}
            onChange={(value) => onAnswerChange(value)}
          />
        )
      case "score":
        return (
          <ScoreQuestion
            value={answer as number}
            onChange={(value) => onAnswerChange(value)}
          />
        )
      case "multiChoice":
        return (
          <MultiChoiceQuestion
            options={question.options || []}
            value={answer as string[]}
            onChange={(value) => onAnswerChange(value)}
          />
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          질문 {currentStep + 1} / {totalSteps}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg">{question.text}</p>
        {renderQuestion()}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onNavigate}>
          {isLastQuestion ? "완료" : "다음"}
        </Button>
      </CardFooter>
    </Card>
  )
} 