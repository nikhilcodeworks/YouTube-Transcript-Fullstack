@echo off
echo ============================================================
echo YouTube to Transcript - Quick Start
echo ============================================================
echo.
echo This script will help you set up and run the application.
echo.
echo PREREQUISITES:
echo - Node.js (v18+): https://nodejs.org/
echo - Python (v3.8+): https://www.python.org/downloads/
echo - FFmpeg: https://ffmpeg.org/download.html
echo.
echo ============================================================
echo.

choice /M "Have you installed Node.js, Python, and FFmpeg"
if errorlevel 2 goto :prerequisites
if errorlevel 1 goto :setup

:prerequisites
echo.
echo Please install the prerequisites first:
echo 1. Node.js (v18+): https://nodejs.org/
echo 2. Python (v3.8+): https://www.python.org/downloads/
echo 3. FFmpeg: https://ffmpeg.org/download.html
echo.
echo Then run this script again.
pause
exit /b

:setup
echo.
echo [1/4] Setting up Frontend...
cd frontend
if not exist node_modules (
    echo Installing Node.js dependencies...
    call npm install
) else (
    echo Node modules already installed, skipping...
)

echo.
echo [2/4] Setting up Python Service...
cd ..\python-service
if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
) else (
    echo Virtual environment already exists, skipping...
)

echo.
echo [3/4] Installing Python dependencies...
call venv\Scripts\activate
pip install -r requirements.txt

echo.
echo [4/4] Setup complete!
echo.
echo ============================================================
echo STARTING SERVICES
echo ============================================================
echo.
echo Starting Python service on http://localhost:5000
echo Starting Next.js frontend on http://localhost:3000
echo.
echo Press Ctrl+C in each window to stop the services.
echo.
pause

echo Starting Python service...
start cmd /k "cd /d %~dp0python-service && venv\Scripts\activate && python app.py"

timeout /t 3 /nobreak > nul

echo Starting Next.js frontend...
start cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ============================================================
echo Services started!
echo Open your browser to: http://localhost:3000
echo ============================================================
pause
