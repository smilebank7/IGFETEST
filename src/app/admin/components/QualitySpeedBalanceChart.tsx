"use client"

import { useMemo } from 'react'
import { Scatter } from 'react-chartjs-2'
import { SurveyResponse } from '@/models/SurveyResponse'

interface Props {
  responses: SurveyResponse[]
}

interface DataPoint {
  x: number;
  y: number;
}

export function QualitySpeedBalanceChart({ responses }: Props) {
  const data = useMemo(() => {
    const datasets = responses.reduce((acc: Record<string, DataPoint[]>, response) => {
      if (!acc[response.teamName]) {
        acc[response.teamName] = []
      }
      
      acc[response.teamName].push({
        x: response.dimensionScores.qualityFocus,
        y: response.dimensionScores.deadlineFocus,
      })
      
      return acc
    }, {})

    return {
      datasets: Object.entries(datasets).map(([teamName, data], index) => ({
        label: teamName,
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ][index % 3],
      })),
    }
  }, [responses])

  return (
    <Scatter
      data={data}
      options={{
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: '품질 중시',
            },
            beginAtZero: true,
            max: 25,
          },
          y: {
            title: {
              display: true,
              text: '일정 중시',
            },
            beginAtZero: true,
            max: 25,
          },
        },
        plugins: {
          title: {
            display: true,
            text: '품질-속도 균형',
          },
        },
      }}
    />
  )
} 