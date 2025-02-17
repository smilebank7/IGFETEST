import { atom } from 'jotai'
import type { Answer } from '@/types/survey'

interface SurveyState {
  answers: Record<number, Answer>
  user: {
    teamName: string
    name: string
  } | null
}

export const surveyStateAtom = atom<SurveyState>({
  answers: {},
  user: null
}) 