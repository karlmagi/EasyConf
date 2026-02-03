'use client';

import { useState, useEffect } from 'react';
import { useConfigTabs } from '@/hooks/useConfigTabs';
import TabBar from '@/components/TabBar';
import ConfigInput from '@/components/ConfigInput';
import VariablePanel from '@/components/VariablePanel';
import EmptyState from '@/components/EmptyState';
import SerialConsole from '@/components/SerialConsole';
import DocsModal from '@/components/DocsModal';

export default function Home() {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  const {
    tabs,
    activeTab,
    createTab,
    deleteTab,
    renameTab,
    setActiveTab,
    updateTabConfig,
    updateTabVariables,
    updateTabOutput,
    updateLineSpacing,
    updateSyntax,
    updateFilename,
  } = useConfigTabs();

  // If no tabs, show empty state
  if (tabs.length === 0) {
    return <EmptyState onCreateTab={createTab} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 relative">
      {/* Tab Bar */}
      <div className="flex items-center border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <TabBar
          tabs={tabs}
          activeTabId={activeTab?.id || null}
          onTabClick={setActiveTab}
          onTabClose={deleteTab}
          onTabRename={renameTab}
          onNewTab={createTab}
        />
        <button
          onClick={toggleTheme}
          className="px-4 py-3 text-sm bg-gray-600 hover:bg-gray-700 text-white transition-colors flex items-center gap-2 border-l border-gray-300 dark:border-gray-700"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
          {isDarkMode ? 'Light' : 'Dark'}
        </button>
        <button
          onClick={() => setIsConsoleOpen(true)}
          className="px-4 py-3 text-sm bg-purple-600 hover:bg-purple-700 text-white transition-colors flex items-center gap-2 border-l border-gray-300 dark:border-gray-700"
          title="Open Serial Console"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Console
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab && (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Configuration Input */}
          <div className="w-1/2 border-r border-gray-300 dark:border-gray-700 overflow-auto">
            <ConfigInput
              value={activeTab.config}
              syntax={activeTab.syntax || 'none'}
              onChange={(config) => updateTabConfig(activeTab.id, config)}
              onSyntaxChange={(syntax) => updateSyntax(activeTab.id, syntax)}
            />
          </div>

          {/* Right Panel - Variables and Output */}
          <div className="w-1/2 overflow-auto">
            <VariablePanel
              config={activeTab.config}
              variables={activeTab.variables}
              output={activeTab.output}
              lineSpacing={activeTab.lineSpacing}
              filename={activeTab.filename || 'config.txt'}
              onVariablesChange={(variables) => updateTabVariables(activeTab.id, variables)}
              onLineSpacingChange={(spacing) => updateLineSpacing(activeTab.id, spacing)}
              onGenerate={(output) => updateTabOutput(activeTab.id, output)}
              onFilenameChange={(filename) => updateFilename(activeTab.id, filename)}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="fixed bottom-0 right-0 p-2 text-xs text-gray-600 dark:text-gray-400">
        Vibecoded by karlmagi
      </div>

      {/* Docs Button - Bottom Left */}
      <button
        onClick={() => setIsDocsOpen(true)}
        className="fixed bottom-4 left-4 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors flex items-center gap-2 z-40"
        title="Open Documentation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Docs
      </button>

      {/* Serial Console */}
      <SerialConsole
        isOpen={isConsoleOpen}
        onClose={() => setIsConsoleOpen(false)}
        initialText={activeTab?.output}
      />

      {/* Docs Modal */}
      <DocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />
    </div>
  );
}
