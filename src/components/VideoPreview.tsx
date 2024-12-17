import React from 'react';

interface VideoPreviewProps {
  stream: MediaStream | null;
}

export function VideoPreview({ stream }: VideoPreviewProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) return null;

  return (
    <div className="fixed bottom-24 right-8 w-64 rounded-lg overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full h-full object-cover"
      />
    </div>
  );
}