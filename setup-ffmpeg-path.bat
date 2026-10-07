@echo off
echo ============================================================
echo Adding FFmpeg to System PATH
echo ============================================================
echo.
echo This will add FFmpeg to your system PATH so Python can use it.
echo.
echo FFmpeg location: C:\Users\nikhi\projects\youtube-transcript\ffmpeg-8.0.1-essentials_build\bin
echo.
echo INSTRUCTIONS:
echo 1. Press Windows Key and type "environment variables"
echo 2. Click "Edit the system environment variables"
echo 3. Click "Environment Variables..." button
echo 4. Under "System variables" (bottom), find and select "Path"
echo 5. Click "Edit..."
echo 6. Click "New"
echo 7. Paste this path:
echo.
echo    C:\Users\nikhi\projects\youtube-transcript\ffmpeg-8.0.1-essentials_build\bin
echo.
echo 8. Click OK on all windows
echo 9. RESTART your terminal/PowerShell
echo 10. Test with: ffmpeg -version
echo.
echo ============================================================
echo.
echo OR use PowerShell to add it automatically (Run as Admin):
echo.
echo [System.Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Users\nikhi\projects\youtube-transcript\ffmpeg-8.0.1-essentials_build\bin", [System.EnvironmentVariableTarget]::Machine)
echo.
echo ============================================================
pause

REM Test if ffmpeg is already accessible
echo.
echo Testing if FFmpeg is accessible...
ffmpeg -version 2>nul
if %errorlevel% equ 0 (
    echo.
    echo SUCCESS! FFmpeg is already working!
    echo You can now run the application.
) else (
    echo.
    echo FFmpeg not found in PATH yet.
    echo Please follow the instructions above to add it.
)
echo.
pause
