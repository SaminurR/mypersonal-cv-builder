const fs = require('fs');
let p = 'src/components/editor/EditorPanel.tsx';
let code = fs.readFileSync(p, 'utf8');

// Add imports
if (!code.includes('@dnd-kit/core')) {
  code = code.replace(/import \{ ChevronDown, ChevronRight, Eye, EyeOff \} from "lucide-react";/, 
    'import { ChevronDown, ChevronRight, Eye, EyeOff, GripVertical } from "lucide-react";\nimport { DndContext, closestCenter } from "@dnd-kit/core";\nimport { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";\nimport { CSS } from "@dnd-kit/utilities";');
}

// Add state update
if (!code.includes('updateSectionOrder')) {
  code = code.replace(/const toggleSectionVisibility = useCVStore\(\(state\) => state.toggleSectionVisibility\);/, 
    'const toggleSectionVisibility = useCVStore((state) => state.toggleSectionVisibility);\n  const updateSectionOrder = useCVStore((state) => state.updateSectionOrder);');
}

// Add handleDragEnd
if (!code.includes('handleDragEnd')) {
  const dragEnd = `
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
`;
  code = code.replace(/const toggleAccordion/, dragEnd + '\n  const toggleAccordion');
}

// Replace Dynamic Sections render block
const newRenderBlock = `
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
              />
            ))}
          </SortableContext>
        </DndContext>
`;

code = code.replace(/\{\/\* Dynamic Sections \*\/\}[\s\S]*?(?=<\/div>\s*<\/div>\s*\);\s*\})/m, newRenderBlock + '      ');

// Add SortableSectionNode at the end
if (!code.includes('function SortableSectionNode')) {
  const sortableNode = `
function SortableSectionNode({ section, open, toggleAccordion, toggleSectionVisibility, renderSectionContent }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: section.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} id={\`editor-section-\${section.id}\`} className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden mb-3">
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
          className={\`ml-2 rounded p-1 hover:bg-slate-200 \${
            section.visible ? "text-slate-600" : "text-slate-400"
          }\`}
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
          {renderSectionContent(section.id)}
        </div>
      )}
    </div>
  );
}
`;
  code = code + '\n' + sortableNode;
}

fs.writeFileSync(p, code);
console.log("EditorPanel patched for section sorting.");
