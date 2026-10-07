<div align="center">

# 🚀 YouTube to Transcript - Fullstack Application

<p align="center">
  <strong>Automated pipeline converting YouTube video URLs into timestamped transcripts, summaries, and notes.</strong>
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack--architecture">Tech Stack</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-getting-started">Getting Started</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Category-AI%20Audio%20%26%20Video%20Intelligence-7c3aed?style=for-the-badge" alt="Category: AI Audio & Video Intelligence" />
  <img src="https://img.shields.io/badge/Tech%20Stack-Next.js%20%7C%20Python%20Service%20%7C%20TypeScript-10b981?style=for-the-badge" alt="Tech Stack: Next.js | Python Service | TypeScript" />
  <img src="https://img.shields.io/badge/Status-Production%20Ready-8b5cf6?style=for-the-badge" alt="Status: Production Ready" />
  <img src="https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge" alt="License: MIT" />
</p>

</div>

---

## ✨ Key Features

- 🎯 **100% Free & Offline** - No paid APIs or cloud services required
- 🚀 **Fast & Accurate** - Powered by OpenAI Whisper for high-quality transcription
- 🔒 **Privacy First** - All processing happens locally on your machine
- 📥 **Multiple Formats** - Download transcripts as TXT or SRT subtitle files
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔍 **SEO Optimized** - Complete metadata, OpenGraph tags, and semantic HTML
- ⚡ **Server-Side Rendering** - Built with Next.js 14 App Router for optimal performance

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/

2. **Python** (v3.8 or higher)
   - Download from: https://www.python.org/downloads/

3. **FFmpeg** (required for Whisper audio processing)
   - **Windows**: Download from https://ffmpeg.org/download.html and add to PATH
   - **macOS**: `brew install ffmpeg`
   - **Linux**: `sudo apt install ffmpeg` or `sudo yum install ffmpeg`

## 🚀 Installation

### 1. Clone or Navigate to Project Directory

```bash
cd c:\Users\nikhi\projects\youtube-transcript
```

### 2. Set Up the Frontend (Next.js)

```bash
cd frontend
npm install
```

### 3. Set Up the Python Service

```bash
cd ../python-service
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
```

**Note**: The first time you run the Python service, Whisper will download the model (~140MB for the base model). This is a one-time download.

### 4. Environment Configuration (Optional)

Copy `.env.example` to `.env` in the root directory if you want to customize settings:

```bash
# From the project root
copy .env.example .env
```

Default configuration:
- Python service runs on `http://localhost:5000`
- Next.js runs on `http://localhost:3000`
- Whisper model: `base` (good balance of speed and accuracy)

Available Whisper models:
- `tiny` - Fastest, less accurate (~40MB)
- `base` - Good balance (~140MB) **[Recommended]**
- `small` - Better accuracy (~470MB)
- `medium` - High accuracy (~1.5GB)
- `large` - Best accuracy (~3GB)

## 🎮 Running the Application

You need to run **both** the Python service and the Next.js frontend.

### Terminal 1: Start the Python Service

```bash
cd python-service

# Activate virtual environment first
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

python app.py
```

You should see:
```
============================================================
YouTube Transcript Python Service
============================================================
Starting Flask server on http://localhost:5000
Endpoints:
  POST /transcribe - Transcribe YouTube video
  GET  /health     - Health check
============================================================
```

### Terminal 2: Start the Next.js Frontend

```bash
cd frontend
npm run dev
```

You should see:
```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

### 3. Open Your Browser

Navigate to `http://localhost:3000`

## 📖 Usage

1. **Enter a YouTube URL** in the input field on the homepage
2. **Click "Generate Transcript"** to start the transcription process
3. **Wait for processing** (this may take 1-5 minutes depending on video length)
4. **View the transcript** in three formats:
   - **Plain Transcript** - Clean, readable text
   - **Timestamped** - Each segment with start time
   - **SRT Format** - Standard subtitle file format
5. **Download** the transcript in TXT or SRT format

## 📁 Project Structure

```
youtube-transcript/
├── frontend/                    # Next.js 14 application
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO metadata
│   │   ├── page.tsx            # Homepage with URL input
│   │   ├── globals.css         # Global styles
│   │   ├── transcript/
│   │   │   └── page.tsx        # Transcript display page
│   │   └── api/
│   │       └── transcribe/
│   │           └── route.ts    # API route (proxy to Python)
│   ├── public/
│   │   ├── robots.txt          # SEO: robots configuration
│   │   └── sitemap.xml         # SEO: sitemap
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── next.config.js
├── python-service/              # Python transcription service
│   ├── app.py                  # Flask REST API
│   ├── downloader.py           # YouTube audio download (pytube)
│   ├── transcriber.py          # Whisper transcription
│   ├── requirements.txt
│   └── temp/                   # Temporary audio files
├── .env.example
└── README.md
```

## 🔧 Troubleshooting

### pytube Issues

If you encounter errors with pytube (YouTube changes can break it):

**Solution 1**: Update pytube to the latest version
```bash
pip install --upgrade pytube
```

**Solution 2**: Use yt-dlp as an alternative (modify `downloader.py`):
```bash
pip install yt-dlp
```

Then update `downloader.py` to use yt-dlp instead of pytube.

### FFmpeg Not Found

**Error**: `FileNotFoundError: [Errno 2] No such file or directory: 'ffmpeg'`

**Solution**: Install FFmpeg and ensure it's in your system PATH:
- Windows: Download from https://ffmpeg.org/, extract, and add to PATH
- macOS: `brew install ffmpeg`
- Linux: `sudo apt install ffmpeg`

### Python Service Connection Error

**Error**: `Python service is not running`

**Solution**: Make sure the Python service is running on port 5000 before using the frontend.

### Model Download Issues

If Whisper model download fails, you can manually download it:
```python
import whisper
whisper.load_model("base")  # Downloads the model
```

## 🌐 SEO Features

This application includes comprehensive SEO best practices:

- ✅ **Metadata Tags** - Title, description, keywords
- ✅ **OpenGraph Tags** - For social media sharing
- ✅ **Twitter Cards** - Optimized for Twitter
- ✅ **Semantic HTML** - Proper HTML5 structure
- ✅ **Robots.txt** - Search engine crawler configuration
- ✅ **Sitemap.xml** - Page discovery for search engines
- ✅ **Server-Side Rendering** - Fast initial page loads
- ✅ **Responsive Design** - Mobile-friendly

## 🚀 Production Deployment

### Build the Frontend

```bash
cd frontend
npm run build
npm start
```

### Run Python Service in Production

For production, consider using:
- **gunicorn** for better performance
- **systemd** or **PM2** for process management
- **nginx** as a reverse proxy

Example with gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Environment Variables for Production

Update your `.env` file with production URLs:
```env
PYTHON_SERVICE_URL=https://your-domain.com/api
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🛠️ Tech Stack & Architecture

**Frontend**:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios

**Backend**:
- Flask (Python REST API)
- pytube (YouTube download)
- OpenAI Whisper (transcription)
- Flask-CORS

**AI/ML**:
- OpenAI Whisper (local model)
- PyTorch (Whisper dependency)

## 📝 License

This project is free to use and modify for personal and commercial purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 🎉 Credits

- **OpenAI Whisper** - For the amazing open-source transcription model
- **Next.js** - For the excellent React framework
- **Tailwind CSS** - For the utility-first CSS framework

---

**Made with ❤️ for free, offline transcription**

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.
