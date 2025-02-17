"use client"

import { useMemo } from 'react'
import { Radar } from 'react-chartjs-2'
import { calculateTeamAverages } from '../utils/statistics'
import { SurveyResponse } from '@/models/SurveyResponse'
import { radarChartOptions } from '../utils/chartOptions'

interface Props {
  responses: SurveyResponse[]
}

export function TeamCollaborationChart({ responses }: Props) {
  const data = useMemo(() => {
    const teamAverages = calculateTeamAverages(responses)
    
    return {
      labels: ['커뮤니케이션', '팀워크', '꼼꼼함'],
      datasets: Object.entries(teamAverages).map(([teamName, scores]) => ({
        label: teamName,
        data: [scores.communication, scores.teamFocus, scores.strictness],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      })),
    }
  }, [responses])

  return (
    <Radar
      data={data}
      options={{
        ...radarChartOptions,
        scales: {
          r: {
            beginAtZero: true,
            max: 25,
          },
        },
        plugins: {
          ...radarChartOptions.plugins,
          title: {
            display: false
          },
        },
      }}
    />
  )
} 