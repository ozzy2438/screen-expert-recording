import React from 'react';
import { Icons } from './icons';

interface RecordingControlsProps {
  isRecording: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  recordingTime: string;
}

export function RecordingControls({
  isRecording,
  isPaused,
  onStart,
  onPause,
  onStop,
  recordingTime,
}: RecordingControlsProps) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-3 flex items-center space-x-6">
      {isRecording ? (
        <>
          <button
            onClick={onPause}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isPaused ? (
              <Icons.Play className="w-6 h-6 text-blue-600" />
            ) : (
              <Icons.Pause className="w-6 h-6 text-blue-600" />
            )}
          </button>
          <div className="px-4 py-1 bg-red-50 rounded-full">
            <span className="text-red-600 font-medium">{recordingTime}</span>
          </div>
          <button
            onClick={onStop}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Icons.Square className="w-6 h-6 text-red-600 fill-current" />
          </button>
        </>
      ) : (
        <button
          onClick={onStart}
          className="p-3 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Icons.Play className="w-6 h-6 text-blue-600" />
        </button>
      )}
    </div>
  );
}