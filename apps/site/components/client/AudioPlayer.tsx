import MuxPlayer from '@mux/mux-player-react'

export function AudioPlayer({ playbackId }: { playbackId: string }) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      streamType="on-demand"
      audio
      primary-color="#111111"
      secondary-color="#ffffff" />
  )
}
