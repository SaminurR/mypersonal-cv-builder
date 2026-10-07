import { useCVStore } from "../../../store/cv-store";
import { Select } from "../../ui/Select";
import { PhotoUploader } from "../../ui/PhotoUploader";
import type { 
  TemplateName, 
  LayoutType, 
  HeadingStyle, 
  DateFormat, 
  BulletStyle, 
  HeaderAlignment, 
} from "../../../types/cv";

import { Shuffle } from "lucide-react";

const PALETTES = [
  { name: "Default Blue", accentColor: "#2563eb", textColor: "#334155", headingColor: "#0f172a", subheadingColor: "#1e293b", mutedColor: "#64748b", pageBgColor: "#ffffff" },
  { name: "Emerald", accentColor: "#10b981", textColor: "#064e3b", headingColor: "#022c22", subheadingColor: "#064e3b", mutedColor: "#047857", pageBgColor: "#ffffff" },
  { name: "Midnight", accentColor: "#6366f1", textColor: "#334155", headingColor: "#0f172a", subheadingColor: "#1e293b", mutedColor: "#64748b", pageBgColor: "#f8fafc" },
  { name: "Warm Rust", accentColor: "#ea580c", textColor: "#431407", headingColor: "#431407", subheadingColor: "#78350f", mutedColor: "#92400e", pageBgColor: "#fffbeb" },
  { name: "Rose", accentColor: "#e11d48", textColor: "#4c0519", headingColor: "#4c0519", subheadingColor: "#881337", mutedColor: "#be123c", pageBgColor: "#fff1f2" },
  { name: "Monochrome", accentColor: "#171717", textColor: "#404040", headingColor: "#171717", subheadingColor: "#262626", mutedColor: "#737373", pageBgColor: "#ffffff" },
  { name: "Slate", accentColor: "#475569", textColor: "#334155", headingColor: "#0f172a", subheadingColor: "#1e293b", mutedColor: "#64748b", pageBgColor: "#ffffff" },
  { name: "Navy", accentColor: "#1e3a8a", textColor: "#172554", headingColor: "#172554", subheadingColor: "#1e3a8a", mutedColor: "#3b82f6", pageBgColor: "#f0f9ff" },
  { name: "Forest", accentColor: "#166534", textColor: "#14532d", headingColor: "#14532d", subheadingColor: "#166534", mutedColor: "#22c55e", pageBgColor: "#f0fdf4" },
  { name: "Purple", accentColor: "#9333ea", textColor: "#3b0764", headingColor: "#3b0764", subheadingColor: "#581c87", mutedColor: "#a855f7", pageBgColor: "#faf5ff" },
];

