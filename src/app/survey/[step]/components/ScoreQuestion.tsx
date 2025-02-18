import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

interface ScoreQuestionProps {
  value: number
  onChange: (value: number) => void
}

export function ScoreQuestion({ value = 0, onChange }: ScoreQuestionProps) {
  const [inputValue, setInputValue] = useState(value.toString())

  useEffect(() => {
    setInputValue(value.toString())
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    
    const numValue = parseInt(newValue)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 10) {
      onChange(numValue)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Slider
          min={1}
          max={10}
          step={1}
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          className="flex-1"
        />
        <Input
          type="number"
          min={1}
          max={10}
          value={inputValue}
          onChange={handleInputChange}
          className="w-20"
        />
      </div>
      <div className="text-center text-sm text-gray-600">
        {value}점 (숫자가 클수록 긍정적, 작을수록 부정적)
      </div>
    </div>
  )
} 