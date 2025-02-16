import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Option {
  text: string
  score: number
}

interface ChoiceQuestionProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
}

export function ChoiceQuestion({ options, value, onChange }: ChoiceQuestionProps) {
  return (
    <RadioGroup value={value} onValueChange={onChange}>
      {options.map((option) => (
        <div key={option.score} className="flex items-center space-x-2 p-2">
          <RadioGroupItem value={option.score.toString()} id={option.score.toString()} />
          <Label htmlFor={option.score.toString()}>{option.text}</Label>
        </div>
      ))}
    </RadioGroup>
  )
} 