# Quick Setup Guide

## ⚡ Prerequisites Installation

### 1. Install Node.js
1. Download from: https://nodejs.org/
2. Choose the LTS version (v18 or higher)
3. Run the installer and follow the prompts
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### 2. Install Python
1. Download from: https://www.python.org/downloads/
2. Choose Python 3.8 or higher
3. **IMPORTANT**: Check "Add Python to PATH" during installation
4. Verify installation:
   ```bash
   python --version
   pip --version
   ```

### 3. Install FFmpeg
1. Download from: https://ffmpeg.org/download.html
2. For Windows:
   - Download the Windows build
   - Extract the zip file
   - Add the `bin` folder to your system PATH
3. Verify installation:
   ```bash
   ffmpeg -version
   ```

---

## 🚀 Running the Application

### Option 1: Quick Start (Recommended)

Simply double-click `start.bat` in the project root directory.

This will:
- Install all dependencies automatically
- Start the Python service
- Start the Next.js frontend
- Open both in separate terminal windows

### Option 2: Manual Start

#### Terminal 1 - Python Service

```bash
cd python-service

# Create virtual environment (first time only)
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies (first time only)
pip install -r requirements.txt

# Start the service
python app.py
```

Keep this terminal running. You should see:
```
============================================================
YouTube Transcript Python Service
============================================================
Starting Flask server on http://localhost:5000
```

#### Terminal 2 - Next.js Frontend

```bash
cd frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

Keep this terminal running. You should see:
```
▲ Next.js 14.2.0
- Local:        http://localhost:3000
- Ready in 2.3s
```

---

## 🌐 Access the Application

Open your browser and navigate to:

**http://localhost:3000**

---

## 📝 Usage

1. Enter a YouTube URL in the input field
2. Click "Generate Transcript"
3. Wait for the transcription to complete (may take 1-5 minutes)
4. View the transcript in three formats:
   - Plain Transcript
   - Timestamped
   - SRT Format
5. Download as TXT or SRT file

---

## 🐛 Troubleshooting

### "npx is not recognized"
- Node.js is not installed or not in PATH
- Reinstall Node.js and ensure "Add to PATH" is checked

### "python is not recognized"
- Python is not installed or not in PATH
- Reinstall Python and check "Add Python to PATH"

### "ffmpeg not found"
- FFmpeg is not installed or not in PATH
- Install FFmpeg and add to system PATH

### "Python service is not running"
- Make sure the Python service is running in Terminal 1
- Check that it shows "Running on http://localhost:5000"

### pytube errors
- YouTube structure changes can break pytube
- Update pytube: `pip install --upgrade pytube`
- Alternative: Use yt-dlp instead

---

## 🎯 First Time Setup Checklist

- [ ] Install Node.js (v18+)
- [ ] Install Python (v3.8+)
- [ ] Install FFmpeg
- [ ] Navigate to project directory
- [ ] Run `start.bat` OR follow manual setup
- [ ] Wait for both services to start
- [ ] Open http://localhost:3000
- [ ] Test with a short YouTube video

---

## 📦 Project Structure

```
youtube-transcript/
├── frontend/              # Next.js application
│   ├── app/              # Pages and routes
│   ├── public/           # Static files
│   └── package.json
├── python-service/        # Python Flask API
│   ├── app.py           # Main Flask app
│   ├── downloader.py    # YouTube download
│   ├── transcriber.py   # Whisper transcription
│   └── requirements.txt
├── start.bat             # Quick start script
└── README.md            # Full documentation
```

---

## 💡 Tips

- Use shorter videos for testing (< 5 minutes)
- First run downloads the Whisper model (~140MB)
- Transcription speed depends on video length and your CPU
- Keep both terminal windows open while using the app
- Press Ctrl+C in each terminal to stop the services

---

**Need help?** Check the full [README.md](README.md) for detailed documentation.
