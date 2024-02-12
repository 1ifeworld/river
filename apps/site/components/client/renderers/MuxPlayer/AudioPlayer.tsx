import React, { useState, useRef } from "react"
import { Flex } from "@/design-system"
import MuxAudio from "@mux/mux-audio-react"
import styles from "./Player.module.css"

export function AudioPlayer({ playbackId }: { playbackId: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)

  // Toggle play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Format time to mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Event handler for time updates
  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (audio) {
      const progressValue = (audio.currentTime / audio.duration) * 100
      setCurrentTime(audio.currentTime)
      setProgress(progressValue) // Update progress state
    }
  }

  // Event handler to set the duration once the audio metadata is loaded
  const handleLoadedMetadata = () => {
    const audio = audioRef.current
    if (audio) {
      setDuration(audio.duration)
    }
  }

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement // Cast the event target to the specific element type
    const newTime = (target.valueAsNumber / 100) * duration
    if (audioRef.current) {
      // Check that audioRef.current is not null
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }
  return (
    <div className="flex h-full items-center justify-center w-full px-2 md:px-4">
      <button className="flex-shrink-0 p-2 active:bg-[#D9D9D9]" onClick={togglePlayPause}>
        {isPlaying ? (
          <img src={"/Pause.svg"} alt="Pause" className="w-6 h-6" />
        ) : (
          <img src={"/Play.svg"} alt="Play" className="w-6 h-6" />
        )}
      </button>
      <div className="flex-grow flex items-center justify-center">
        <span className={`text-xs md:text-sm ${styles.currentTime} px-1`}>{formatTime(currentTime)}</span>
        <input
          type="range"
          value={progress}
          onChange={handleProgressBarChange}
          className={`${styles.progressBar} mx-1`}
          style={{
            background: `linear-gradient(to right, #3A3A3A 0%, #3A3A3A ${progress}%, #D9D9D9 ${progress}%, #D9D9D9 100%)`,
          }}
        />
        <span className={`text-xs md:text-sm ${styles.totalTime} px-1`}>{formatTime(duration)}</span>
      </div>
      <MuxAudio
        ref={audioRef}
        playbackId={playbackId}
        autoplay
        streamType="on-demand"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  )
        }