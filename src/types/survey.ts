export type QuestionType = "choice" | "score" | "multiChoice"

export interface Question {
  id: number
  type: QuestionType
  text: string
  options?: Array<{
    text: string
    score: number
  }>
  multipleAllowed?: boolean
}

export type Dimension = "Communication" | "Strictness" | "QualityFocus" | "DeadlineFocus" | "TeamFocus"

export type ResultType = 
  | "ChillGuy"
  | "MeticulousReviewer" 
  | "BugHunter"
  | "CommunicationOverloader"
  | "SprintWarrior"
  | "TeamBuffer"
  | "SilentArtisan"

export type Answer = string | string[] | number 

export interface SurveyUser {
  name: string
  // 필요한 다른 사용자 필드들을 여기에 추가하세요
} 