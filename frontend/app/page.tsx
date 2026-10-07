'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function Home() {
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const validateYouTubeUrl = (url: string): boolean => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
        return youtubeRegex.test(url)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!url.trim()) {
            setError('Please enter a YouTube URL')
            return
        }

        if (!validateYouTubeUrl(url)) {
            setError('Please enter a valid YouTube URL')
            return
        }

        setLoading(true)

        try {
            const response = await axios.post('/api/transcribe', { url })

            // Store the transcript data in sessionStorage for the transcript page
            sessionStorage.setItem('transcriptData', JSON.stringify(response.data))

            // Navigate to transcript page
            router.push('/transcript')
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to transcribe video. Please try again.')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        YouTube to Transcript
                    </h1>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                        Convert any YouTube video to text using AI-powered transcription.
                        <span className="font-semibold text-blue-600"> 100% free and offline.</span>
                    </p>
                </div>

                {/* Main Card */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="youtube-url" className="block text-sm font-semibold text-gray-700 mb-2">
                                    YouTube Video URL
                                </label>
                                <input
                                    id="youtube-url"
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900"
                                    disabled={loading}
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Transcribing...
                                    </span>
                                ) : (
                                    'Generate Transcript'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Features */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <div className="text-3xl mb-3">🚀</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Fast & Accurate</h3>
                            <p className="text-gray-600 text-sm">Powered by OpenAI Whisper for high-quality transcription</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <div className="text-3xl mb-3">💯</div>
                            <h3 className="font-semibold text-gray-900 mb-2">100% Free</h3>
                            <p className="text-gray-600 text-sm">No API costs, no subscriptions, completely free to use</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <div className="text-3xl mb-3">🔒</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Privacy First</h3>
                            <p className="text-gray-600 text-sm">All processing happens locally on your machine</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
