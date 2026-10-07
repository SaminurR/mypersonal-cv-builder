const fs = require('fs');
let p = 'src/store/cv-store.ts';
let code = fs.readFileSync(p, 'utf8');

// 1. Store Interface
code = code.replace(
  /updateCustomSectionTitle: \(title: string\) => void;[\s\S]*?reorderCustomEntries: \(items: CustomEntry\[\]\) => void;/,
  `updateCustomSectionTitle: (title: string) => void;
  addDynamicSection: () => void;
  removeDynamicSection: (id: string) => void;
  addCustomEntry: (sectionId?: string) => void;
  updateCustomEntry: (sectionId: string, entryId: string, partial: Partial<CustomEntry>) => void;
  removeCustomEntry: (sectionId: string, entryId: string) => void;
  reorderCustomEntries: (sectionId: string, items: CustomEntry[]) => void;`
);

// 2. Implementation
const impl = `updateCustomSectionTitle: (title) =>
        set((s) => ({
          cv: {
            ...s.cv,
            custom: { ...s.cv.custom, sectionTitle: title },
          },
        })),

      addDynamicSection: () => {
        const id = 'custom_' + uid();
        set((s) => ({
          cv: {
            ...s.cv,
            customSections: {
              ...(s.cv.customSections || {}),
              [id]: { sectionTitle: "New Section", items: [] }
            },
            sections: [
              ...s.cv.sections,
              { id, title: "New Section", visible: true, order: s.cv.sections.length }
            ]
          }
        }));
      },

      removeDynamicSection: (id) => {
        set((s) => {
          const newSections = s.cv.sections.filter(sec => sec.id !== id);
          const newCustomSections = { ...s.cv.customSections };
          delete newCustomSections[id];
          return {
            cv: {
              ...s.cv,
              customSections: newCustomSections,
              sections: newSections
            }
          };
        });
      },

      addCustomEntry: (sectionId = "custom") =>
        set((s) => {
          if (sectionId === "custom") {
            return { cv: { ...s.cv, custom: { ...s.cv.custom, items: [...s.cv.custom.items, { id: uid(), title: "", subtitle: "", date: "", description: "" }] } } };
          }
          const sec = s.cv.customSections?.[sectionId] || { sectionTitle: "", items: [] };
          return { cv: { ...s.cv, customSections: { ...s.cv.customSections, [sectionId]: { ...sec, items: [...sec.items, { id: uid(), title: "", subtitle: "", date: "", description: "" }] } } } };
        }),

      updateCustomEntry: (sectionId, entryId, partial) =>
        set((s) => {
          if (sectionId === "custom") {
            return { cv: { ...s.cv, custom: { ...s.cv.custom, items: s.cv.custom.items.map(e => e.id === entryId ? { ...e, ...partial } : e) } } };
          }
          const sec = s.cv.customSections?.[sectionId];
          if (!sec) return s;
          return { cv: { ...s.cv, customSections: { ...s.cv.customSections, [sectionId]: { ...sec, items: sec.items.map(e => e.id === entryId ? { ...e, ...partial } : e) } } } };
        }),

      removeCustomEntry: (sectionId, entryId) =>
        set((s) => {
          if (sectionId === "custom") {
            return { cv: { ...s.cv, custom: { ...s.cv.custom, items: s.cv.custom.items.filter(e => e.id !== entryId) } } };
          }
          const sec = s.cv.customSections?.[sectionId];
          if (!sec) return s;
          return { cv: { ...s.cv, customSections: { ...s.cv.customSections, [sectionId]: { ...sec, items: sec.items.filter(e => e.id !== entryId) } } } };
        }),

      reorderCustomEntries: (sectionId, items) =>
        set((s) => {
          if (sectionId === "custom") {
            return { cv: { ...s.cv, custom: { ...s.cv.custom, items } } };
          }
          const sec = s.cv.customSections?.[sectionId];
          if (!sec) return s;
          return { cv: { ...s.cv, customSections: { ...s.cv.customSections, [sectionId]: { ...sec, items } } } };
        }),`;

code = code.replace(
  /updateCustomSectionTitle: \(title\) =>[\s\S]*?reorderCustomEntries: \(items\) =>\s*set\(\(s\) => \(\{\s*cv: \{\s*\.\.\.s\.cv,\s*custom: \{ \.\.\.s\.cv\.custom, items \},\s*\},\s*\}\)\),/,
  impl
);

fs.writeFileSync(p, code);
console.log('Store patched');
