export type CleanMode = "safe" | "balanced" | "aggressive";

export interface CleanOptions {
  removeNoise: boolean;
  cleanSpaces: boolean;
  mode: CleanMode;
}

const NOISE_SUBSTRINGS = [
  "you are a helpful ai assistant",
  "do you understand",
  "graded assessment from Coursera",
];

const INVISIBLE_REGEX = /[\u200B-\u200D\uFEFF\u2060\u034F]/g;

function isNoiseBlock(block: string): boolean {
  const lower = block.toLowerCase();
  return NOISE_SUBSTRINGS.some((kw) => lower.includes(kw));
}

export function cleanText(input: string, opts: CleanOptions): string {
  if (!input) return "";

  let text = input.replace(INVISIBLE_REGEX, "");

  const blocks = text.split(/\n\s*\n/);
  const removeNoise = opts.removeNoise && opts.mode !== "safe";
  const kept = blocks.filter((b) => {
    if (!b.trim()) return false;
    if (removeNoise && isNoiseBlock(b)) return false;
    return true;
  });

  text = kept.map((b) => b.replace(/^\n+|\n+$/g, "")).join("\n\n");

  if (removeNoise) {
    text = text.replace(/\d+\s*points?\s*/gi, "");
  }

  text = text.replace(/(\d+)\.\s*\n\s*Question\s+\1/gi, "$1. Question $1");

  if (opts.cleanSpaces) {
    text = text.replace(/[ \t]+/g, " ");
  }

  if (removeNoise) {
    text = text.replace(/\n\s*text\s*$/i, "");
  }

  text = text.replace(/\n{3,}/g, "\n\n");

  text = text
    .split("\n")
    .map((l) => l.replace(/[ \t]+$/g, "").replace(/^[ \t]+/g, ""))
    .join("\n");

  return text.trim();
}

export function getStats(text: string): { chars: number; words: number } {
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return { chars, words };
}