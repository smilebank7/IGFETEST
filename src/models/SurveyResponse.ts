import mongoose, { Schema, Document } from 'mongoose';
import { ResultType } from '@/types/survey';

export interface ISurveyResponse extends Document {
  teamName: string;
  userName: string;
  answers: Map<string, string | string[] | number>;
  dimensionScores: {
    communication: number;
    strictness: number;
    qualityFocus: number;
    deadlineFocus: number;
    teamFocus: number;
  };
  resultType: ResultType;
  createdAt: Date;
}

const DimensionScoresSchema = new Schema({
  communication: { type: Number, required: true },
  strictness: { type: Number, required: true },
  qualityFocus: { type: Number, required: true },
  deadlineFocus: { type: Number, required: true },
  teamFocus: { type: Number, required: true },
}, { _id: false });

const SurveyResponseSchema = new Schema<ISurveyResponse>({
  teamName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  answers: {
    type: Map,
    of: Schema.Types.Mixed,
    required: true,
  },
  dimensionScores: {
    type: DimensionScoresSchema,
    required: true,
  },
  resultType: {
    type: String,
    enum: Object.values(ResultType),
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

// 이미 모델이 존재하는 경우 재사용, 없으면 새로 생성
const SurveyResponseModel = mongoose.models.SurveyResponse || 
  mongoose.model<ISurveyResponse>('SurveyResponse', SurveyResponseSchema);

export type SurveyResponse = ISurveyResponse;
export default SurveyResponseModel; 