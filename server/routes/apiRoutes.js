import express from 'express';
import multer from 'multer';
import { register, login, getMe } from '../controllers/authController.js';
import { uploadAndAnalyze, analyzeText, getLatestResume } from '../controllers/resumeController.js';
import { startInterview, finishInterview, getInterviewDetails, getHistory } from '../controllers/interviewController.js';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { protect } from '../middleware/auth.js';
import { checkResumeLimit, checkInterviewLimit, checkAuthLimit } from '../middleware/rateLimiter.js';

const router = express.Router();

// Multer memory storage configuration for PDFs
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Auth Endpoints
router.post('/auth/register', checkAuthLimit, register);
router.post('/auth/login', checkAuthLimit, login);
router.get('/auth/me', protect, getMe);

// Resume Endpoints
router.post('/resumes/upload', protect, checkResumeLimit, upload.single('resume'), uploadAndAnalyze);
router.post('/resumes/analyze-text', protect, checkResumeLimit, analyzeText);
router.get('/resumes/latest', protect, getLatestResume);

// Interview Endpoints
router.post('/interviews/start', protect, checkInterviewLimit, startInterview);
router.post('/interviews/:id/finish', protect, finishInterview);
router.get('/interviews/history', protect, getHistory);
router.get('/interviews/:id', protect, getInterviewDetails);

// Dashboard Endpoints
router.get('/dashboard/stats', protect, getDashboardStats);

export default router;
