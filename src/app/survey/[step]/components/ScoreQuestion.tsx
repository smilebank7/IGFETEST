import { Slider } from "@/components/ui/slider"

interface ScoreQuestionProps {
  value: number
  onChange: (value: number) => void
}

export function ScoreQuestion({ value = 0, onChange }: ScoreQuestionProps) {
  return (
    <div className="space-y-4">
      <Slider
        min={1}
        max={10}
        step={1}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
      />
      <div className="text-center text-lg font-medium">
        현재 점수: {value}
      </div>
    </div>
  )
} 