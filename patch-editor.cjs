const fs = require('fs');
let p = 'src/components/editor/EditorPanel.tsx';
let code = fs.readFileSync(p, 'utf8');

code = code.replace(
  /const updateSectionOrder = useCVStore\(\(state\) => state.updateSectionOrder\);/,
  'const updateSectionOrder = useCVStore((state) => state.updateSectionOrder);\n  const updateSectionTitle = useCVStore((state) => state.updateSectionTitle);\n  const updateSectionSpacing = useCVStore((state) => state.updateSectionSpacing);'
);

code = code.replace(
  /renderSectionContent=\{renderSectionContent\}/,
  'renderSectionContent={renderSectionContent}\n                updateSectionTitle={updateSectionTitle}\n                updateSectionSpacing={updateSectionSpacing}'
);

code = code.replace(
  /function SortableSectionNode\(\{ section, open, toggleAccordion, toggleSectionVisibility, renderSectionContent \}: any\) \{/,
  'function SortableSectionNode({ section, open, toggleAccordion, toggleSectionVisibility, renderSectionContent, updateSectionTitle, updateSectionSpacing }: any) {'
);

const accordionBody = `      {/* Accordion Body */}
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
              <label className="block text-xs font-medium text-slate-700 mb-1">Bottom Spacing: {section.spacing ?? 24}px</label>
              <input
                type="range"
                min="0"
                max="64"
                step="4"
                value={section.spacing ?? 24}
                onChange={(e) => updateSectionSpacing(section.id, Number(e.target.value))}
                className="w-full mt-2 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
          {renderSectionContent(section.id)}
        </div>
      )}`;

code = code.replace(
  /\{\/\* Accordion Body \*\/\}\s*\{open && \(\s*<div className="border-t border-slate-100 bg-white p-4">\s*\{renderSectionContent\(section\.id\)\}\s*<\/div>\s*\)\}/,
  accordionBody
);

fs.writeFileSync(p, code);
console.log('EditorPanel patched');
