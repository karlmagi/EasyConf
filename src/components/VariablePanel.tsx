'use client';

import { useState, useEffect, useMemo } from 'react';
import { extractVariables, replaceVariables, applyLineSpacing } from '@/lib/templateParser';
import VariableInput from './VariableInput';

interface VariablePanelProps {
  config: string;
  variables: Record<string, string>;
  output: string;
  lineSpacing: number;
  filename: string;
  onVariablesChange: (variables: Record<string, string>) => void;
  onLineSpacingChange: (spacing: number) => void;
  onGenerate: (output: string) => void;
  onFilenameChange: (filename: string) => void;
}

export default function VariablePanel({
  config,
  variables,
  output,
  lineSpacing,
  filename,
  onVariablesChange,
  onLineSpacingChange,
  onGenerate,
  onFilenameChange,
}: VariablePanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [detectedVars, setDetectedVars] = useState<string[]>([]);

  // Detect variables from config (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const vars = extractVariables(config);
      setDetectedVars(vars);
    }, 500);

    return () => clearTimeout(timer);
  }, [config]);

  // Calculate undefined variables
  const undefinedVars = useMemo(() => {
    return detectedVars.filter((v) => !variables[v] || variables[v].trim() === '');
  }, [detectedVars, variables]);

  const handleVariableChange = (varName: string, value: string) => {
    onVariablesChange({
      ...variables,
      [varName]: value,
    });
  };

  const handleGenerate = async () => {
    if (!config.trim()) return;

    setIsGenerating(true);

    // Simulate processing time for large configs
    if (config.length > 100000) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const { output: replacedOutput } = replaceVariables(config, variables);
    const finalOutput = applyLineSpacing(replacedOutput, lineSpacing);

    onGenerate(finalOutput);
    setIsGenerating(false);
  };

  // Update output when line spacing changes
  useEffect(() => {
    if (output) {
      // Re-apply line spacing to existing output
      const { output: replacedOutput } = replaceVariables(config, variables);
      const finalOutput = applyLineSpacing(replacedOutput, lineSpacing);
      onGenerate(finalOutput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineSpacing]);

  const canGenerate = config.trim() !== '';

  const handleDownload = () => {
    if (!output) return;

    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'config.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col p-4 bg-white dark:bg-gray-900">
      {/* Variables Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Variables
          </h2>
          <div className="group relative">
            <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
              Variables are auto-detected from your config. Type {`{{ name }}`} in the editor to create them.
            </div>
          </div>
        </div>
        {detectedVars.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            No variables detected. Use {`{{ variableName }}`} in your configuration.
          </p>
        ) : (
          <div className="space-y-3">
            {detectedVars.map((varName) => (
              <VariableInput
                key={varName}
                varName={varName}
                value={variables[varName] || ''}
                onChange={handleVariableChange}
              />
            ))}
          </div>
        )}
      </div>

      {/* Line Spacing Slider */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <label
            htmlFor="line-spacing"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Insert blank line every {lineSpacing} lines
          </label>
          <div className="group relative">
            <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
              Adds blank lines to your output for better readability. Changes apply instantly!
            </div>
          </div>
        </div>
        <input
          id="line-spacing"
          type="range"
          min="1"
          max="20"
          value={lineSpacing}
          onChange={(e) => onLineSpacingChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>1</span>
          <span>10</span>
          <span>20</span>
        </div>
      </div>

      {/* Warning for undefined variables */}
      {undefinedVars.length > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                Warning: The following variables are undefined:
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                {undefinedVars.map((v) => `{{ ${v} }}`).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!canGenerate || isGenerating}
        className={`
          w-full py-3 px-4 rounded-lg font-semibold text-white shadow-md transition-colors mb-4
          ${
            canGenerate && !isGenerating
              ? 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500'
              : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
          }
        `}
        aria-label="Generate configuration"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generating...
          </span>
        ) : (
          'Generate Configuration'
        )}
      </button>

      {/* Output Section */}
      <div className="flex-1 flex flex-col min-h-0">
        <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Generated Output
        </h2>
        <div className="flex-1 relative">
          <textarea
            value={output}
            readOnly
            placeholder="Click Generate to see output"
            className="absolute inset-0 w-full h-full p-3 font-mono text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
            spellCheck={false}
          />
        </div>
        {output && (
          <div className="mt-2 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={filename}
                onChange={(e) => onFilenameChange(e.target.value)}
                placeholder="filename.txt"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleDownload}
                className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Download
              </button>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="w-full px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
