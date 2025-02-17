"use client"

import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { SurveyResponse } from '@/models/SurveyResponse'
import { barChartOptions } from '../utils/chartOptions'

interface Props {
  responses: SurveyResponse[]
}

export function TeamTotalChart({ responses }: Props) {
  const data = useMemo(() => {
    const teamDimensionTotals: Record<string, {
      communication: number;
      strictness: number;
      qualityFocus: number;
      deadlineFocus: number;
      teamFocus: number;
    }> = {}

    responses.forEach(response => {
      if (!teamDimensionTotals[response.teamName]) {
        teamDimensionTotals[response.teamName] = {
          communication: 0,
          strictness: 0,
          qualityFocus: 0,
          deadlineFocus: 0,
          teamFocus: 0,
        }
      }

      const scores = response.dimensionScores
      const team = teamDimensionTotals[response.teamName]
      team.communication += scores.communication
      team.strictness += scores.strictness
      team.qualityFocus += scores.qualityFocus
      team.deadlineFocus += scores.deadlineFocus
      team.teamFocus += scores.teamFocus
    })

    return {
      labels: Object.keys(teamDimensionTotals),
      datasets: [
        {
          label: '커뮤니케이션',
          data: Object.values(teamDimensionTotals).map(team => team.communication),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: '꼼꼼함',
          data: Object.values(teamDimensionTotals).map(team => team.strictness),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: '품질중심',
          data: Object.values(teamDimensionTotals).map(team => team.qualityFocus),
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
        },
        {
          label: '일정중심',
          data: Object.values(teamDimensionTotals).map(team => team.deadlineFocus),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: '팀워크',
          data: Object.values(teamDimensionTotals).map(team => team.teamFocus),
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
        },
      ],
    }
  }, [responses])

  return (
    <Bar
      data={data}
      options={{
        ...barChartOptions,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: '총점'
            }
          },
        },
        plugins: {
          ...barChartOptions.plugins,
          title: {
            display: true,
            text: '팀별 평가 기준 총점',
          },
        },
      }}
    />
  )
} 