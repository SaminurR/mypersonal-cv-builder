import React, { useRef } from "react";
import { useCVStore } from "../../store/cv-store";
import { cvSchema } from "../../lib/cv-schema";
import { Download, Upload, RotateCcw } from "lucide-react";

export function DataManager() {
  const cv = useCVStore((state) => state.cv);
  const loadCV = useCVStore((state) => state.loadCV);
  const resetCV = useCVStore((state) => state.resetCV);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(cv, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const name = cv.header.fullName ? cv.header.fullName.replace(/\s+/g, "-") : "My";
    link.download = `${name}-CV-Data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const validatedData = cvSchema.parse(json);
        loadCV(validatedData as any);
        alert("CV data imported successfully!");
      } catch (err: any) {
        console.error("Invalid CV Data:", err);
        alert("Failed to import. The file might be corrupted or has an invalid format.\nCheck console for details.");
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      resetCV();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleExport}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
        title="Export JSON"
      >
        <Download size={14} />
        <span className="hidden sm:inline">Export</span>
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
        title="Import JSON"
      >
        <Upload size={14} />
        <span className="hidden sm:inline">Import</span>
      </button>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleImport}
        className="hidden"
      />

      <div className="w-px h-5 bg-slate-300 mx-1" />

      <button
        onClick={handleReset}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-white border border-red-200 rounded hover:bg-red-50 transition-colors"
        title="Reset Data"
      >
        <RotateCcw size={14} />
        <span className="hidden sm:inline">Reset</span>
      </button>
    </div>
  );
}
