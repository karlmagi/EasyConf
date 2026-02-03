'use client';

import { useConfigTabs } from '@/hooks/useConfigTabs';
import TabBar from '@/components/TabBar';
import ConfigInput from '@/components/ConfigInput';
import VariablePanel from '@/components/VariablePanel';
import EmptyState from '@/components/EmptyState';

export default function Home() {
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
  } = useConfigTabs();

  // If no tabs, show empty state
  if (tabs.length === 0) {
    return <EmptyState onCreateTab={createTab} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 relative">
      {/* Tab Bar */}
      <TabBar
        tabs={tabs}
        activeTabId={activeTab?.id || null}
        onTabClick={setActiveTab}
        onTabClose={deleteTab}
        onTabRename={renameTab}
        onNewTab={createTab}
      />

      {/* Main Content Area */}
      {activeTab && (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Configuration Input */}
          <div className="w-1/2 border-r border-gray-300 dark:border-gray-700 overflow-auto">
            <ConfigInput
              value={activeTab.config}
              onChange={(config) => updateTabConfig(activeTab.id, config)}
            />
          </div>

          {/* Right Panel - Variables and Output */}
          <div className="w-1/2 overflow-auto">
            <VariablePanel
              config={activeTab.config}
              variables={activeTab.variables}
              output={activeTab.output}
              lineSpacing={activeTab.lineSpacing}
              onVariablesChange={(variables) => updateTabVariables(activeTab.id, variables)}
              onLineSpacingChange={(spacing) => updateLineSpacing(activeTab.id, spacing)}
              onGenerate={(output) => updateTabOutput(activeTab.id, output)}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="fixed bottom-0 right-0 p-2 text-xs text-gray-600 dark:text-gray-400">
        Vibecoded by karlmagi
      </div>
    </div>
  );
}
