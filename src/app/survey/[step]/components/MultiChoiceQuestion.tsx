import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Option {
  text: string
  score: number
}

interface MultiChoiceQuestionProps {
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
}

export function MultiChoiceQuestion({ options, value = [], onChange }: MultiChoiceQuestionProps) {
  const handleChange = (checked: boolean, optionScore: number) => {
    const scoreStr = optionScore.toString()
    const newValue = checked
      ? [...value, scoreStr]
      : value.filter(v => v !== scoreStr)
    onChange(newValue)
  }

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.score} className="flex items-center space-x-2">
          <Checkbox
            id={option.score.toString()}
            checked={value.includes(option.score.toString())}
            onCheckedChange={(checked) => handleChange(checked as boolean, option.score)}
          />
          <Label htmlFor={option.score.toString()}>{option.text}</Label>
        </div>
      ))}
    </div>
  )
} 