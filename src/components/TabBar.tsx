'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import type { ConfigTab } from '@/hooks/useConfigTabs';

interface TabBarProps {
  tabs: ConfigTab[];
  activeTabId: string | null;
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
  onTabRename: (id: string, newName: string) => void;
  onNewTab: () => void;
}

export default function TabBar({
  tabs,
  activeTabId,
  onTabClick,
  onTabClose,
  onTabRename,
  onNewTab,
}: TabBarProps) {
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (editingTabId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingTabId]);

  const startEditing = (tab: ConfigTab) => {
    setEditingTabId(tab.id);
    setEditValue(tab.name);
  };

  const finishEditing = () => {
    if (editingTabId && editValue.trim()) {
      onTabRename(editingTabId, editValue.trim());
    }
    setEditingTabId(null);
    setEditValue('');
  };

  const cancelEditing = () => {
    setEditingTabId(null);
    setEditValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      finishEditing();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  const handleCloseTab = (e: React.MouseEvent, tab: ConfigTab) => {
    e.stopPropagation();

    // Check if tab has content
    const hasContent =
      tab.config.trim() !== '' ||
      Object.values(tab.variables).some((v) => v.trim() !== '') ||
      tab.output.trim() !== '';

    if (hasContent) {
      const confirmed = window.confirm(
        `Delete '${tab.name}'? This cannot be undone.`
      );
      if (!confirmed) return;
    }

    onTabClose(tab.id);
  };

  return (
    <div className="border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
      <div className="flex items-center overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`
              flex items-center px-4 py-3 cursor-pointer border-r border-gray-300 dark:border-gray-700 min-w-[120px] max-w-[200px]
              ${
                tab.id === activeTabId
                  ? 'bg-white dark:bg-gray-900 border-b-2 border-b-blue-500 font-semibold'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
            onClick={() => onTabClick(tab.id)}
          >
            {editingTabId === tab.id ? (
              <input
                ref={inputRef}
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={finishEditing}
                onKeyDown={handleKeyDown}
                maxLength={50}
                className="flex-1 px-1 py-0 text-sm bg-white dark:bg-gray-800 border border-blue-500 rounded focus:outline-none"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span
                className="flex-1 text-sm truncate"
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  startEditing(tab);
                }}
                title={tab.name}
              >
                {tab.name}
              </span>
            )}
            <button
              onClick={(e) => handleCloseTab(e, tab)}
              className="ml-2 p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label={`Close ${tab.name}`}
              title="Close tab"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
        <button
          onClick={onNewTab}
          className="px-4 py-3 text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Create new tab"
          title="New tab"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
