const fs = require('fs');
let store = fs.readFileSync('src/store/cv-store.ts', 'utf8');

if (!store.includes('addReference:')) {
  // 1. Imports
  store = store.replace(/CustomEntry,/, 'CustomEntry,\n  ReferenceItem,\n  HobbyItem,');

  // 2. Interface
  const interfaceInjections = `
  // References
  addReference: () => void;
  updateReference: (id: string, partial: Partial<ReferenceItem>) => void;
  removeReference: (id: string) => void;
  reorderReferences: (items: ReferenceItem[]) => void;

  // Hobbies
  addHobby: () => void;
  updateHobby: (id: string, partial: Partial<HobbyItem>) => void;
  removeHobby: (id: string) => void;
  reorderHobbies: (items: HobbyItem[]) => void;
`;
  store = store.replace(/\/\/ Custom/, interfaceInjections + '\n  // Custom');

  // 3. Implementation
  const implementationInjections = `
      // References
      addReference: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            references: {
              items: [
                ...s.cv.references.items,
                { id: uid(), name: "", position: "", company: "", contact: "", url: "" },
              ],
            },
          },
        })),
      updateReference: (id, partial) =>
        set((s) => ({
          cv: {
            ...s.cv,
            references: {
              items: s.cv.references.items.map((i) => (i.id === id ? { ...i, ...partial } : i)),
            },
          },
        })),
      removeReference: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            references: { items: s.cv.references.items.filter((i) => i.id !== id) },
          },
        })),
      reorderReferences: (items) =>
        set((s) => ({
          cv: { ...s.cv, references: { items } },
        })),

      // Hobbies
      addHobby: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            hobbies: {
              items: [
                ...s.cv.hobbies.items,
                { id: uid(), name: "" },
              ],
            },
          },
        })),
      updateHobby: (id, partial) =>
        set((s) => ({
          cv: {
            ...s.cv,
            hobbies: {
              items: s.cv.hobbies.items.map((i) => (i.id === id ? { ...i, ...partial } : i)),
            },
          },
        })),
      removeHobby: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            hobbies: { items: s.cv.hobbies.items.filter((i) => i.id !== id) },
          },
        })),
      reorderHobbies: (items) =>
        set((s) => ({
          cv: { ...s.cv, hobbies: { items } },
        })),
`;
  store = store.replace(/\/\/ ── Custom Section/, implementationInjections + '\n      // ── Custom Section');

  fs.writeFileSync('src/store/cv-store.ts', store);
  console.log('Store updated');
}
