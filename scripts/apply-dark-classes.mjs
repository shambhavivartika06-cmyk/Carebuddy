import fs from "fs";
import path from "path";

const root = path.resolve("components");
const files = [
  "MedicalDisclaimerBanner.tsx",
  "CheckInTab.tsx",
  "MedicationsTab.tsx",
  "AssistantTab.tsx",
  "ExplainerTab.tsx",
  "SymptomExplorerTab.tsx",
  "DoctorSummaryTab.tsx",
  "ProfileTab.tsx",
].map((f) => path.join(root, f));

const pairs = [
  ["border-slate-200/80", "dark:border-slate-700/80"],
  ["border-slate-200/60", "dark:border-slate-700/60"],
  ["border-slate-200/40", "dark:border-slate-700/40"],
  ["divide-slate-100", "dark:divide-slate-800"],
  ["border-slate-100", "dark:border-slate-800"],
  ["border-slate-200", "dark:border-slate-700"],
  ["border-slate-300", "dark:border-slate-600"],
  ["hover:bg-slate-50", "dark:hover:bg-slate-800"],
  ["hover:bg-slate-100", "dark:hover:bg-slate-800"],
  ["hover:bg-slate-200", "dark:hover:bg-slate-700"],
  ["hover:text-slate-900", "dark:hover:text-white"],
  ["hover:text-slate-700", "dark:hover:text-slate-200"],
  ["hover:text-slate-600", "dark:hover:text-slate-300"],
  ["hover:border-slate-300", "dark:hover:border-slate-600"],
  ["disabled:bg-slate-50", "dark:disabled:bg-slate-900"],
  ["bg-white/90", "dark:bg-slate-950/90"],
  ["bg-slate-50/60", "dark:bg-slate-900/80"],
  ["bg-slate-50", "dark:bg-slate-800/60"],
  ["bg-slate-100", "dark:bg-slate-800"],
  ["bg-slate-200", "dark:bg-slate-700"],
  ["bg-white", "dark:bg-slate-900"],
  ["text-slate-900", "dark:text-slate-50"],
  ["text-slate-800", "dark:text-slate-100"],
  ["text-slate-700", "dark:text-slate-200"],
  ["text-slate-600", "dark:text-slate-300"],
  ["text-slate-500", "dark:text-slate-400"],
  ["text-slate-400", "dark:text-slate-500"],
  ["text-slate-300", "dark:text-slate-600"],
  ["bg-brand-50", "dark:bg-sky-950"],
  ["text-brand-900", "dark:text-sky-100"],
  ["text-brand-800", "dark:text-sky-200"],
  ["text-brand-700", "dark:text-sky-300"],
  ["border-brand-200", "dark:border-sky-800"],
  ["border-brand-100", "dark:border-sky-800"],
  ["hover:bg-brand-50", "dark:hover:bg-sky-950"],
  ["hover:border-brand-300", "dark:hover:border-sky-600"],
  ["bg-amber-50", "dark:bg-amber-950/40"],
  ["bg-amber-100", "dark:bg-amber-950"],
  ["text-amber-900", "dark:text-amber-100"],
  ["text-amber-800", "dark:text-amber-200"],
  ["border-amber-200", "dark:border-amber-800"],
  ["bg-emerald-50", "dark:bg-emerald-950/40"],
  ["bg-emerald-100", "dark:bg-emerald-950"],
  ["text-emerald-800", "dark:text-emerald-200"],
  ["border-emerald-200", "dark:border-emerald-800"],
  ["bg-rose-50", "dark:bg-rose-950/40"],
  ["text-rose-900", "dark:text-rose-100"],
  ["text-rose-800", "dark:text-rose-200"],
  ["border-rose-200", "dark:border-rose-800"],
  ["border-rose-100", "dark:border-rose-900"],
  ["hover:bg-rose-50", "dark:hover:bg-rose-950/40"],
  ["bg-indigo-50", "dark:bg-indigo-950/40"],
  ["text-indigo-800", "dark:text-indigo-200"],
  ["border-indigo-200", "dark:border-indigo-800"],
  ["bg-teal-50/70", "dark:bg-teal-950/40"],
  ["bg-teal-50", "dark:bg-teal-950/40"],
  ["text-teal-700", "dark:text-teal-300"],
  ["border-teal-200", "dark:border-teal-800"],
];

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function apply(content) {
  for (const [light, dark] of pairs) {
    const re = new RegExp(`(?<![\\w:-])${escapeRegExp(light)}(?![\\w./%])`, "g");
    content = content.replace(re, (match, offset, src) => {
      const after = src.slice(offset + match.length);
      if (after.startsWith(" " + dark) || after.includes(" " + dark + " ") && after.slice(0, 80).includes(dark)) {
        const window = after.slice(0, dark.length + 2);
        if (window.startsWith(" " + dark)) return match;
      }
      if (after.startsWith(" " + dark)) return match;
      return `${match} ${dark}`;
    });
  }
  return content;
}

for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  const after = apply(before);
  fs.writeFileSync(file, after);
  console.log("updated", path.basename(file), before === after ? "(no change)" : "");
}
