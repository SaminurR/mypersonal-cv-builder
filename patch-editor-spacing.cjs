const fs = require('fs');
let p = 'src/components/editor/EditorPanel.tsx';
let code = fs.readFileSync(p, 'utf8');

// In SortableSectionNode, settings is not directly available, but it can be passed or we can use `useCVStore.getState().cv.settings.globalSpacing`. Wait, `SortableSectionNode` can just use the store hook!
const useStoreHook = `function SortableSectionNode({ section, open, toggleAccordion, toggleSectionVisibility, renderSectionContent, updateSectionTitle, updateSectionSpacing }: any) {
  const globalSpacing = useCVStore((state) => state.cv.settings.globalSpacing);`;

code = code.replace(
  /function SortableSectionNode\(\{ section, open, toggleAccordion, toggleSectionVisibility, renderSectionContent, updateSectionTitle, updateSectionSpacing \}: any\) \{/,
  useStoreHook
);

code = code.replace(
  /Bottom Spacing: \{section\.spacing \?\? 24\}px/g,
  'Bottom Spacing: {section.spacing ?? globalSpacing ?? 24}px'
);

code = code.replace(
  /value=\{section\.spacing \?\? 24\}/g,
  'value={section.spacing ?? globalSpacing ?? 24}'
);

fs.writeFileSync(p, code);
console.log('EditorPanel updated.');
