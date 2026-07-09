import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rawText: { type: String },
  analysis: {
    candidateName: { type: String },
    skills: [{ type: String }],
    strengths: [{ type: String }],
    gaps: [{ type: String }],
    roles: [{ type: String }]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const InterviewSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  difficulty: { type: String, required: true },
  type: { type: String, required: true }, // technical, behavioral, system-design
  questions: [{ type: String }],
  answers: [{
    questionIndex: { type: Number },
    question: { type: String },
    answer: { type: String },
    rating: { type: Number },
    positives: { type: String },
    improvements: { type: String },
    modelAnswer: { type: String }
  }],
  score: { type: Number, default: 0 },
  overallFeedback: { type: String },
  rubricBreakdown: [{
    name: { type: String },
    score: { type: Number },
    description: { type: String }
  }],
  suggestions: [{
    topic: { type: String },
    resource: { type: String }
  }],
  duration: { type: Number, default: 0 }, // in seconds
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', UserSchema);
export const Resume = mongoose.model('Resume', ResumeSchema);
export const InterviewSession = mongoose.model('InterviewSession', InterviewSessionSchema);
