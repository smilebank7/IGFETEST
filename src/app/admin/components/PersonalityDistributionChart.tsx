"use client"

import { useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import { SurveyResponse } from '@/models/SurveyResponse'
import { ResultType, ResultTypeDisplay } from '@/types/survey'
import { pieChartOptions } from '../utils/chartOptions'

interface Props {
  responses: SurveyResponse[]
}

export function PersonalityDistributionChart({ responses }: Props) {
  const data = useMemo(() => {
    const distribution: Record<ResultType, number> = {
      ChillGuy: 0,
      MeticulousReviewer: 0,
      BugHunter: 0,
      CommunicationOverloader: 0,
      SprintWarrior: 0,
      TeamBuffer: 0,
      SilentArtisan: 0,
    }

    responses.forEach(response => {
      distribution[response.resultType]++
    })

    return {
      labels: Object.keys(distribution).map(type => ResultTypeDisplay[type as ResultType]),
      datasets: [
        {
          data: Object.values(distribution),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(201, 203, 207, 0.5)',
          ],
        },
      ],
    }
  }, [responses])

  return (
    <Pie
      data={data}
      options={{
        ...pieChartOptions,
        plugins: {
          ...pieChartOptions.plugins,
          title: {
            display: false
          },
        },
      }}
    />
  )
} 