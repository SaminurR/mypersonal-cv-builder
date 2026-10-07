import { useState } from "react";
import { EditorPanel } from "./components/editor/EditorPanel";
import { PreviewPanel } from "./components/preview/PreviewPanel";
import { SettingsEditor } from "./components/editor/settings/SettingsEditor";
import { PenTool, Paintbrush, Eye } from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState<"edit" | "design" | "preview">("edit");

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-slate-50 font-sans">
      
      {/* Mobile Tab Navigation */}
      <div className="flex md:hidden shrink-0 border-b border-slate-200 bg-white no-print">
        <button
          onClick={() => setActiveTab("edit")}
          className={`flex-1 flex flex-col items-center gap-1 py-2 text-xs font-medium border-b-2 ${
            activeTab === "edit" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500"
          }`}
        >
          <PenTool size={18} />
          Edit
        </button>
        <button
          onClick={() => setActiveTab("design")}
          className={`flex-1 flex flex-col items-center gap-1 py-2 text-xs font-medium border-b-2 ${
            activeTab === "design" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500"
          }`}
        >
          <Paintbrush size={18} />
          Customize
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 flex flex-col items-center gap-1 py-2 text-xs font-medium border-b-2 ${
            activeTab === "preview" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500"
          }`}
        >
          <Eye size={18} />
          Preview
        </button>
      </div>

      {/* Desktop layout: Side-by-side. Mobile layout: Conditional based on tabs */}
      <div className={`flex-1 flex overflow-hidden ${activeTab === "edit" ? "block" : "hidden md:flex"}`}>
        <EditorPanel />
      </div>

      <div className={`flex-1 flex overflow-auto bg-slate-50 p-4 ${activeTab === "design" ? "block" : "hidden"}`}>
        <div className="w-full max-w-md mx-auto">
          <SettingsEditor />
        </div>
      </div>

      <div className={`flex-1 flex overflow-hidden ${activeTab === "preview" ? "block" : "hidden md:flex"}`}>
        <PreviewPanel />
      </div>
    </div>
  );
}

export default App;
