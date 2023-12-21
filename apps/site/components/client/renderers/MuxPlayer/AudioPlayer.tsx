import MuxPlayer from '@mux/mux-player-react'
import styles from './Player.module.css'

export function AudioPlayer({ playbackId }: { playbackId: string }) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      streamType="on-demand"
      autoPlay="false"
      audio
      className={styles.muxPlayer}
    />
  )
}
