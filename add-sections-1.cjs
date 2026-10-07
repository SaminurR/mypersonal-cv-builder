const fs = require('fs');

function addSections() {
  // 1. types/cv.ts
  let types = fs.readFileSync('src/types/cv.ts', 'utf8');
  if (!types.includes('ReferenceItem')) {
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
    types = types.replace(/export interface CustomItem/, newTypes + '\nexport interface CustomItem');
    types = types.replace(/custom: \{/, 'references: { items: ReferenceItem[] };\n  hobbies: { items: HobbyItem[] };\n  custom: {');
    types = types.replace(/\| "custom"/, '| "references" | "hobbies" | "custom"');
    fs.writeFileSync('src/types/cv.ts', types);
  }

  // 2. cv-schema.ts
  let schema = fs.readFileSync('src/lib/cv-schema.ts', 'utf8');
  if (!schema.includes('references:')) {
    const newSchema = `
    references: z.object({
      items: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          position: z.string(),
          company: z.string(),
          contact: z.string(),
          url: z.string(),
        })
      )
    }),
    hobbies: z.object({
      items: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      )
    }),
    custom:`;
    schema = schema.replace(/custom:/, newSchema);
    schema = schema.replace(/"custom"/, '"references", "hobbies", "custom"');
    fs.writeFileSync('src/lib/cv-schema.ts', schema);
  }

  // 3. sample-data.ts
  let sample = fs.readFileSync('src/lib/sample-data.ts', 'utf8');
  if (!sample.includes('references: { items: [] }')) {
    sample = sample.replace(/custom: \{/, 'references: { items: [] },\n  hobbies: { items: [] },\n  custom: {');
    
    // Add to sections array
    const sectionsAddition = `
    { id: "references", title: "References", visible: false, order: 8 },
    { id: "hobbies", title: "Hobbies", visible: false, order: 9 },
    { id: "custom",`;
    sample = sample.replace(/\{\s*id: "custom",/, sectionsAddition);
    fs.writeFileSync('src/lib/sample-data.ts', sample);
  }
}

addSections();
console.log("Types, Schema, and Data updated.");
