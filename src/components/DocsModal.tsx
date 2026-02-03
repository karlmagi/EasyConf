'use client';

import { useEffect } from 'react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocsModal({ isOpen, onClose }: DocsModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            EasyConf Documentation
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close documentation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="prose dark:prose-invert max-w-none">
            {/* Quick Start */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Quick Start</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Paste your network configuration into the left panel</li>
                <li>Replace values with variables using <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-orange-600 font-semibold">{'{{ variableName }}'}</code> syntax</li>
                <li>Fill in the variable values on the right panel</li>
                <li>Click <span className="font-semibold text-blue-600">Generate Configuration</span></li>
                <li>Copy or download your customized configuration</li>
              </ol>
            </section>

            {/* Variables */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Working with Variables</h3>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Variable Syntax</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Variables use Jinja2-style syntax with double curly braces:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-2">
                  <code className="text-sm">
                    hostname <span className="text-orange-600 font-semibold">{'{{ hostname }}'}</span><br />
                    interface GigabitEthernet0/0/0<br />
                    &nbsp;&nbsp;ip address <span className="text-orange-600 font-semibold">{'{{ ipAddress }}'}</span> <span className="text-orange-600 font-semibold">{'{{ subnetMask }}'}</span>
                  </code>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Adding Variables</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Type <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-orange-600">{'{{ variableName }}'}</code> directly in your config</li>
                  <li>Or click the <span className="font-semibold text-blue-600">+ Add Variable</span> button and enter a name</li>
                  <li>Variables are auto-detected and shown in the right panel</li>
                  <li>Variable names can contain letters, numbers, and underscores</li>
                  <li>Variables are case-sensitive: <code>{'{{ Hostname }}'}</code> ≠ <code>{'{{ hostname }}'}</code></li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Variable Values</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Each detected variable gets its own input field</li>
                  <li>Leave a variable empty and it will remain as <code>{'{{ variableName }}'}</code> in output</li>
                  <li>A warning will show if any variables are undefined</li>
                  <li>Variable values are saved automatically with your tab</li>
                </ul>
              </div>
            </section>

            {/* Tab Management */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Managing Tabs</h3>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Creating Tabs</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Click the <span className="font-semibold">+</span> button in the tab bar</li>
                  <li>New tabs are named automatically (Config 1, Config 2, etc.)</li>
                  <li>Each tab stores its own config, variables, and output independently</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Renaming Tabs</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Double-click a tab name to edit it</li>
                  <li>Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">Enter</kbd> to save or <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">Esc</kbd> to cancel</li>
                  <li>Tab names can be up to 50 characters long</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Closing Tabs</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Click the <span className="font-semibold">×</span> button on a tab</li>
                  <li>You'll be asked to confirm if the tab contains any content</li>
                  <li>Closed tabs cannot be recovered - make sure to save important configs!</li>
                </ul>
              </div>
            </section>

            {/* Syntax Highlighting */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Syntax Highlighting</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Choose a syntax mode from the dropdown above the configuration editor:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li><span className="font-semibold">No Highlighting</span> - Plain text (fastest)</li>
                <li><span className="font-semibold">Bash</span> - For shell scripts and Linux configurations</li>
                <li><span className="font-semibold">Cisco IOS</span> - For Cisco routers and switches</li>
                <li><span className="font-semibold">Juniper SRX</span> - For Juniper firewalls and routers</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Variables are always highlighted in <span className="text-orange-600 font-semibold">bright orange</span> regardless of syntax mode.
              </p>
            </section>

            {/* Output Configuration */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Generating Output</h3>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Generate Button</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Click <span className="font-semibold text-blue-600">Generate Configuration</span> to process your template</li>
                  <li>All variables will be replaced with their values</li>
                  <li>Output appears in the text area below the button</li>
                  <li>Output is read-only but you can copy from it</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Line Spacing</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Use the slider to insert blank lines for readability</li>
                  <li>Range: Insert a blank line every 1-20 lines (default: 5)</li>
                  <li>Changes apply instantly to the output</li>
                  <li>Each tab remembers its own spacing preference</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Downloading Output</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Enter a filename in the text field (e.g., <code>router-config.txt</code>)</li>
                  <li>Click the <span className="font-semibold text-green-600">Download</span> button</li>
                  <li>Your configuration will be saved as a text file</li>
                  <li>Or use <span className="font-semibold">Copy to Clipboard</span> for quick copying</li>
                </ul>
              </div>
            </section>

            {/* Serial Console */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Serial Console</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Connect directly to network devices via serial port from your browser:
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Getting Started</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Click the <span className="font-semibold text-purple-600">Console</span> button in the top right</li>
                  <li>Select your baud rate (default: 9600, typical values: 9600, 19200, 38400, 57600, 115200)</li>
                  <li>Click <span className="font-semibold text-green-600">Connect</span></li>
                  <li>Your browser will ask you to select a serial port</li>
                  <li>Choose your USB-to-serial adapter or device</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Using the Console</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Type commands in the input field and press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">Enter</kbd></li>
                  <li>Device output appears in the terminal window</li>
                  <li>Your generated config can be pasted automatically when connecting</li>
                  <li>Click <span className="font-semibold">Clear</span> to clear the output</li>
                  <li>Click <span className="font-semibold text-red-600">Disconnect</span> when done</li>
                </ul>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <span className="font-semibold">Browser Compatibility:</span> Serial console requires Chrome, Edge, or Opera browser. Not available in Firefox or Safari.
                </p>
              </div>
            </section>

            {/* Data Storage */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Data Storage & Privacy</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>All data is stored <span className="font-semibold">locally in your browser</span></li>
                <li>Nothing is sent to any server - 100% private</li>
                <li>Your tabs, configs, and variables persist across sessions</li>
                <li>Clearing browser data will delete all saved configurations</li>
                <li>Works completely offline after initial page load</li>
              </ul>
            </section>

            {/* Keyboard Shortcuts */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Keyboard Shortcuts</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <table className="w-full text-sm">
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2 pr-4"><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Tab</kbd></td>
                      <td className="py-2">Navigate between fields</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2 pr-4"><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Double-click</kbd></td>
                      <td className="py-2">Rename tab</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2 pr-4"><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Enter</kbd></td>
                      <td className="py-2">Save tab name / Send console command</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2 pr-4"><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Esc</kbd></td>
                      <td className="py-2">Cancel tab rename / Close modals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Tips & Tricks */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Tips & Tricks</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><span className="font-semibold">Use descriptive variable names</span> - <code>{'{{ router1Hostname }}'}</code> is clearer than <code>{'{{ h1 }}'}</code></li>
                <li><span className="font-semibold">Create tab templates</span> - Make tabs for different device types (routers, switches, firewalls)</li>
                <li><span className="font-semibold">Keep backups</span> - Download important configs regularly</li>
                <li><span className="font-semibold">Use multiple tabs</span> - Compare different configurations side by side</li>
                <li><span className="font-semibold">Test before deploying</span> - Always review generated output before applying to devices</li>
              </ul>
            </section>

            {/* Troubleshooting */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Troubleshooting</h3>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Variables not detected?</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Make sure you're using double curly braces: <code>{'{{ }}'}</code></li>
                  <li>Variable names can only contain letters, numbers, and underscores</li>
                  <li>No spaces in variable names: use <code>{'{{ my_variable }}'}</code> not <code>{'{{ my variable }}'}</code></li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Serial console not working?</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Ensure you're using Chrome, Edge, or Opera (not Firefox/Safari)</li>
                  <li>Check that your serial adapter drivers are installed</li>
                  <li>Verify the baud rate matches your device settings</li>
                  <li>Try unplugging and reconnecting your serial adapter</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Lost your data?</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Check if you cleared browser data or cookies</li>
                  <li>Make sure you're using the same browser and device</li>
                  <li>Private/Incognito mode doesn't save data between sessions</li>
                </ul>
              </div>
            </section>

            {/* Footer */}
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm pt-6 border-t border-gray-300 dark:border-gray-700">
              <p>Vibecoded by karlmagi</p>
              <p className="mt-2">EasyConf - Network Configuration Tool</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
