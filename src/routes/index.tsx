import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { cleanText, getStats, type CleanOptions, type CleanMode } from '@/utils/cleanText';
import { useIsMobile } from '@/hooks/use-mobile';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const isMobile = useIsMobile();

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [options, setOptions] = useState<CleanOptions>({
    removeNoise: true,
    cleanSpaces: true,
    mode: 'balanced',
  });

  const inputStats = useMemo(() => getStats(input), [input]);
  const outputStats = useMemo(() => getStats(output), [output]);

  const handleClean = () => {
    if (!input.trim()) {
      alert('Please paste some text first.');
      return;
    }
    setOutput(cleanText(input, options));
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
  };

  const toggle = (key: keyof Omit<CleanOptions, 'mode'>) =>
    setOptions((o) => ({ ...o, [key]: !o[key] }));

  const setMode = (mode: CleanMode) => setOptions((o) => ({ ...o, mode }));

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">🧹 Text Cleaner</h1>
          <p className="mt-1 text-gray-500 text-sm">
            Paste copied text to remove AI footers, point markers, and instructions.
          </p>
        </header>

        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {/* Input */}
          <section>
            <div className="mb-1 flex justify-between text-sm">
              <label htmlFor="input" className="font-medium text-gray-700">Input</label>
              <span className="text-gray-400">Chars {inputStats.chars} · Words {inputStats.words}</span>
            </div>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your text here..."
              className="block w-full h-60 rounded-md border border-gray-300 bg-white p-3 text-sm focus:border-[#56aaa4] focus:ring-1 focus:ring-[#56aaa4] outline-none resize-y"
            />
            <div className="mt-3">
              <button
                onClick={handleClean}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#56aaa4] hover:bg-[#458a84] text-white font-medium rounded-md text-sm transition"
              >
                Clean Text
              </button>
            </div>
          </section>

          {/* Output */}
          <section>
            <div className="mb-1 flex justify-between text-sm">
              <label htmlFor="output" className="font-medium text-gray-700">Output</label>
              <span className="text-gray-400">
                {output ? `Chars ${outputStats.chars} · Words ${outputStats.words}` : 'Ready'}
              </span>
            </div>
            <textarea
              id="output"
              value={output}
              readOnly
              placeholder="Cleaned text will appear here..."
              className="block w-full h-60 rounded-md border border-gray-300 bg-gray-50 p-3 text-sm focus:outline-none resize-y"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={handleCopy}
                disabled={!output}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                  output
                    ? 'border-[#56aaa4] text-[#56aaa4] hover:bg-[#56aaa4] hover:text-white'
                    : 'border-gray-200 text-gray-700 cursor-not-allowed'
                }`}
              >
                Copy
              </button>
              <button
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                ↺ Reset
              </button>
            </div>
          </section>
        </div>

        {/* Options */}
        <section className="mt-6 rounded-md border border-[#56aaa4]/30 bg-gray-50 p-4">
          <h2 className="mb-2 text-sm font-semibold text-gray-700">Cleaning Options</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <label className="flex items-center gap-1.5 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={options.removeNoise}
                onChange={() => toggle('removeNoise')}
                className="accent-[#56aaa4] w-4 h-4"
              />
              Remove Noise Blocks
            </label>
            <label className="flex items-center gap-1.5 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={options.cleanSpaces}
                onChange={() => toggle('cleanSpaces')}
                className="accent-[#56aaa4] w-4 h-4"
              />
              Clean Extra Spaces
            </label>
          </div>
          <div className="mt-3 border-t border-[#56aaa4]/20 pt-3">
            <p className="text-sm font-medium text-gray-700">Mode</p>
            <div className="flex flex-wrap gap-4 mt-1">
              {(['safe', 'balanced', 'aggressive'] as CleanMode[]).map((m) => (
                <label key={m} className="flex items-center gap-1.5 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="mode"
                    value={m}
                    checked={options.mode === m}
                    onChange={() => setMode(m)}
                    className="accent-[#56aaa4] w-4 h-4"
                  />
                  <span className="capitalize">{m}</span>
                  {m === 'balanced' && (
                    <span className="text-xs text-gray-400">(Recommended)</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
          🔒 100% Client‑Side · No data is sent anywhere.
        </footer>
      </div>
    </div>
  );
}