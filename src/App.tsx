import React, { useState } from 'react';
import { RecordingControls } from './components/RecordingControls';
import { SourceSelector } from './components/SourceSelector';
import { VideoPreview } from './components/VideoPreview';
import { useRecorder } from './hooks/useRecorder';
import { SOURCE_TYPES } from './constants/recording';

function App() {
  const [selectedSource, setSelectedSource] = useState(SOURCE_TYPES.SCREEN);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [showSourceSelector, setShowSourceSelector] = useState(true);
  
  const {
    isRecording,
    isPaused,
    recordingTime,
    stream,
    startRecording,
    stopRecording,
    pauseRecording,
  } = useRecorder();

  const handleStart = async () => {
    await startRecording(selectedSource, audioEnabled, micEnabled);
    setShowSourceSelector(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {showSourceSelector ? (
        <SourceSelector
          onSourceSelect={setSelectedSource}
          selectedSource={selectedSource}
          audioEnabled={audioEnabled}
          micEnabled={micEnabled}
          onAudioToggle={() => setAudioEnabled(!audioEnabled)}
          onMicToggle={() => setMicEnabled(!micEnabled)}
        />
      ) : (
        <>
          <RecordingControls
            isRecording={isRecording}
            isPaused={isPaused}
            onStart={handleStart}
            onPause={pauseRecording}
            onStop={stopRecording}
            recordingTime={recordingTime}
          />
          <VideoPreview stream={stream} />
        </>
      )}
    </div>
  );
}