'use client';

import { useState, useEffect, useRef } from 'react';

interface ConfigInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ConfigInput({ value, onChange }: ConfigInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  // Update local value when prop changes (e.g., switching tabs)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    // Debounce the onChange callback
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  };

  // Track cursor position
  const handleCursorChange = () => {
    if (textareaRef.current) {
      setCursorPosition(textareaRef.current.selectionStart);
    }
  };

  const handleAddVariable = () => {
    const varName = prompt('Enter variable name:');
    if (!varName || !varName.trim()) return;

    const cleanVarName = varName.trim().replace(/\s+/g, '_');
    const variableText = `{{ ${cleanVarName} }}`;

    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue =
        localValue.substring(0, start) +
        variableText +
        localValue.substring(end);

      setLocalValue(newValue);
      onChange(newValue);

      // Set cursor position after inserted variable
      setTimeout(() => {
        const newCursorPos = start + variableText.length;
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  };

  return (
    <div className="h-full flex flex-col p-4 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Configuration Template
        </h2>
        <button
          onClick={handleAddVariable}
          className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Add variable at cursor position"
        >
          + Add Variable
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={localValue}
        onChange={handleChange}
        onSelect={handleCursorChange}
        onClick={handleCursorChange}
        onKeyUp={handleCursorChange}
        placeholder={`Paste your network configuration here.

Use {{ variableName }} for values you want to replace.

Example:
hostname {{ hostname }}
interface GigabitEthernet0/0/0
 description {{ interfaceDesc }}
 ip address {{ ipAddress }} {{ subnetMask }}`}
        className="flex-1 w-full p-3 font-mono text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
        spellCheck={false}
      />
    </div>
  );
}
