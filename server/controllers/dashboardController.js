import { InterviewSession } from '../models/Schemas.js';
import { localDb } from '../utils/localDb.js';

export const getDashboardStats = async (req, res) => {
  const useLocal = process.env.USE_LOCAL_DB === 'true';
  const userId = req.user.id;

  try {
    let completedInterviews = [];

    if (useLocal) {
      completedInterviews = localDb.interviews.find({ userId, isCompleted: true });
    } else {
      completedInterviews = await InterviewSession.find({ userId, isCompleted: true }).sort({ createdAt: -1 });
    }

    // Default structure if user has no sessions yet
    if (completedInterviews.length === 0) {
      return res.status(200).json({
        stats: {
          averageScore: 0,
          interviewsCompleted: 0,
          focusAreas: ['System Design', 'Behavioral STAR', 'Coding Syntax'],
          skills: [
            { name: 'Technical Knowledge', value: 0 },
            { name: 'Problem Solving', value: 0 },
            { name: 'Communication', value: 0 },
            { name: 'Behavioral Skills', value: 0 }
          ],
          scoreHistory: []
        },
        recentInterviews: []
      });
    }

    // Aggregate statistics
    const totalSessions = completedInterviews.length;
    const scores = completedInterviews.map(session => session.score || 0);
    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalSessions);
    
    // Sort chronologically for history chart
    const scoreHistory = [...completedInterviews]
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map(session => session.score);

    // Extract focus areas (topics from suggestions)
    const suggestionsPool = [];
    completedInterviews.forEach(session => {
      if (session.suggestions && Array.isArray(session.suggestions)) {
        session.suggestions.forEach(sug => {
          if (sug.topic) suggestionsPool.push(sug.topic);
        });
      }
    });

    // Unique topics, take top 3
    const uniqueFocusAreas = [...new Set(suggestionsPool)].slice(0, 3);
    const focusAreas = uniqueFocusAreas.length > 0 ? uniqueFocusAreas : ['Technical Depth', 'STAR Method', 'System Scale'];

    // Rubric breakdown averages
    let techSum = 0, techCount = 0;
    let probSum = 0, probCount = 0;
    let commSum = 0, commCount = 0;

    completedInterviews.forEach(session => {
      if (session.rubricBreakdown) {
        session.rubricBreakdown.forEach(rub => {
          const name = rub.name.toLowerCase();
          if (name.includes('tech')) {
            techSum += rub.score;
            techCount++;
          } else if (name.includes('solve') || name.includes('problem')) {
            probSum += rub.score;
            probCount++;
          } else if (name.includes('commun') || name.includes('deliver') || name.includes('star')) {
            commSum += rub.score;
            commCount++;
          }
        });
      }
    });

    const techAvg = techCount > 0 ? Math.round(techSum / techCount) : averageScore;
    const probAvg = probCount > 0 ? Math.round(probSum / probCount) : averageScore;
    const commAvg = commCount > 0 ? Math.round(commSum / commCount) : averageScore;

    // Custom skills breakdown structure
    const skills = [
      { name: 'Technical Depth', value: techAvg },
      { name: 'Problem Solving', value: probAvg },
      { name: 'Communication Style', value: commAvg }
    ];

    // Recent activity list
    const recentInterviews = completedInterviews.slice(0, 3).map(session => ({
      id: session._id || session.id,
      role: session.role,
      type: session.type,
      difficulty: session.difficulty,
      score: session.score,
      date: session.createdAt,
      totalQuestions: session.questions?.length || 0
    }));

    res.status(200).json({
      stats: {
        averageScore,
        interviewsCompleted: totalSessions,
        focusAreas,
        skills,
        scoreHistory
      },
      recentInterviews
    });

  } catch (err) {
    console.error('getDashboardStats controller error:', err);
    res.status(500).json({ message: 'Failed to aggregate dashboard analytics' });
  }
};
