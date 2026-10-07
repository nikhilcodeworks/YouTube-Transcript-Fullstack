@echo off
echo ============================================================
echo Testing YouTube Transcript App with Docker
echo ============================================================
echo.

echo Stopping any existing containers...
docker-compose down

echo.
echo Building Docker images...
docker-compose build

if %errorlevel% neq 0 (
    echo ERROR: Docker build failed!
    pause
    exit /b 1
)

echo.
echo Starting containers...
docker-compose up -d

echo.
echo Waiting for services to start (60 seconds)...
timeout /t 60 /nobreak

echo.
echo ============================================================
echo Services Started!
echo ============================================================
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Checking container status...
docker ps

echo.
echo Testing backend health...
curl http://localhost:5000/health

echo.
echo ============================================================
echo Docker test complete!
echo ============================================================
echo.
echo To view logs: docker-compose logs -f
echo To stop:      docker-compose down
echo.
pause
