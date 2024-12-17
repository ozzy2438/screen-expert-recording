import React from 'react';

interface SourceButtonProps {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function SourceButton({ icon, label, isSelected, onClick }: SourceButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border-2 transition-colors ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-blue-200'
      }`}
    >
      {icon}
      <span className="block text-sm font-medium">{label}</span>
    </button>
  );
}