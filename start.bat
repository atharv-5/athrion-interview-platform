@echo off
title AI Interview Platform Runner
echo ===================================================
echo   Starting AI Interview Preparation Platform...
echo ===================================================

echo Starting Express backend on http://localhost:5000...
start "AI Backend Server" cmd /k "cd server && npm run dev || node server.js"

echo Starting React frontend on http://localhost:5173...
start "AI Frontend Client" cmd /k "cd client && npm run dev"

echo.
echo ===================================================
echo   Both services initiated.
echo   - Frontend: http://localhost:5173
echo   - Backend API: http://localhost:5000
echo ===================================================
echo Keep this window open or press any key to exit.
pause
