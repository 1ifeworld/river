import MuxPlayer from '@mux/mux-player-react'

export function VideoPlayer({playbackId}: {playbackId: string}) {
  return (
    <MuxPlayer
      // style={{ aspectRatio: 16/9 }}
      playbackId={playbackId}
      metadata={{ player_name: 'with-mux-video' }}
      autoPlay="false"
    />    
  );
}