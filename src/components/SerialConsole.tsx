'use client';

import { useState, useEffect, useRef } from 'react';

// Web Serial API types
interface SerialPort {
  open(options: { baudRate: number }): Promise<void>;
  close(): Promise<void>;
  readable: ReadableStream | null;
  writable: WritableStream | null;
}

interface SerialConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  initialText?: string;
}

export default function SerialConsole({ isOpen, onClose, initialText }: SerialConsoleProps) {
  const [output, setOutput] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [baudRate, setBaudRate] = useState(9600);
  const [status, setStatus] = useState('Disconnected');

  const portRef = useRef<SerialPort | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader | null>(null);
  const writerRef = useRef<WritableStreamDefaultWriter | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Paste initial text when provided
  useEffect(() => {
    if (initialText && isConnected) {
      sendData(initialText);
    }
  }, [initialText, isConnected]);

  const BAUD_RATES = [9600, 19200, 38400, 57600, 115200];

  const connectSerial = async () => {
    try {
      // Check if Web Serial API is supported
      if (!('serial' in navigator)) {
        addOutput('ERROR: Web Serial API not supported in this browser. Use Chrome, Edge, or Opera.');
        return;
      }

      setStatus('Requesting port...');
      const port = await (navigator as any).serial.requestPort();
      portRef.current = port;

      setStatus(`Connecting at ${baudRate} baud...`);
      await port.open({ baudRate });

      setIsConnected(true);
      setStatus(`Connected at ${baudRate} baud`);
      addOutput(`Connected to serial port at ${baudRate} baud`);

      // Start reading
      startReading();
    } catch (error: any) {
      setStatus('Connection failed');
      addOutput(`Error: ${error.message}`);
      console.error('Serial connection error:', error);
    }
  };

  const disconnectSerial = async () => {
    try {
      if (readerRef.current) {
        await readerRef.current.cancel();
        readerRef.current = null;
      }

      if (writerRef.current) {
        await writerRef.current.close();
        writerRef.current = null;
      }

      if (portRef.current) {
        await portRef.current.close();
        portRef.current = null;
      }

      setIsConnected(false);
      setStatus('Disconnected');
      addOutput('Disconnected from serial port');
    } catch (error: any) {
      addOutput(`Error disconnecting: ${error.message}`);
      console.error('Disconnect error:', error);
    }
  };

  const startReading = async () => {
    if (!portRef.current) return;

    try {
      const decoder = new TextDecoder();
      const reader = portRef.current.readable!.getReader();
      readerRef.current = reader;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        addOutput(text);
      }
    } catch (error: any) {
      if (error.message !== 'The device has been lost.') {
        addOutput(`Read error: ${error.message}`);
      }
    } finally {
      readerRef.current = null;
    }
  };

  const sendData = async (data: string) => {
    if (!portRef.current || !isConnected) {
      addOutput('ERROR: Not connected to serial port');
      return;
    }

    try {
      if (!writerRef.current) {
        writerRef.current = portRef.current.writable!.getWriter();
      }

      const encoder = new TextEncoder();
      await writerRef.current.write(encoder.encode(data));

      // Also echo to output
      addOutput(`> ${data}`, 'sent');
    } catch (error: any) {
      addOutput(`Send error: ${error.message}`);
      console.error('Send error:', error);
    }
  };

  const addOutput = (text: string, type: 'sent' | 'received' = 'received') => {
    setOutput(prev => [...prev, `[${type}] ${text}`]);
  };

  const handleSend = () => {
    if (input.trim()) {
      sendData(input + '\r\n');
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearOutput = () => {
    setOutput([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Serial Console
            </h2>
            <span className={`text-sm px-2 py-1 rounded ${
              isConnected
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
              {status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close console"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Controls */}
        <div className="p-4 border-b border-gray-300 dark:border-gray-700 flex items-center gap-2 flex-wrap">
          <select
            value={baudRate}
            onChange={(e) => setBaudRate(Number(e.target.value))}
            disabled={isConnected}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50"
          >
            {BAUD_RATES.map(rate => (
              <option key={rate} value={rate}>{rate} baud</option>
            ))}
          </select>

          {!isConnected ? (
            <button
              onClick={connectSerial}
              className="px-4 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Connect
            </button>
          ) : (
            <button
              onClick={disconnectSerial}
              className="px-4 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Disconnect
            </button>
          )}

          <button
            onClick={clearOutput}
            className="px-4 py-1 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Clear
          </button>

          <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
            Tip: Use Chrome, Edge, or Opera for serial support
          </span>
        </div>

        {/* Output */}
        <div
          ref={outputRef}
          className="flex-1 p-4 overflow-auto bg-black text-green-400 font-mono text-sm"
        >
          {output.length === 0 ? (
            <div className="text-gray-500">
              Click Connect to open a serial port connection...
            </div>
          ) : (
            output.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap break-words">
                {line}
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!isConnected}
            placeholder="Type command and press Enter..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!isConnected || !input.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
