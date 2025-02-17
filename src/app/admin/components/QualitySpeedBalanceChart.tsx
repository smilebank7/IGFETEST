/* eslint-disable @typescript-eslint/no-explicit-any */
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
  count?: number;
}

export function QualitySpeedBalanceChart({ responses }: Props) {
  const data = useMemo(() => {
    const datasets = responses.reduce((acc: Record<string, Record<string, DataPoint>>, response) => {
      if (!acc[response.teamName]) {
        acc[response.teamName] = {}
      }
      
      const x = response.dimensionScores.qualityFocus
      const y = response.dimensionScores.deadlineFocus
      const key = `${x}-${y}`
      
      if (!acc[response.teamName][key]) {
        acc[response.teamName][key] = { x, y, count: 1 }
      } else {
        acc[response.teamName][key].count = (acc[response.teamName][key].count || 1) + 1
      }
      
      return acc
    }, {})

    return {
      datasets: Object.entries(datasets).map(([teamName, points], index) => ({
        label: teamName,
        data: Object.values(points),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',    
          'rgba(54, 162, 235, 0.7)',    
          'rgba(255, 206, 86, 0.7)',    
          'rgba(75, 192, 192, 0.7)',    
          'rgba(153, 102, 255, 0.7)',   
          'rgba(255, 159, 64, 0.7)',    
          'rgba(201, 77, 109, 0.7)',    
          'rgba(89, 173, 111, 0.7)',    
          'rgba(123, 83, 173, 0.7)',    
        ][index % 9],
        borderColor: [
          'rgb(255, 99, 132)',     
          'rgb(54, 162, 235)',     
          'rgb(255, 206, 86)',     
          'rgb(75, 192, 192)',     
          'rgb(153, 102, 255)',    
          'rgb(255, 159, 64)',     
          'rgb(201, 77, 109)',     
          'rgb(89, 173, 111)',     
          'rgb(123, 83, 173)',     
        ][index % 9],
        borderWidth: 2,
        pointRadius: (context: any) => {
          const point = context.dataset.data[context.dataIndex]
          return 4 + (point.count ? (point.count - 1) * 2 : 0) 
        },
        pointHoverRadius: (context: any) => {
          const point = context.dataset.data[context.dataIndex]
          return 6 + (point.count ? (point.count - 1) * 2 : 0)
        },
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
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const point = context.raw
                const count = point.count || 1
                return `${context.dataset.label}: (${point.x}, ${point.y}) - ${count}명`
              }
            }
          }
        },
      }}
    />
  )
} 