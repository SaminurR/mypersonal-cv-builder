const fs = require('fs');
let p = 'src/store/cv-store.ts';
let code = fs.readFileSync(p, 'utf8');

if (!code.includes('updateCustomSectionLayout')) {
  code = code.replace(
    /addDynamicSection: \(\) => void;/,
    'addDynamicSection: () => void;\n  updateCustomSectionLayout: (sectionId: string, layout: "vertical" | "horizontal") => void;'
  );

  code = code.replace(
    /addDynamicSection: \(\) => \{/,
    `updateCustomSectionLayout: (sectionId, layout) => 
        set((s) => {
          if (sectionId === "custom") {
            return { cv: { ...s.cv, custom: { ...s.cv.custom, layout } } };
          }
          const sec = s.cv.customSections?.[sectionId];
          if (!sec) return s;
          return { cv: { ...s.cv, customSections: { ...s.cv.customSections, [sectionId]: { ...sec, layout } } } };
        }),\n\n      addDynamicSection: () => {`
  );

  fs.writeFileSync(p, code);
  console.log('Store patched for layout');
}
