import MuxPlayer from '@mux/mux-player-react'
import styles from './Player.module.css'

export function AudioPlayer({ playbackId }: { playbackId: string }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-lg px-30">
        <MuxPlayer
          playbackId={playbackId}
          streamType="on-demand"
          autoPlay={false}
          audio
          className={styles.muxPlayer}
          accent-color="#5D5E5D"
        />
      </div>
    </div>
  )
}
