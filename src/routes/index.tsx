import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { cleanText, getStats, type CleanMode, type CleanOptions } from "@/utils/cleanText";

// ===== HOOK: Mobile detection =====
const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useState(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  },);

  return !!isMobile;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Text Cleaning Tool" },
      {
        name: "description",
        content:
          "Clean copied assignment text by removing AI footers, point markers, and instructions while keeping your questions and options.",
      },
      { property: "og:title", content: "Text Cleaning Tool" },
      {
        property: "og:description",
        content:
          "Paste assignment text to strip noise and keep questions and answer options. 100% client-side.",
      },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  component: Index,
});

function Index() {
  const isMobile = useIsMobile();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [options, setOptions] = useState<CleanOptions>({
    removeNoise: true,
    cleanSpaces: true,
    mode: "balanced",
  });

  const inputStats = useMemo(() => getStats(input), [input]);
  const outputStats = useMemo(() => getStats(output), [output]);

  const handleClean = () => {
    if (!input.trim()) {
      alert("Please paste some text first.");
      return;
    }
    setOutput(cleanText(input, options));
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const toggle = (key: keyof Omit<CleanOptions, "mode">) =>
    setOptions((o) => ({ ...o, [key]: !o[key] }));

  const setMode = (mode: CleanMode) => setOptions((o) => ({ ...o, mode }));

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="mx-auto max-w-6xl px-3 py-5 sm:px-4 sm:py-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Text Cleaning Tool</h1>
          <p className="mt-2 text-base text-gray-500">
            Removes repeated AI footers, point markers, and instructions while keeping your
            questions and options.
          </p>
        </header>

        {/* ===== GRID: Input & Output side-by-side on desktop ===== */}
        <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
          {/* ——— INPUT ——— */}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="input" className="block text-sm font-medium text-gray-700">
                Input
              </label>
              <p className="text-xs text-gray-500">
                Characters: {inputStats.chars} | Words: {inputStats.words}
              </p>
            </div>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your copied assignment here..."
              className="block w-full resize-y rounded-md border border-gray-300 bg-white p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#56aaa4] focus:outline-none focus:ring-1 focus:ring-[#56aaa4]"
              style={{ minHeight: 200 }}
            />
            {/* ===== CLEAN BUTTON ===== */}
            <section className="mt-6">
              <button
                type="button"
                onClick={handleClean}
                className="w-full rounded-md px-4 py-2.5 text-sm font-medium text-white hover:bg-[#458a84] sm:w-auto"
                style={{ backgroundColor: "#56aaa4" }}
              >
                Clean Text
              </button>
            </section>
          </section>

          {/* ——— OUTPUT ——— */}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="output" className="block text-sm font-medium text-gray-700">
                Output
              </label>
              <p className="text-xs text-gray-500">
                Cleaned: Characters: {outputStats.chars} | Words: {outputStats.words}
              </p>
            </div>
            <textarea
              id="output"
              value={output}
              readOnly
              placeholder="Cleaned text will appear here..."
              className="block w-full resize-y rounded-md border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
              style={{ minHeight: 200 }}
            />
            {/* Output actions: Copy + Reset */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full rounded-md px-4 py-2.5 text-sm font-medium text-white hover:bg-[#458a84] sm:w-auto"
                style={{ backgroundColor: "#56aaa4" }}
              >
                Copy
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ↺ Reset
              </button>
            </div>
          </section>
        </div>

        {/* ===== OPTIONS ===== */}
        <section className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-4">
          <h2 className="mb-3 text-sm font-semibold text-gray-700">Cleaning Options</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Check
              label="Remove Noise Blocks"
              checked={options.removeNoise}
              onChange={() => toggle("removeNoise")}
              
            />
            <Check
              label="Clean Extra Spaces"
              checked={options.cleanSpaces}
              onChange={() => toggle("cleanSpaces")}
            />
          </div>

          <div className="mt-4 border-t border-gray-200 pt-3">
            <p className="mb-2 text-sm font-medium text-gray-700">Mode</p>
            <div className="flex flex-wrap gap-4">
              {(["safe", "balanced", "aggressive"] as CleanMode[]).map((m) => (
                <label key={m} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="mode"
                    value={m}
                    checked={options.mode === m}
                    onChange={() => setMode(m)}
                    className="h-4 w-4 text-[#56aaa4] focus:ring-[#56aaa4]"
                  />
                  <span className="capitalize">{m}</span>
                  {m === "balanced" && <span className="text-xs text-gray-400">(Recommended)</span>}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="mt-6 border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
          🔒 100% Client-Side. Crafted with {" "}
          <a
            href="https://mohammed-adnan-shakeel.github.io"
            target="_blank"
          >
            ❤️
          </a>
        </footer>
      </div>
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-[#56aaa4] focus:ring-[#56aaa4]"
      />
      {label}
    </label>
  );
}