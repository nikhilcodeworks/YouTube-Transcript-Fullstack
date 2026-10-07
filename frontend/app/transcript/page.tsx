'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface TranscriptData {
    success: boolean
    video_title: string
    plain_transcript: string
    timestamped_transcript: Array<{
        start: number
        end: number
        text: string
    }>
    srt_content: string
}

export default function TranscriptPage() {
    const [transcriptData, setTranscriptData] = useState<TranscriptData | null>(null)
    const [activeTab, setActiveTab] = useState<'plain' | 'timestamped' | 'srt'>('plain')
    const router = useRouter()

    useEffect(() => {
        const data = sessionStorage.getItem('transcriptData')
        if (data) {
            setTranscriptData(JSON.parse(data))
        } else {
            router.push('/')
        }
    }, [router])

    const downloadFile = (content: string, filename: string, type: string) => {
        const blob = new Blob([content], { type })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const handleDownloadTXT = () => {
        if (transcriptData) {
            downloadFile(
                transcriptData.plain_transcript,
                `${transcriptData.video_title || 'transcript'}.txt`,
                'text/plain'
            )
        }
    }

    const handleDownloadSRT = () => {
        if (transcriptData) {
            downloadFile(
                transcriptData.srt_content,
                `${transcriptData.video_title || 'transcript'}.srt`,
                'text/plain'
            )
        }
    }

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    if (!transcriptData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.push('/')}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center mb-4"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </button>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        {transcriptData.video_title || 'Transcript'}
                    </h1>
                    <p className="text-gray-600">Your video has been transcribed successfully!</p>
                </div>

                {/* Download Buttons */}
                <div className="mb-6 flex flex-wrap gap-4">
                    <button
                        onClick={handleDownloadTXT}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download TXT
                    </button>
                    <button
                        onClick={handleDownloadSRT}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download SRT
                    </button>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-t-2xl shadow-lg border border-gray-100">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('plain')}
                            className={`px-6 py-4 font-medium transition-colors ${activeTab === 'plain'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Plain Transcript
                        </button>
                        <button
                            onClick={() => setActiveTab('timestamped')}
                            className={`px-6 py-4 font-medium transition-colors ${activeTab === 'timestamped'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Timestamped
                        </button>
                        <button
                            onClick={() => setActiveTab('srt')}
                            className={`px-6 py-4 font-medium transition-colors ${activeTab === 'srt'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            SRT Format
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {activeTab === 'plain' && (
                            <div className="prose max-w-none">
                                <pre className="whitespace-pre-wrap text-gray-800 font-sans leading-relaxed">
                                    {transcriptData.plain_transcript}
                                </pre>
                            </div>
                        )}

                        {activeTab === 'timestamped' && (
                            <div className="space-y-4">
                                {transcriptData.timestamped_transcript.map((segment, index) => (
                                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="text-blue-600 font-mono font-semibold whitespace-nowrap">
                                            {formatTime(segment.start)}
                                        </span>
                                        <p className="text-gray-800 flex-1">{segment.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'srt' && (
                            <div className="prose max-w-none">
                                <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm bg-gray-50 p-4 rounded-lg">
                                    {transcriptData.srt_content}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
