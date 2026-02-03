'use client';

interface ConfigInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ConfigInput({ value, onChange }: ConfigInputProps) {
  return (
    <div className="h-full flex flex-col p-4 bg-white dark:bg-gray-900">
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Configuration Template
      </h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
