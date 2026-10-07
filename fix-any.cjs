const fs = require('fs');

function fixEditor(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/items\.findIndex\(\(i\)/g, 'items.findIndex((i: any)');
  code = code.replace(/items\.map\(\(ref\)/g, 'items.map((ref: any)');
  code = code.replace(/items\.map\(\(hobby\)/g, 'items.map((hobby: any)');
  fs.writeFileSync(file, code);
}

fixEditor('src/components/editor/sections/ReferencesEditor.tsx');
fixEditor('src/components/editor/sections/HobbiesEditor.tsx');

function fixTemplates(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/items\.map\(\(ref\)/g, 'items.map((ref: any)');
  code = code.replace(/items\.map\(\(hobby\)/g, 'items.map((hobby: any)');
  fs.writeFileSync(file, code);
}

['ClassicTemplate.tsx', 'CompactTemplate.tsx', 'MinimalTemplate.tsx', 'SidebarTemplate.tsx'].forEach(t => {
  fixTemplates('src/components/preview/templates/' + t);
});

// Also fix cv-store.ts mapping functions
let store = fs.readFileSync('src/store/cv-store.ts', 'utf8');
store = store.replace(/items\.map\(\(i\)/g, 'items.map((i: any)');
store = store.replace(/items\.filter\(\(i\)/g, 'items.filter((i: any)');
fs.writeFileSync('src/store/cv-store.ts', store);

console.log("Fixed any types");