export function SettingsEditor() {
  const settings = useCVStore((state) => state.cv.settings);
  const updateSettings = useCVStore((state) => state.updateSettings);
  const header = useCVStore((state) => state.cv.header);
  const updateHeader = useCVStore((state) => state.updateHeader);

  
  const resetColors = () => {
    updateSettings({
      accentColor: '#2563eb',
      textColor: '#1e293b',
      headingColor: '#0f172a',
      subheadingColor: '#334155',
      mutedColor: '#64748b',
      pageBgColor: '#ffffff',
      sectionTitleColor: '#0f172a'
    });
  };

  const applyRandomPalette = () => {
    const randomPalette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    updateSettings({
      accentColor: randomPalette.accentColor,
      textColor: randomPalette.textColor,
      headingColor: randomPalette.headingColor,
      subheadingColor: randomPalette.subheadingColor,
      mutedColor: randomPalette.mutedColor,
      pageBgColor: randomPalette.pageBgColor,
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Templates */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-800 border-b pb-1">Template & Layout</h3>
        <Select
          label="Template"
          value={settings.template}
          onChange={(e) => updateSettings({ template: e.target.value as TemplateName })}
          options={[
            { value: "minimal", label: "Minimal (Single Column)" },
            { value: "sidebar", label: "Sidebar (Two Columns)" },
            { value: "compact", label: "Compact (Dense)" },
            { value: "classic", label: "Classic (Traditional)" },
              { value: "retro", label: "Retro (Brutalist)" },
          ]}
        />
        
        {settings.template === "sidebar" && (
          <>
            <Select
              label="Sidebar Position"
              value={settings.layout}
              onChange={(e) => updateSettings({ layout: e.target.value as LayoutType })}
              options={[
                { value: "left-sidebar", label: "Left Sidebar" },
                { value: "right-sidebar", label: "Right Sidebar" },
              ]}
            />
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Sidebar Width: {settings.sidebarWidth}%</label>
              <input
                type="range"
                min="20"
                max="50"
                value={settings.sidebarWidth}
                onChange={(e) => updateSettings({ sidebarWidth: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </>
        )}
      </div>

      
      
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-800 border-b pb-1">Profile Photo</h3>
        <PhotoUploader value={header.photoUrl} onChange={(url) => updateHeader({ photoUrl: url })} />
        <div className="space-y-3">

        
          <Select
            label="Photo Position"
            value={settings.photoPosition || 'right'}
            onChange={(e) => updateSettings({ photoPosition: e.target.value as any })}
            options={[
              { value: "left", label: "Left" },
              { value: "right", label: "Right" },
            ]}
          />
        <Select
          label="Photo Shape"
          value={settings.photoShape}
          onChange={(e) => updateSettings({ photoShape: e.target.value as any })}
          options={[
            { value: "circle", label: "Circle" },
            { value: "rounded", label: "Rounded Squares" },
            { value: "square", label: "Square" },
          ]}
        />
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Photo Size: {settings.photoSize}px</label>
          <input
            type="range"
            min="50"
            max="200"
            value={settings.photoSize}
            onChange={(e) => updateSettings({ photoSize: Number(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>
    

      </div>
      {/* Colors & Fonts */}
      <div className="space-y-3">
        <div className="flex justify-between items-end border-b pb-1">
          <h3 className="text-sm font-semibold text-slate-800">Colors & Typography</h3>
          
            <div className="flex items-center gap-3">
              <button 
                onClick={resetColors}
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-red-500 hover:text-red-600"
              >
                Reset Colors
              </button>
              <button 
                onClick={applyRandomPalette}
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-blue-600 hover:text-blue-700"
              >
                <Shuffle size={12} /> Randomize Theme
              </button>
            </div>

        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {PALETTES.slice(0, 6).map(p => (
            <button
              key={p.name}
              onClick={() => updateSettings({ 
                accentColor: p.accentColor, 
                textColor: p.textColor, 
                headingColor: p.headingColor,
                subheadingColor: p.subheadingColor,
                mutedColor: p.mutedColor,
                pageBgColor: p.pageBgColor,
                  sectionTitleColor: p.headingColor 
              })}
              className="w-6 h-6 rounded-full border border-slate-200 shadow-sm"
              style={{ backgroundColor: p.accentColor }}
              title={p.name}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-1 text-center">
            <label className="text-xs text-slate-600">Page Bg</label>
            <input type="color" value={settings.pageBgColor} onChange={(e) => updateSettings({ pageBgColor: e.target.value })} className="w-full h-8 cursor-pointer rounded border border-slate-200 p-0 overflow-hidden" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <label className="text-xs text-slate-600">Accent</label>
            <input type="color" value={settings.accentColor} onChange={(e) => updateSettings({ accentColor: e.target.value })} className="w-full h-8 cursor-pointer rounded border border-slate-200 p-0 overflow-hidden" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <label className="text-xs text-slate-600">Heading</label>
            <input type="color" value={settings.headingColor || settings.textColor} onChange={(e) => updateSettings({ headingColor: e.target.value })} className="w-full h-8 cursor-pointer rounded border border-slate-200 p-0 overflow-hidden" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <label className="text-xs text-slate-600">Subheading</label>
            <input type="color" value={settings.subheadingColor || settings.textColor} onChange={(e) => updateSettings({ subheadingColor: e.target.value })} className="w-full h-8 cursor-pointer rounded border border-slate-200 p-0 overflow-hidden" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <label className="text-xs text-slate-600">Body Text</label>
            <input type="color" value={settings.textColor} onChange={(e) => updateSettings({ textColor: e.target.value })} className="w-full h-8 cursor-pointer rounded border border-slate-200 p-0 overflow-hidden" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <label className="text-xs text-slate-600">Dates/Muted</label>
            <input type="color" value={settings.mutedColor || "#64748b"} onChange={(e) => updateSettings({ mutedColor: e.target.value })} className="w-full h-8 cursor-pointer rounded border border-slate-200 p-0 overflow-hidden" />
          </div>
        </div>

        <Select
          label="Font Family"
          value={settings.fontFamily}
          onChange={(e) => updateSettings({ fontFamily: e.target.value })}
          options={[
            { value: "Inter", label: "Inter (Sans-serif)" },
            { value: "Arial", label: "Arial / Helvetica" },
            { value: "Georgia", label: "Georgia (Serif)" },
            { value: "Roboto Mono", label: "Roboto Mono" },
            { value: "Source Serif 4", label: "Source Serif 4" },
          ]}
        />

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Font Size Scale: {settings.fontSizeScale}x</label>
          <input
            type="range"
            min="0.8"
            max="1.2"
            step="0.05"
            value={settings.fontSizeScale}
            onChange={(e) => updateSettings({ fontSizeScale: Number(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      {/* Spacing & Alignment */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-800 border-b pb-1">Spacing & Structure</h3>
        <Select
          label="Header Alignment"
          value={settings.headerAlignment}
          onChange={(e) => updateSettings({ headerAlignment: e.target.value as HeaderAlignment })}
          options={[
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
          ]}
        />
        
        <Select
          label="Section Heading Style"
          value={settings.headingStyle}
          onChange={(e) => updateSettings({ headingStyle: e.target.value as HeadingStyle })}
          options={[
            { value: "plain", label: "Plain" },
            { value: "uppercase", label: "UPPERCASE" },
            { value: "small-caps", label: "Small Caps" },
            { value: "underline", label: "Underlined" },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <Select
            label="Bullet Style"
            value={settings.bulletStyle}
            onChange={(e) => updateSettings({ bulletStyle: e.target.value as BulletStyle })}
            options={[
              { value: "disc", label: "Disc" },
              { value: "dash", label: "Dash" },
              { value: "none", label: "None" },
            ]}
          />
          <Select
            label="Date Format"
            value={settings.dateFormat}
            onChange={(e) => updateSettings({ dateFormat: e.target.value as DateFormat })}
            options={[
              { value: "MMM YYYY", label: "MMM YYYY (Jan 2023)" },
              { value: "MM/YYYY", label: "MM/YYYY (01/2023)" },
              { value: "YYYY", label: "YYYY (2023)" },
            ]}
          />
        </div>

                <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Global Section Spacing: {settings.globalSpacing ?? 24}px</label>
          <input
            type="range"
            min="8"
            max="64"
            step="4"
            value={settings.globalSpacing ?? 24}
            onChange={(e) => updateSettings({ globalSpacing: Number(e.target.value) })}
            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Border Radius (Roundness): {settings.borderRadius}px</label>
          <input
            type="range"
            min="0"
            max="24"
            step="1"
            value={settings.borderRadius ?? 4}
            onChange={(e) => updateSettings({ borderRadius: Number(e.target.value) })}
            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Page Margins: {settings.pageMargin}px</label>
          <input
            type="range"
            min="16"
            max="64"
            step="4"
            value={settings.pageMargin}
            onChange={(e) => updateSettings({ pageMargin: Number(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
