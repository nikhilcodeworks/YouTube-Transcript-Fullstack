import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'YouTube to Transcript - Free AI Video Transcription',
    description: 'Convert any YouTube video to text transcript using AI-powered speech recognition. Fast, accurate, and 100% free. Download transcripts in TXT or SRT format.',
    keywords: ['youtube transcript', 'video to text', 'youtube subtitles', 'ai transcription', 'speech to text', 'free transcription'],
    authors: [{ name: 'YouTube Transcript' }],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'http://localhost:3000',
        title: 'YouTube to Transcript - Free AI Video Transcription',
        description: 'Convert any YouTube video to text transcript using AI-powered speech recognition. Fast, accurate, and 100% free.',
        siteName: 'YouTube to Transcript',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'YouTube to Transcript - Free AI Video Transcription',
        description: 'Convert any YouTube video to text transcript using AI-powered speech recognition.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    )
}
