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

// In-memory sliding window IP store for Auth Rate Limiting
const authAttemptsMap = new Map();
const AUTH_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const AUTH_MAX_ATTEMPTS = 10; // Max 10 attempts per 15 minutes per IP

// Cleanup stale IPs every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of authAttemptsMap.entries()) {
    if (now - data.resetTime > AUTH_WINDOW_MS) {
      authAttemptsMap.delete(ip);
    }
  }
}, 30 * 60 * 1000);

export const checkAuthLimit = (req, res, next) => {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  let record = authAttemptsMap.get(clientIp);

  if (!record || (now - record.resetTime > AUTH_WINDOW_MS)) {
    record = { count: 1, resetTime: now };
    authAttemptsMap.set(clientIp, record);
    return next();
  }

  record.count += 1;

  if (record.count > AUTH_MAX_ATTEMPTS) {
    const minutesLeft = Math.ceil((AUTH_WINDOW_MS - (now - record.resetTime)) / 60000);
    return res.status(429).json({
      message: `Too many authentication attempts from this IP address. Please try again in ${minutesLeft} minutes.`
    });
  }

  next();
};
