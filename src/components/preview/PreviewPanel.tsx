import { useState } from "react";
import { useCVStore } from "../../store/cv-store";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { SidebarTemplate } from "./templates/SidebarTemplate";
import { CompactTemplate } from "./templates/CompactTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { RetroTemplate } from "./templates/RetroTemplate";
import { ExportButtons } from "./ExportButtons";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

export function PreviewPanel() {
  const [zoom, setZoom] = useState(1);
  const cv = useCVStore((state) => state.cv);
  const { pageBgColor, fontFamily, pageMargin } = cv.settings;

  // A4 dimensions at 96 DPI
  const A4_WIDTH = 794;
  const A4_MIN_HEIGHT = 1123;

  const handleZoomOut = () => setZoom((z) => Math.max(0.5, z - 0.1));
  const handleZoomIn = () => setZoom((z) => Math.min(2.0, z + 0.1));
  const handleZoomReset = () => setZoom(1);

  return (
    <div className="flex flex-col flex-1 h-full bg-slate-200">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-3 bg-white border-b border-slate-300 shadow-sm z-10 no-print">
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
          <span className="text-sm font-medium text-slate-700 w-12 text-center select-none">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
          <div className="w-px h-4 bg-slate-300 mx-1" />
          <button
            onClick={handleZoomReset}
            className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
            title="Reset Zoom"
          >
            <Maximize2 size={16} />
          </button>
        </div>

        <ExportButtons />
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-8 flex justify-center items-start print:p-0 print:overflow-visible">
        <div
          id="cv-preview-scale-wrapper"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.2s ease-out",
          }}
          className="print:transform-none print:transition-none"
        >
          <div
            id="cv-preview-page"
            className="shadow-xl bg-white overflow-hidden relative cursor-crosshair"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              const sectionNode = target.closest('[data-section]');
              if (sectionNode) {
                const sectionId = sectionNode.getAttribute('data-section');
                if (sectionId) {
                  useCVStore.getState().setActiveSection(sectionId);
                }
              }
            }}
            style={{
              width: A4_WIDTH,
              minHeight: A4_MIN_HEIGHT,
              backgroundColor: pageBgColor,
              fontFamily: fontFamily,
              padding: pageMargin,
              color: cv.settings.textColor,
              // Inject CSS variables for granular styling across all templates
              '--color-accent': cv.settings.accentColor,
              '--color-heading': cv.settings.headingColor || cv.settings.textColor,
              '--color-subheading': cv.settings.subheadingColor || cv.settings.textColor,
              '--color-muted': cv.settings.mutedColor || '#64748b',
                '--color-section-title': cv.settings.sectionTitleColor || cv.settings.headingColor || cv.settings.textColor,
              '--cv-border-radius': `${cv.settings.borderRadius ?? 4}px`,
            } as React.CSSProperties}
          >
            {cv.settings.template === "minimal" && <MinimalTemplate data={cv} />}
            {cv.settings.template === "sidebar" && <SidebarTemplate data={cv} />}
            {cv.settings.template === "compact" && <CompactTemplate data={cv} />}
            {cv.settings.template === "classic" && <ClassicTemplate data={cv} />}
            {cv.settings.template === "retro" && <RetroTemplate data={cv} settings={cv.settings} />}
          </div>
        </div>
      </div>
    </div>
  );
}
