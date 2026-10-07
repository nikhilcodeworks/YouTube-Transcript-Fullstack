import yt_dlp
import os
import uuid

def download_youtube_audio(youtube_url):
    """
    Download audio from YouTube video using yt-dlp.
    
    Args:
        youtube_url: YouTube video URL
        
    Returns:
        tuple: (audio_file_path, video_title) or (None, None) on failure
    """
    try:
        # Generate unique filename
        filename = f"{uuid.uuid4()}"
        output_path = os.path.join('temp', f"{filename}.%(ext)s")
        
        # Configure yt-dlp options
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': output_path,
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'quiet': False,
            'no_warnings': False,
        }
        
        # Download audio
        print(f"Downloading audio from: {youtube_url}")
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(youtube_url, download=True)
            video_title = info.get('title', 'Unknown Title')
            print(f"Video title: {video_title}")
        
        # The actual downloaded file path
        final_path = os.path.join('temp', f"{filename}.mp3")
        
        if os.path.exists(final_path):
            print(f"Audio downloaded successfully: {final_path}")
            return final_path, video_title
        else:
            print(f"Download completed but file not found at: {final_path}")
            return None, None
        
    except Exception as e:
        print(f"Error downloading YouTube audio: {e}")
        import traceback
        traceback.print_exc()
        return None, None
