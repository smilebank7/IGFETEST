import { SurveyResponse } from '@/models/SurveyResponse'

interface TeamScores {
  communication: number[];
  strictness: number[];
  qualityFocus: number[];
  deadlineFocus: number[];
  teamFocus: number[];
  count: number;
}

interface TeamAverages {
  [teamName: string]: {
    communication: number;
    strictness: number;
    qualityFocus: number;
    deadlineFocus: number;
    teamFocus: number;
  }
}

export const calculateTeamAverages = (responses: SurveyResponse[]): TeamAverages => {
  const teamScores: Record<string, TeamScores> = {}

  responses.forEach(response => {
    if (!teamScores[response.teamName]) {
      teamScores[response.teamName] = {
        communication: [],
        strictness: [],
        qualityFocus: [],
        deadlineFocus: [],
        teamFocus: [],
        count: 0,
      }
    }

    const team = teamScores[response.teamName]
    const scores = response.dimensionScores

    team.communication.push(scores.communication)
    team.strictness.push(scores.strictness)
    team.qualityFocus.push(scores.qualityFocus)
    team.deadlineFocus.push(scores.deadlineFocus)
    team.teamFocus.push(scores.teamFocus)
    team.count++
  })

  const averages: TeamAverages = {}
  Object.entries(teamScores).forEach(([teamName, scores]) => {
    averages[teamName] = {
      communication: average(scores.communication),
      strictness: average(scores.strictness),
      qualityFocus: average(scores.qualityFocus),
      deadlineFocus: average(scores.deadlineFocus),
      teamFocus: average(scores.teamFocus),
    }
  })

  return averages
}

export const calculateTeamTotals = (responses: SurveyResponse[]) => {
  const teamTotals: Record<string, number> = {}

  responses.forEach(response => {
    const total = Object.values(response.dimensionScores).reduce((a, b) => a + b, 0)
    teamTotals[response.teamName] = (teamTotals[response.teamName] || 0) + total
  })

  return teamTotals
}

export const calculateTeamDeviations = (responses: SurveyResponse[]) => {
  const teamScores: Record<string, TeamScores> = {}
  
  // 팀별 점수 수집
  responses.forEach(response => {
    if (!teamScores[response.teamName]) {
      teamScores[response.teamName] = {
        communication: [],
        strictness: [],
        qualityFocus: [],
        deadlineFocus: [],
        teamFocus: [],
        count: 0,
      }
    }

    const team = teamScores[response.teamName]
    const scores = response.dimensionScores

    team.communication.push(scores.communication)
    team.strictness.push(scores.strictness)
    team.qualityFocus.push(scores.qualityFocus)
    team.deadlineFocus.push(scores.deadlineFocus)
    team.teamFocus.push(scores.teamFocus)
  })

  // 표준편차 계산
  const deviations: Record<string, Record<string, number>> = {}
  Object.entries(teamScores).forEach(([teamName, scores]) => {
    deviations[teamName] = {
      communication: standardDeviation(scores.communication),
      strictness: standardDeviation(scores.strictness),
      qualityFocus: standardDeviation(scores.qualityFocus),
      deadlineFocus: standardDeviation(scores.deadlineFocus),
      teamFocus: standardDeviation(scores.teamFocus),
    }
  })

  return deviations
}

const average = (arr: number[]): number => 
  arr.reduce((a, b) => a + b, 0) / arr.length

const standardDeviation = (arr: number[]): number => {
  const avg = average(arr)
  const squareDiffs = arr.map(value => Math.pow(value - avg, 2))
  return Math.sqrt(average(squareDiffs))
} 