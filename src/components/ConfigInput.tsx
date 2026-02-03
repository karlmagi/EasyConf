'use client';

import { useState, useEffect, useRef } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/themes/prism.css';

// Custom language definitions for network devices
const ciscoLanguage = {
  'variable': /\{\{\s*\w+\s*\}\}/,
  'comment': /!.*/,
  'string': /"(?:\\.|[^\\"\r\n])*"/,
  'keyword': /\b(?:interface|router|ip|ipv6|access-list|route-map|policy-map|class-map|service-policy|vlan|switchport|spanning-tree|hostname|enable|line|aaa|crypto|tunnel|permit|deny|shutdown|no|exit|end)\b/,
  'number': /\b\d+(?:\.\d+)*\b/,
  'operator': /[=!<>]+/,
  'punctuation': /[{}[\];(),.:]/
};

const juniperLanguage = {
  'variable': /\{\{\s*\w+\s*\}\}/,
  'comment': /(#|\/\*[\s\S]*?\*\/)/,
  'string': /"(?:\\.|[^\\"\r\n])*"/,
  'keyword': /\b(?:set|delete|edit|top|up|show|commit|rollback|interfaces|protocols|routing-options|policy-options|firewall|security|zones|policies|nat|ike|ipsec|system|groups|apply-groups)\b/,
  'number': /\b\d+(?:\.\d+)*\b/,
  'operator': /[=!<>]+/,
  'punctuation': /[{}[\];(),.:]/
};

const bashLanguageExtended = {
  ...languages.bash,
  'variable': /\{\{\s*\w+\s*\}\}/,
};

languages.cisco = ciscoLanguage;
languages.juniper = juniperLanguage;
languages.bashExtended = bashLanguageExtended;

interface ConfigInputProps {
  value: string;
  syntax: 'bash' | 'cisco' | 'juniper' | 'none';
  onChange: (value: string) => void;
  onSyntaxChange: (syntax: 'bash' | 'cisco' | 'juniper' | 'none') => void;
}

export default function ConfigInput({ value, syntax, onChange, onSyntaxChange }: ConfigInputProps) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const editorRef = useRef<HTMLDivElement>(null);
  const isTypingRef = useRef(false);

  const handleAddVariable = () => {
    const varName = prompt('Enter variable name:');
    if (!varName || !varName.trim()) return;

    const cleanVarName = varName.trim().replace(/\s+/g, '_');
    const variableText = `{{ ${cleanVarName} }}`;

    const newValue = value + variableText;
    onChange(newValue);
  };

  const getHighlighter = () => {
    if (syntax === 'none') {
      return (code: string) => code;
    }
    const lang = syntax === 'bash' ? languages.bashExtended :
                 syntax === 'cisco' ? languages.cisco :
                 syntax === 'juniper' ? languages.juniper :
                 languages.bashExtended;

    return (code: string) => highlight(code, lang, syntax);
  };

  return (
    <div className="h-full flex flex-col p-4 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Configuration Template
          </h2>
          <div className="group relative">
            <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <div className="absolute left-0 top-full mt-2 hidden group-hover:block w-72 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
              Paste your config here. Replace values with variables like {`{{ hostname }}`} - they show in <span className="text-orange-400 font-semibold">orange</span>.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={syntax}
            onChange={(e) => onSyntaxChange(e.target.value as any)}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Choose syntax highlighting mode"
          >
            <option value="none">No Highlighting</option>
            <option value="bash">Bash</option>
            <option value="cisco">Cisco IOS</option>
            <option value="juniper">Juniper SRX</option>
          </select>
          <button
            onClick={handleAddVariable}
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Add variable at cursor position - saves typing {{ }}"
          >
            + Add Variable
          </button>
        </div>
      </div>
      <div ref={editorRef} className="flex-1 overflow-auto border border-gray-300 dark:border-gray-700 rounded-lg">
        <style>{`
          .token.variable {
            color: #ff6600 !important;
            font-weight: 600;
          }
        `}</style>
        <Editor
          value={value}
          onValueChange={(code) => {
            isTypingRef.current = true;
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
              onChange(code);
              isTypingRef.current = false;
            }, 150);
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
