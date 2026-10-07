import { useCVStore } from "../../../store/cv-store";

export function SummaryEditor() {
  const summary = useCVStore((state) => state.cv.summary);
  const updateSummary = useCVStore((state) => state.updateSummary);

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
        Professional Summary
      </label>
      <textarea
        className="w-full min-h-[120px] rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={summary.text}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="A brief summary of your professional background and goals..."
      />
    </div>
  );
}
