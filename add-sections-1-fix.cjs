const fs = require('fs');

let types = fs.readFileSync('src/types/cv.ts', 'utf8');

const newTypes = `
export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  contact: string;
  url: string;
}

export interface HobbyItem {
  id: string;
  name: string;
}
`;

if (!types.includes('ReferenceItem')) {
  types = types.replace(/export interface CustomEntry/, newTypes + '\nexport interface CustomEntry');
}

if (!types.includes('references: { items: ReferenceItem')) {
  types = types.replace(/custom: \{/, 'references: { items: ReferenceItem[] };\n  hobbies: { items: HobbyItem[] };\n  custom: {');
}

if (!types.includes('"references"')) {
  types = types.replace(/\| "custom"/, '| "references" | "hobbies" | "custom"');
}

fs.writeFileSync('src/types/cv.ts', types);
console.log("types/cv.ts fixed");
