import { atom } from 'jotai'
import type { Answer } from '@/types/survey'

interface SurveyState {
  answers: Record<number, Answer>
  user: {
    name: string
    // 필요한 사용자 필드들
  } | null
}

export const surveyStateAtom = atom<SurveyState>({
  answers: {},
  user: null
}) 