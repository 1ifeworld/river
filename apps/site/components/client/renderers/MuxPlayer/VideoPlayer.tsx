import MuxPlayer from '@mux/mux-player-react'
import styles from './Player.module.css'

export function VideoPlayer({ playbackId }: { playbackId: string }) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      streamType="on-demand"
      autoPlay="false"
      className={styles.muxPlayer}
      accentColor="#5D5E5D"
    />
  )
}
