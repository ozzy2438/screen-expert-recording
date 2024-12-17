import React from 'react';
import { Icons } from './icons';
import { Toggle } from './Toggle';
import { SourceButton } from './SourceButton';

interface SourceSelectorProps {
  onSourceSelect: (source: string) => void;
  selectedSource: string;
  audioEnabled: boolean;
  micEnabled: boolean;
  onAudioToggle: () => void;
  onMicToggle: () => void;
}

export function SourceSelector({
  onSourceSelect,
  selectedSource,
  audioEnabled,
  micEnabled,
  onAudioToggle,
  onMicToggle,
}: SourceSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">Choose what to share</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <SourceButton
          icon={<Icons.Monitor className="w-8 h-8 mb-2 mx-auto text-gray-700" />}
          label="Entire Screen"
          isSelected={selectedSource === 'screen'}
          onClick={() => onSourceSelect('screen')}
        />
        
        <SourceButton
          icon={<Icons.Window className="w-8 h-8 mb-2 mx-auto text-gray-700" />}
          label="Application Window"
          isSelected={selectedSource === 'window'}
          onClick={() => onSourceSelect('window')}
        />
      </div>

      <div className="space-y-4">
        <Toggle
          icon={<Icons.Volume2 className="w-5 h-5 text-gray-700" />}
          label="System Audio"
          enabled={audioEnabled}
          onToggle={onAudioToggle}
        />

        <Toggle
          icon={<Icons.Mic className="w-5 h-5 text-gray-700" />}
          label="Microphone"
          enabled={micEnabled}
          onToggle={onMicToggle}
        />
      </div>
    </div>
  );
}