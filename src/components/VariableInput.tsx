'use client';

import { useState, useEffect, useRef, memo } from 'react';

interface VariableInputProps {
  varName: string;
  value: string;
  onChange: (varName: string, value: string) => void;
}

function VariableInput({ varName, value, onChange }: VariableInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    // Debounce the onChange callback
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      onChange(varName, newValue);
    }, 300);
  };

  return (
    <div>
      <label
        htmlFor={`var-${varName}`}
        className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-1"
      >
        {varName}
      </label>
      <input
        id={`var-${varName}`}
        type="text"
        value={localValue}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder={`Enter value for ${varName}`}
      />
    </div>
  );
}

export default memo(VariableInput);
