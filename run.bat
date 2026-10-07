@echo off
title Launching YouTube-Transcript-Fullstack Full-Stack
echo ========================================================
echo   [1-CLICK RUN] Starting YouTube-Transcript-Fullstack
echo   Backend: python-service  ^|  Frontend: frontend
echo ========================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    pause
    exit /b 1
)

echo [1/3] Launching Backend Server in dedicated terminal...
start "YouTube-Transcript-Fullstack - Backend" cmd /k "title YouTube-Transcript-Fullstack - Backend && cd python-service && python main.py || python app.py"

echo [INFO] Waiting 3 seconds for backend initialization...
timeout /t 3 /nobreak >nul

echo [2/3] Launching Frontend Client in dedicated terminal...
start "YouTube-Transcript-Fullstack - Frontend" cmd /k "title YouTube-Transcript-Fullstack - Frontend && cd frontend && if not exist node_modules (npm install) && npm run dev"

echo [INFO] Waiting 4 seconds for frontend initialization...
timeout /t 4 /nobreak >nul

echo [3/3] Opening YouTube-Transcript-Fullstack in your default browser...
start http://localhost:3000

echo.
echo ========================================================
echo  [SUCCESS] Both Backend and Frontend are running!
echo  To shut down, simply close both spawned terminal windows.
echo ========================================================
pause
