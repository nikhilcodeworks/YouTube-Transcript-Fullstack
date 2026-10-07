from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import traceback
from downloader import download_youtube_audio
from transcriber import transcribe_audio

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend

@app.route('/transcribe', methods=['POST'])
def transcribe():
    try:
        data = request.get_json()
        
        if not data or 'url' not in data:
            return jsonify({'error': 'YouTube URL is required'}), 400
        
        youtube_url = data['url']
        
        # Step 1: Download audio from YouTube
        print(f"Downloading audio from: {youtube_url}")
        audio_path, video_title = download_youtube_audio(youtube_url)
        
        if not audio_path:
            return jsonify({'error': 'Failed to download audio from YouTube'}), 500
        
        # Step 2: Transcribe audio using Whisper
        print(f"Transcribing audio: {audio_path}")
        result = transcribe_audio(audio_path)
        
        # Step 3: Clean up audio file
        try:
            if os.path.exists(audio_path):
                os.remove(audio_path)
                print(f"Cleaned up: {audio_path}")
        except Exception as e:
            print(f"Failed to clean up {audio_path}: {e}")
        
        # Step 4: Return results
        return jsonify({
            'success': True,
            'video_title': video_title,
            'plain_transcript': result['plain_transcript'],
            'timestamped_transcript': result['timestamped_transcript'],
            'srt_content': result['srt_content']
        })
        
    except Exception as e:
        print(f"Error during transcription: {traceback.format_exc()}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'youtube-transcript-python'}), 200

if __name__ == '__main__':
    # Create temp directory if it doesn't exist
    os.makedirs('temp', exist_ok=True)
    
    print("=" * 60)
    print("YouTube Transcript Python Service")
    print("=" * 60)
    print("Starting Flask server on http://localhost:5000")
    print("Endpoints:")
    print("  POST /transcribe - Transcribe YouTube video")
    print("  GET  /health     - Health check")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
