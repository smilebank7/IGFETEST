"use client"

import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { calculateTeamDeviations } from '../utils/statistics'
import { SurveyResponse } from '@/models/SurveyResponse'

interface Props {
  responses: SurveyResponse[]
}

export function TeamDeviationChart({ responses }: Props) {
  const data = useMemo(() => {
    const deviations = calculateTeamDeviations(responses)
    
    return {
      labels: Object.keys(deviations),
      datasets: [
        {
          label: '커뮤니케이션',
          data: Object.values(deviations).map(d => d.communication),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: '꼼꼼함',
          data: Object.values(deviations).map(d => d.strictness),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: '품질중심',
          data: Object.values(deviations).map(d => d.qualityFocus),
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
        },
        {
          label: '일정중심',
          data: Object.values(deviations).map(d => d.deadlineFocus),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: '팀워크',
          data: Object.values(deviations).map(d => d.teamFocus),
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
        },
      ],
    }
  }, [responses])

  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: '팀별 표준편차',
          },
        },
      }}
    />
  )
} 