'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface ConfigTab {
  id: string;
  name: string;
  config: string;
  variables: Record<string, string>;
  output: string;
  lineSpacing: number;
}

interface TabsState {
  tabs: ConfigTab[];
  activeTabId: string | null;
  nextNumber: number; // Track next tab number for auto-naming
}

const STORAGE_KEY = 'networkConfigTool';
const DEBOUNCE_DELAY = 300; // ms for text changes
const INITIAL_STATE: TabsState = {
  tabs: [],
  activeTabId: null,
  nextNumber: 1,
};

export function useConfigTabs() {
  const [state, setState] = useLocalStorage<TabsState>(STORAGE_KEY, INITIAL_STATE);
  const debounceTimers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  // Initialize with one default tab if empty
  useEffect(() => {
    if (state.tabs.length === 0) {
      const defaultTab: ConfigTab = {
        id: crypto.randomUUID(),
        name: 'Config 1',
        config: '',
        variables: {},
        output: '',
        lineSpacing: 5,
      };
      setState({
        tabs: [defaultTab],
        activeTabId: defaultTab.id,
        nextNumber: 2,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compute activeTab directly from state instead of using effect
  const activeTab = state.tabs.find((t) => t.id === state.activeTabId) || null;

  // Debounced save for text changes
  const debouncedSave = useCallback((key: string, callback: () => void) => {
    if (debounceTimers.current[key]) {
      clearTimeout(debounceTimers.current[key]);
    }
    debounceTimers.current[key] = setTimeout(() => {
      callback();
      delete debounceTimers.current[key];
    }, DEBOUNCE_DELAY);
  }, []);

  // Immediate save (no debounce)
  const immediateSave = useCallback((newState: TabsState) => {
    setState(newState);
  }, [setState]);

  const createTab = useCallback(() => {
    const newTab: ConfigTab = {
      id: crypto.randomUUID(),
      name: `Config ${state.nextNumber}`,
      config: '',
      variables: {},
      output: '',
      lineSpacing: 5,
    };

    const newState: TabsState = {
      tabs: [...state.tabs, newTab],
      activeTabId: newTab.id,
      nextNumber: state.nextNumber + 1,
    };

    immediateSave(newState);
    return newTab.id;
  }, [state, immediateSave]);

  const deleteTab = useCallback((id: string) => {
    const tabIndex = state.tabs.findIndex((t) => t.id === id);
    if (tabIndex === -1) return;

    const newTabs = state.tabs.filter((t) => t.id !== id);

    // Determine next active tab
    let newActiveId: string | null = null;
    if (newTabs.length > 0) {
      // Try next tab, or previous if deleted was last
      if (tabIndex < newTabs.length) {
        newActiveId = newTabs[tabIndex].id;
      } else {
        newActiveId = newTabs[newTabs.length - 1].id;
      }
    }

    // Reset nextNumber to 1 if all tabs deleted
    const newState: TabsState = {
      tabs: newTabs,
      activeTabId: newActiveId,
      nextNumber: newTabs.length === 0 ? 1 : state.nextNumber,
    };

    immediateSave(newState);
  }, [state, immediateSave]);

  const renameTab = useCallback((id: string, newName: string) => {
    const newTabs = state.tabs.map((tab) =>
      tab.id === id ? { ...tab, name: newName.slice(0, 50) } : tab
    );

    immediateSave({
      ...state,
      tabs: newTabs,
    });
  }, [state, immediateSave]);

  const setActiveTabById = useCallback((id: string) => {
    if (state.tabs.find((t) => t.id === id)) {
      immediateSave({
        ...state,
        activeTabId: id,
      });
    }
  }, [state, immediateSave]);

  const updateTabConfig = useCallback((id: string, config: string) => {
    debouncedSave(`config-${id}`, () => {
      setState((prev) => ({
        ...prev,
        tabs: prev.tabs.map((tab) =>
          tab.id === id ? { ...tab, config } : tab
        ),
      }));
    });
  }, [debouncedSave, setState]);

  const updateTabVariables = useCallback((id: string, variables: Record<string, string>) => {
    debouncedSave(`variables-${id}`, () => {
      setState((prev) => ({
        ...prev,
        tabs: prev.tabs.map((tab) =>
          tab.id === id ? { ...tab, variables } : tab
        ),
      }));
    });
  }, [debouncedSave, setState]);

  const updateTabOutput = useCallback((id: string, output: string) => {
    const newTabs = state.tabs.map((tab) =>
      tab.id === id ? { ...tab, output } : tab
    );

    immediateSave({
      ...state,
      tabs: newTabs,
    });
  }, [state, immediateSave]);

  const updateLineSpacing = useCallback((id: string, lineSpacing: number) => {
    const newTabs = state.tabs.map((tab) =>
      tab.id === id ? { ...tab, lineSpacing } : tab
    );

    immediateSave({
      ...state,
      tabs: newTabs,
    });
  }, [state, immediateSave]);

  return {
    tabs: state.tabs,
    activeTab,
    createTab,
    deleteTab,
    renameTab,
    setActiveTab: setActiveTabById,
    updateTabConfig,
    updateTabVariables,
    updateTabOutput,
    updateLineSpacing,
  };
}
