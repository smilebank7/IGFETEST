"use client"

import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { calculateTeamAverages } from '../utils/statistics'
import { SurveyResponse } from '@/models/SurveyResponse'
import '../components/ChartConfig'
import { barChartOptions } from '../utils/chartOptions'

interface Props {
  responses: SurveyResponse[]
}

export function TeamAverageChart({ responses }: Props) {
  const data = useMemo(() => {
    const teamAverages = calculateTeamAverages(responses)
    
    return {
      labels: Object.keys(teamAverages),
      datasets: [
        {
          label: '커뮤니케이션',
          data: Object.values(teamAverages).map(team => team.communication),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: '꼼꼼함',
          data: Object.values(teamAverages).map(team => team.strictness),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: '품질중심',
          data: Object.values(teamAverages).map(team => team.qualityFocus),
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
        },
        {
          label: '일정중심',
          data: Object.values(teamAverages).map(team => team.deadlineFocus),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: '팀워크',
          data: Object.values(teamAverages).map(team => team.teamFocus),
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
            max: 25,
          },
        },
        plugins: {
          ...barChartOptions.plugins,
          title: {
            display: true,
            text: '팀별 평균 점수',
          },
        },
      }}
    />
  )
} 