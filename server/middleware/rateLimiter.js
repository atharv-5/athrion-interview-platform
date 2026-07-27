import { Resume, InterviewSession } from '../models/Schemas.js';
import { localDb } from '../utils/localDb.js';

// Limits per day per user
const RESUME_DAILY_LIMIT = 2;
const INTERVIEW_DAILY_LIMIT = 4;

const getStartOfDay = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

export const checkResumeLimit = async (req, res, next) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: 'User authorization required' });
  }

  const useLocal = process.env.USE_LOCAL_DB === 'true';
  const startOfDay = getStartOfDay();

  try {
    let count = 0;
    if (useLocal) {
      const userResumes = localDb.resumes.find({ userId });
      count = userResumes.filter(r => new Date(r.updatedAt || r.createdAt) >= startOfDay).length;
    } else {
      count = await Resume.countDocuments({
        userId,
        updatedAt: { $gte: startOfDay }
      });
    }

    if (count >= RESUME_DAILY_LIMIT) {
      return res.status(429).json({
        message: `Daily limit reached! You can analyze up to ${RESUME_DAILY_LIMIT} resumes per day to conserve AI quota. Please try again tomorrow!`,
        limit: RESUME_DAILY_LIMIT,
        current: count
      });
    }

    next();
  } catch (err) {
    console.error('Resume rate limit error:', err);
    next();
  }
};

export const checkInterviewLimit = async (req, res, next) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: 'User authorization required' });
  }

  const useLocal = process.env.USE_LOCAL_DB === 'true';
  const startOfDay = getStartOfDay();

  try {
    let count = 0;
    if (useLocal) {
      const userInterviews = localDb.interviews.find({ userId });
      count = userInterviews.filter(i => new Date(i.createdAt) >= startOfDay).length;
    } else {
      count = await InterviewSession.countDocuments({
        userId,
        createdAt: { $gte: startOfDay }
      });
    }

    if (count >= INTERVIEW_DAILY_LIMIT) {
      return res.status(429).json({
        message: `Daily limit reached! You can create up to ${INTERVIEW_DAILY_LIMIT} mock interviews per day to conserve AI quota. Please try again tomorrow!`,
        limit: INTERVIEW_DAILY_LIMIT,
        current: count
      });
    }

    next();
  } catch (err) {
    console.error('Interview rate limit error:', err);
    next();
  }
};
