'use client';

import { translations, Language } from '@/lib/translations';

interface EmptyStateProps {
  onCreateTab: () => void;
  language?: Language;
}

export default function EmptyState({ onCreateTab, language = 'en' }: EmptyStateProps) {
  const t = translations[language];
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {t.createFirstConfig}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t.getStarted}
        </p>
        <button
          onClick={onCreateTab}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label={t.createTab}
        >
          <svg
            className="w-5 h-5 mr-2"
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
          {t.createTab}
        </button>
      </div>
    </div>
  );
}
