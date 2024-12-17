import { useState, useCallback, useRef } from 'react';
import { useTimer } from './useTimer';
import { createRecordingFileName, getMimeType } from '../utils/recording';

interface RecorderState {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: string;
  mediaRecorder: MediaRecorder | null;
  stream: MediaStream | null;
}

export function useRecorder() {
  const [state, setState] = useState<RecorderState>({
    isRecording: false,
    isPaused: false,
    recordingTime: '00:00',
    mediaRecorder: null,
    stream: null,
  });

  const chunks = useRef<Blob[]>([]);
  
  const { startTimer, pauseTimer, resumeTimer, stopTimer } = useTimer(
    (formattedTime) => setState((prev) => ({ ...prev, recordingTime: formattedTime }))
  );

  const startRecording = useCallback(async (source: string, audioEnabled: boolean, micEnabled: boolean) => {
    try {
      const displayMediaOptions: DisplayMediaStreamOptions = {
        video: true,
        audio: audioEnabled,
      };

      const screenStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      let finalStream = screenStream;

      if (micEnabled) {
        const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioTracks = [...screenStream.getAudioTracks(), ...micStream.getAudioTracks()];
        finalStream = new MediaStream([...screenStream.getVideoTracks(), ...audioTracks]);
      }

      const recorder = new MediaRecorder(finalStream, {
        mimeType: getMimeType()
      });
      chunks.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: getMimeType() });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = createRecordingFileName();
        a.click();
        URL.revokeObjectURL(url);
      };

      recorder.start();
      startTimer();

      setState((prev) => ({
        ...prev,
        isRecording: true,
        isPaused: false,
        mediaRecorder: recorder,
        stream: finalStream,
      }));
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, [startTimer]);

  const stopRecording = useCallback(() => {
    if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
      state.mediaRecorder.stop();
      state.stream?.getTracks().forEach((track) => track.stop());
      stopTimer();
      setState((prev) => ({
        ...prev,
        isRecording: false,
        isPaused: false,
        recordingTime: '00:00',
        mediaRecorder: null,
        stream: null,
      }));
    }
  }, [state.mediaRecorder, state.stream, stopTimer]);

  const pauseRecording = useCallback(() => {
    if (state.mediaRecorder && state.mediaRecorder.state === 'recording') {
      state.mediaRecorder.pause();
      pauseTimer();
      setState((prev) => ({ ...prev, isPaused: true }));
    } else if (state.mediaRecorder && state.mediaRecorder.state === 'paused') {
      state.mediaRecorder.resume();
      resumeTimer();
      setState((prev) => ({ ...prev, isPaused: false }));
    }
  }, [state.mediaRecorder, pauseTimer, resumeTimer]);

  return {
    ...state,
    startRecording,
    stopRecording,
    pauseRecording,
  };
}