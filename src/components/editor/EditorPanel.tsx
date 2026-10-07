import { useState, useEffect } from "react";
import { useCVStore } from "../../store/cv-store";
import { SkillsEditor } from "./skills/SkillsEditor";
import { SettingsEditor } from "./settings/SettingsEditor";
import { DataManager } from "./DataManager";
import { ChevronDown, ChevronRight, Eye, EyeOff, GripVertical } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { HeaderEditor } from "./sections/HeaderEditor";
import { SummaryEditor } from "./sections/SummaryEditor";
import { ExperienceEditor } from "./sections/ExperienceEditor";
import { EducationEditor } from "./sections/EducationEditor";
import { ProjectsEditor } from "./sections/ProjectsEditor";
import { LanguagesEditor } from "./sections/LanguagesEditor";
import { CertificatesEditor } from "./sections/CertificatesEditor";
import { CustomSectionEditor } from "./sections/CustomSectionEditor";
import { ReferencesEditor } from "./sections/ReferencesEditor";
import { HobbiesEditor } from "./sections/HobbiesEditor";

export function EditorPanel() {
  const sections = useCVStore((state) => state.cv.sections);
  const toggleSectionVisibility = useCVStore((state) => state.toggleSectionVisibility);
  const updateSectionOrder = useCVStore((state) => state.updateSectionOrder);
  const updateSectionTitle = useCVStore((state) => state.updateSectionTitle);
  const updateSectionSpacing = useCVStore((state) => state.updateSectionSpacing);

  // Migration: Rename Hobbies to Interests
  useEffect(() => {
    const stateSections = useCVStore.getState().cv.sections;
    const hobbies = stateSections.find(s => s.id === 'hobbies');
    if (hobbies && hobbies.title === 'Hobbies') {
      useCVStore.getState().updateSectionTitle('hobbies', 'Interests');
    }
  }, []);
  
  const activeSection = useCVStore((state) => state.activeSection);

  // Track open state for accordions
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    settings: true,
    skills: false,
    header: false,
    summary: false,
    experience: false,
    education: false,
    projects: false,
    languages: false,
    certificates: false,
    custom: false,
    references: false,
    hobbies: false,
  });

  // Watch for click-to-focus events from the preview panel
  useEffect(() => {
    if (activeSection) {
      setOpenSections((prev) => ({ ...prev, [activeSection]: true }));
      // Small delay to allow render before scrolling
      setTimeout(() => {
        const el = document.getElementById(`editor-section-${activeSection}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [activeSection]);

  
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    const newArray = [...sections];
    const [moved] = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, moved);
    
    // Update order property to match new index
    const reordered = newArray.map((s, index) => ({ ...s, order: index }));
    updateSectionOrder(reordered);
  };

  const toggleAccordion = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderSectionContent = (id: string) => {
    switch (id) {
      case "settings":
        return <SettingsEditor />;
      case "skills":
        return <SkillsEditor />;
      case "header":
        return <HeaderEditor />;
      case "summary":
        return <SummaryEditor />;
      case "experience":
        return <ExperienceEditor />;
      case "education":
        return <EducationEditor />;
      case "projects":
        return <ProjectsEditor />;
      case "languages":
        return <LanguagesEditor />;
      case "certificates":
        return <CertificatesEditor />;
      case "custom":
        return <CustomSectionEditor />;
      case "references":
        return <ReferencesEditor />;
      case "hobbies":
        return <HobbiesEditor />;
      default:
        return <div className="text-sm text-slate-500 italic p-4">Coming soon...</div>;
    }
  };

  return (
    <div className="w-full md:w-[420px] shrink-0 h-full overflow-y-auto border-r border-slate-200 bg-slate-50 print:hidden no-print">
      <div className="sticky top-0 z-10 bg-white/80 p-4 backdrop-blur-sm border-b border-slate-200 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">CV Builder</h1>
            <p className="mt-1 text-sm text-slate-500">Edit details below</p>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 mt-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span className="text-[10px] font-bold uppercase tracking-wider">Autosaved</span>
          </div>
        </div>
        <DataManager />
      </div>

      <div className="p-4 space-y-3">
        {/* Settings Accordion (Hidden on mobile as it has a dedicated tab) */}
        <div className="hidden md:block rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between bg-white px-4 py-3 hover:bg-slate-50 cursor-pointer" onClick={() => toggleAccordion("settings")}>
            <button className="flex flex-1 items-center gap-2 text-sm font-bold text-slate-800 focus:outline-none">
              {openSections["settings"] ? <ChevronDown size={16} className="text-blue-500" /> : <ChevronRight size={16} className="text-slate-400" />}
              Design & Layout
            </button>
          </div>
          {openSections["settings"] && (
            <div className="border-t border-slate-100 bg-white p-4">
              {renderSectionContent("settings")}
            </div>
          )}
        </div>

        
        {/* Dynamic Sections */}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            {sections.map((section) => (
              <SortableSectionNode
                key={section.id}
                section={section}
                open={openSections[section.id]}
                toggleAccordion={toggleAccordion}
                toggleSectionVisibility={toggleSectionVisibility}
                renderSectionContent={renderSectionContent}
                updateSectionTitle={updateSectionTitle}
                updateSectionSpacing={updateSectionSpacing}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}


function SortableSectionNode({ section, open, toggleAccordion, toggleSectionVisibility, renderSectionContent, updateSectionTitle, updateSectionSpacing }: any) {
  const globalSpacing = useCVStore((state) => state.cv.settings.globalSpacing);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: section.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} id={`editor-section-${section.id}`} className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden mb-3">
      {/* Accordion Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 hover:bg-slate-50">
        <div className="cursor-grab text-slate-400 hover:text-slate-600 mr-2" {...attributes} {...listeners}>
          <GripVertical size={16} />
        </div>
        <button
          className="flex flex-1 items-center gap-2 text-sm font-medium text-slate-800 focus:outline-none"
          onClick={() => toggleAccordion(section.id)}
        >
          {open ? (
            <ChevronDown size={16} className="text-slate-400" />
          ) : (
            <ChevronRight size={16} className="text-slate-400" />
          )}
          {section.title}
        </button>
        <button
          className={`ml-2 rounded p-1 hover:bg-slate-200 ${
            section.visible ? "text-slate-600" : "text-slate-400"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleSectionVisibility(section.id);
          }}
          title={section.visible ? "Hide section" : "Show section"}
        >
          {section.visible ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>

            {/* Accordion Body */}
      {open && (
        <div className="border-t border-slate-100 bg-white p-4">
          <div className="flex gap-4 mb-4 pb-4 border-b border-slate-100 bg-slate-50 p-3 rounded border">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-700 mb-1">Section Title</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-700 mb-1">Bottom Spacing: {section.spacing ?? globalSpacing ?? 24}px</label>
              <input
                type="range"
                min="0"
                max="64"
                step="4"
                value={section.spacing ?? globalSpacing ?? 24}
                onChange={(e) => updateSectionSpacing(section.id, Number(e.target.value))}
                className="w-full mt-2 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
          {renderSectionContent(section.id)}
        </div>
      )}
    </div>
  );
}
