"use client"
import { FC, useEffect, useRef, useState } from 'react'
import VideoPlayerControlls from './VideoPlayerControlls'
interface VideoPlayerProps {

}

const VideoPlayer: FC<VideoPlayerProps> = ({ }) => {
    const [isPaused, setIsPaused] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [videoDuration, setVideoDuration] = useState<number | null>(null);
    const [videoProgress, setVideoProgress] = useState<number>(0);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            setVideoDuration(video.duration)
        }

    }, [])

    useEffect(() => {
        if (isPaused) return;

        const currentTime = videoRef.current?.currentTime;

        if (videoDuration != null && currentTime != null) {
            let loadingTimeout = setTimeout(() => {
                if (videoProgress == currentTime / videoDuration) {
                    setVideoProgress((prev) => prev + 0.000001);
                } else {
                    setVideoProgress(currentTime / videoDuration);
                }
            }, 1000);

            return () => {
                clearTimeout(loadingTimeout);
            };
        }
    }, [videoProgress, videoDuration, isPaused]);

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (video) {
            setIsPaused(prev => !prev)
            video.paused ? video.play() : video.pause()
        }
    }

    return (
        <main>
            <div className="relative w-[90%] max-w-6xl mx-auto my-8 rounded-xl overflow-hidden">
                <div className='absolute top-4 right-4 z-10'>
                    <VideoPlayerControlls progress={videoProgress} isPaused={isPaused} onPlayPause={togglePlayPause} />
                </div>
                <video
                    poster="/ai.jpg"
                    ref={videoRef}
                    className='w-full'
                    // loop
                    // autoPlay
                    // muted
                    src='/video.mp4'
                >
                </video>
            </div>
        </main>
    )
}

export default VideoPlayer