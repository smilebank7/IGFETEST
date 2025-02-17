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
      datasets: Object.entries(teamAverages).map(([teamName, scores], index) => ({
        label: teamName,
        data: [scores.communication, scores.teamFocus, scores.strictness],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',   
          'rgba(54, 162, 235, 0.2)',   
          'rgba(255, 206, 86, 0.2)',   
          'rgba(75, 192, 192, 0.2)',   
          'rgba(153, 102, 255, 0.2)',  
          'rgba(255, 159, 64, 0.2)',   
          'rgba(201, 203, 207, 0.2)',  
        ][index % 7],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(201, 203, 207, 1)',
        ][index % 7],
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