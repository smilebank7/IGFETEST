"use client"

import { useEffect, useRef } from "react"
import { Chart, ChartConfiguration } from "chart.js/auto"

interface DimensionChartProps {
  scores: Record<string, number>
}

export function DimensionChart({ scores }: DimensionChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const labels = Object.keys(scores).map(key => getDimensionLabel(key))
    const data = Object.values(scores)

    const config: ChartConfiguration = {
      type: "radar",
      data: {
        labels,
        datasets: [{
          label: "차원별 점수",
          data,
          backgroundColor: "rgba(37, 99, 235, 0.2)",
          borderColor: "rgba(37, 99, 235, 1)",
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          r: {
            min: 0,
            max: Math.max(...data) + 5,
            ticks: {
              stepSize: 5
            }
          }
        }
      }
    }

    const chart = new Chart(ctx, config)
    return () => chart.destroy()
  }, [scores])

  return (
    <div className="w-full max-w-xl mx-auto">
      <canvas ref={chartRef} />
    </div>
  )
}

function getDimensionLabel(dimension: string): string {
  const labelMap: Record<string, string> = {
    Communication: "소통·외향성",
    Strictness: "코드 품질·깐깐함",
    QualityFocus: "품질 중시",
    DeadlineFocus: "일정 중시",
    TeamFocus: "팀워크·조율"
  }
  return labelMap[dimension] || dimension
} 