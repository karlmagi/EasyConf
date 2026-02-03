'use client';

import { useState, useEffect, useRef } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/themes/prism.css';

// Custom language definitions for network devices
const ciscoLanguage = {
  'comment': /!.*/,
  'string': /"(?:\\.|[^\\"\r\n])*"/,
  'keyword': /\b(?:interface|router|ip|ipv6|access-list|route-map|policy-map|class-map|service-policy|vlan|switchport|spanning-tree|hostname|enable|line|aaa|crypto|tunnel|permit|deny|shutdown|no|exit|end)\b/,
  'number': /\b\d+(?:\.\d+)*\b/,
  'operator': /[=!<>]+/,
  'punctuation': /[{}[\];(),.:]/
};

const juniperLanguage = {
  'comment': /(#|\/\*[\s\S]*?\*\/)/,
  'string': /"(?:\\.|[^\\"\r\n])*"/,
  'keyword': /\b(?:set|delete|edit|top|up|show|commit|rollback|interfaces|protocols|routing-options|policy-options|firewall|security|zones|policies|nat|ike|ipsec|system|groups|apply-groups)\b/,
  'number': /\b\d+(?:\.\d+)*\b/,
  'operator': /[=!<>]+/,
  'punctuation': /[{}[\];(),.:]/
};

languages.cisco = ciscoLanguage;
languages.juniper = juniperLanguage;

interface ConfigInputProps {
  value: string;
  syntax: 'bash' | 'cisco' | 'juniper' | 'none';
  onChange: (value: string) => void;
  onSyntaxChange: (syntax: 'bash' | 'cisco' | 'juniper' | 'none') => void;
}

export default function ConfigInput({ value, syntax, onChange, onSyntaxChange }: ConfigInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const editorRef = useRef<HTMLDivElement>(null);

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

  const handleAddVariable = () => {
    const varName = prompt('Enter variable name:');
    if (!varName || !varName.trim()) return;

    const cleanVarName = varName.trim().replace(/\s+/g, '_');
    const variableText = `{{ ${cleanVarName} }}`;

    // Get current selection from editor
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const newValue = localValue + variableText;
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  const getHighlighter = () => {
    if (syntax === 'none') {
      return (code: string) => code;
    }
    const lang = syntax === 'bash' ? languages.bash :
                 syntax === 'cisco' ? languages.cisco :
                 syntax === 'juniper' ? languages.juniper :
                 languages.bash;

    return (code: string) => highlight(code, lang, syntax);
  };

  return (
    <div className="h-full flex flex-col p-4 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Configuration Template
        </h2>
        <div className="flex items-center gap-2">
          <select
            value={syntax}
            onChange={(e) => onSyntaxChange(e.target.value as any)}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">No Highlighting</option>
            <option value="bash">Bash</option>
            <option value="cisco">Cisco IOS</option>
            <option value="juniper">Juniper SRX</option>
          </select>
          <button
            onClick={handleAddVariable}
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Add variable at cursor position"
          >
            + Add Variable
          </button>
        </div>
      </div>
      <div ref={editorRef} className="flex-1 overflow-auto border border-gray-300 dark:border-gray-700 rounded-lg">
        <Editor
          value={localValue}
          onValueChange={(code) => {
            setLocalValue(code);
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
              onChange(code);
            }, 300);
          }}
          highlight={getHighlighter()}
          padding={12}
          placeholder={`Paste your network configuration here.

Use {{ variableName }} for values you want to replace.

Example:
hostname {{ hostname }}
interface GigabitEthernet0/0/0
 description {{ interfaceDesc }}
 ip address {{ ipAddress }} {{ subnetMask }}`}
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: 13,
            minHeight: '100%',
            backgroundColor: 'transparent',
          }}
          textareaClassName="focus:outline-none"
        />
      </div>
    </div>
  );
}
