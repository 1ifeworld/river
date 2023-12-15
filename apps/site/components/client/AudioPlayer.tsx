import MuxPlayer from '@mux/mux-player-react'

export function AudioPlayer({ playbackId }: { playbackId: string }) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      audio
      primary-color="#111111"
      secondary-color="#ffffff"
      metadata={{ player_name: 'with-mux-video' }}
      autoPlay="false"
    />
  )
}
