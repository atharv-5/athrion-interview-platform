import pdfParse from 'pdf-parse';
import { Resume } from '../models/Schemas.js';
import { localDb } from '../utils/localDb.js';
import { aiService } from '../utils/ai.js';

export const uploadAndAnalyze = async (req, res) => {
  const useLocal = process.env.USE_LOCAL_DB === 'true';
  const userId = req.user.id;

  if (!req.file) {
    return res.status(400).json({ message: 'No resume file uploaded' });
  }

  try {
    const dataBuffer = req.file.buffer;
    let resumeText = '';

    try {
      const parsedPdf = await pdfParse(dataBuffer);
      resumeText = parsedPdf.text;
    } catch (parseErr) {
      console.warn('PDF parsing failed, utilizing default resume metadata instead.');
      resumeText = `Uploaded Resume File: ${req.file.originalname}`;
    }

    if (!resumeText.trim()) {
      resumeText = `Uploaded Resume: ${req.file.originalname}`;
    }

    // Call AI service to analyze skills
    const analysis = await aiService.analyzeResume(resumeText);

    let savedResume = null;

    if (useLocal) {
      savedResume = localDb.resumes.createOrUpdate(userId, {
        rawText: resumeText,
        analysis
      });
    } else {
      // Find existing
      const existing = await Resume.findOne({ userId });
      if (existing) {
        existing.rawText = resumeText;
        existing.analysis = analysis;
        existing.updatedAt = new Date();
        savedResume = await existing.save();
      } else {
        savedResume = await Resume.create({
          userId,
          rawText: resumeText,
          analysis
        });
      }
    }

    res.status(200).json({
      message: 'Resume analyzed successfully',
      analysis
    });

  } catch (err) {
    console.error('Resume upload/analysis error:', err);
    res.status(500).json({ message: 'Failed to upload or analyze resume' });
  }
};

export const analyzeText = async (req, res) => {
  const { text } = req.body;
  const useLocal = process.env.USE_LOCAL_DB === 'true';
  const userId = req.user.id;

  if (!text || !text.trim()) {
    return res.status(400).json({ message: 'Please provide resume text content' });
  }

  try {
    const analysis = await aiService.analyzeResume(text);

    let savedResume = null;

    if (useLocal) {
      savedResume = localDb.resumes.createOrUpdate(userId, {
        rawText: text,
        analysis
      });
    } else {
      const existing = await Resume.findOne({ userId });
      if (existing) {
        existing.rawText = text;
        existing.analysis = analysis;
        existing.updatedAt = new Date();
        savedResume = await existing.save();
      } else {
        savedResume = await Resume.create({
          userId,
          rawText: text,
          analysis
        });
      }
    }

    res.status(200).json({
      message: 'Resume text analyzed successfully',
      analysis
    });

  } catch (err) {
    console.error('Resume text analysis error:', err);
    res.status(500).json({ message: 'Failed to analyze resume text' });
  }
};

export const getLatestResume = async (req, res) => {
  const useLocal = process.env.USE_LOCAL_DB === 'true';
  const userId = req.user.id;

  try {
    let resume = null;

    if (useLocal) {
      resume = localDb.resumes.findOne({ userId });
    } else {
      resume = await Resume.findOne({ userId });
    }

    if (!resume) {
      return res.status(404).json({ message: 'No resume analysis found' });
    }

    res.status(200).json({ analysis: resume.analysis });
  } catch (err) {
    console.error('getLatestResume error:', err);
    res.status(500).json({ message: 'Server error retrieving resume analysis' });
  }
};
