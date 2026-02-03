'use client';

import { useState } from 'react';
import { useConfigTabs } from '@/hooks/useConfigTabs';
import TabBar from '@/components/TabBar';
import ConfigInput from '@/components/ConfigInput';
import VariablePanel from '@/components/VariablePanel';
import EmptyState from '@/components/EmptyState';
import SerialConsole from '@/components/SerialConsole';

export default function Home() {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
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

      {/* Serial Console */}
      <SerialConsole
        isOpen={isConsoleOpen}
        onClose={() => setIsConsoleOpen(false)}
        initialText={activeTab?.output}
      />
    </div>
  );
}
