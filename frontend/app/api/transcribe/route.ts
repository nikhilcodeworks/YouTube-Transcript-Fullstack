import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { url } = body

        if (!url) {
            return NextResponse.json(
                { error: 'YouTube URL is required' },
                { status: 400 }
            )
        }

        // Validate YouTube URL
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
        if (!youtubeRegex.test(url)) {
            return NextResponse.json(
                { error: 'Invalid YouTube URL' },
                { status: 400 }
            )
        }

        // Call Python service
        const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:5000'

        const response = await axios.post(
            `${pythonServiceUrl}/transcribe`,
            { url },
            {
                timeout: 300000, // 5 minutes timeout for long videos
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        return NextResponse.json(response.data)
    } catch (error: any) {
        console.error('Transcription error:', error)

        if (error.code === 'ECONNREFUSED') {
            return NextResponse.json(
                { error: 'Python service is not running. Please start the Python service first.' },
                { status: 503 }
            )
        }

        if (error.response) {
            return NextResponse.json(
                { error: error.response.data?.error || 'Transcription failed' },
                { status: error.response.status }
            )
        }

        return NextResponse.json(
            { error: 'An unexpected error occurred during transcription' },
            { status: 500 }
        )
    }
}
