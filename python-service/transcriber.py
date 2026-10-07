import whisper
import os

# Load Whisper model (globally to avoid reloading)
WHISPER_MODEL = os.getenv('WHISPER_MODEL', 'base')
print(f"Loading Whisper model: {WHISPER_MODEL}")
model = whisper.load_model(WHISPER_MODEL)
print(f"Whisper model loaded successfully")

def format_timestamp_srt(seconds):
    """Convert seconds to SRT timestamp format (HH:MM:SS,mmm)"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

def transcribe_audio(audio_path):
    """
    Transcribe audio using OpenAI Whisper.
    
    Args:
        audio_path: Path to audio file
        
    Returns:
        dict: Dictionary containing plain_transcript, timestamped_transcript, and srt_content
    """
    try:
        # Transcribe using Whisper
        print("Starting Whisper transcription...")
        # Note: For Hindi audio, Whisper may output in Urdu script
        # To get English translation instead, use: task='translate'
        # To force a specific language: language='hi'
        result = model.transcribe(
            audio_path, 
            verbose=True,
            task='translate'  # Translates to English instead of transcribing in original language
        )
        
        # Extract plain transcript
        plain_transcript = result['text'].strip()
        
        # Extract timestamped segments
        timestamped_transcript = []
        for segment in result['segments']:
            timestamped_transcript.append({
                'start': segment['start'],
                'end': segment['end'],
                'text': segment['text'].strip()
            })
        
        # Generate SRT content
        srt_content = generate_srt(result['segments'])
        
        print("Transcription completed successfully")
        
        return {
            'plain_transcript': plain_transcript,
            'timestamped_transcript': timestamped_transcript,
            'srt_content': srt_content
        }
        
    except Exception as e:
        print(f"Error during transcription: {e}")
        raise e

def generate_srt(segments):
    """
    Generate SRT subtitle file content from Whisper segments.
    
    Args:
        segments: List of Whisper segments
        
    Returns:
        str: SRT formatted subtitle content
    """
    srt_lines = []
    
    for i, segment in enumerate(segments, start=1):
        start_time = format_timestamp_srt(segment['start'])
        end_time = format_timestamp_srt(segment['end'])
        text = segment['text'].strip()
        
        srt_lines.append(f"{i}")
        srt_lines.append(f"{start_time} --> {end_time}")
        srt_lines.append(text)
        srt_lines.append("")  # Empty line between entries
    
    return "\n".join(srt_lines)
