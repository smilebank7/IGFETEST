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

export enum ResultType {
  ChillGuy = 'ChillGuy',
  MeticulousReviewer = 'MeticulousReviewer',
  BugHunter = 'BugHunter',
  CommunicationOverloader = 'CommunicationOverloader',
  SprintWarrior = 'SprintWarrior',
  TeamBuffer = 'TeamBuffer',
  SilentArtisan = 'SilentArtisan',
}

export interface IDimensionScores {
  communication?: number;
  strictness?: number;
  qualityFocus?: number;
  deadlineFocus?: number;
  teamFocus?: number;
}

export type Answer = string | string[] | number 

export interface SurveyUser {
  name: string
  // 필요한 다른 사용자 필드들을 여기에 추가하세요
}

export interface SurveyResult {
  type: ResultType;
  dimensionScores: Record<string, number>;
  surveyUser: {
    name: string;
    teamName: string;
  };
}

export const ResultTypeDisplay: Record<ResultType, string> = {
  [ResultType.ChillGuy]: '여유로운 개발자',
  [ResultType.MeticulousReviewer]: '깐깐한 리뷰어',
  [ResultType.BugHunter]: '버그 헌터',
  [ResultType.CommunicationOverloader]: '소통 폭주기관차',
  [ResultType.SprintWarrior]: '스프린트 전사',
  [ResultType.TeamBuffer]: '팀워크 버퍼',
  [ResultType.SilentArtisan]: '고독한 장인',
}; 