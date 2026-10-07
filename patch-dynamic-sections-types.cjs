const fs = require('fs');

// 1. types/cv.ts
let cvTs = fs.readFileSync('src/types/cv.ts', 'utf8');
cvTs = cvTs.replace(
  /export type SectionId =[^;]+;/,
  'export type SectionId = "header" | "summary" | "experience" | "skills" | "education" | "projects" | "languages" | "certificates" | "references" | "hobbies" | "custom" | (string & {});'
);
cvTs = cvTs.replace(
  /custom: CustomSectionData;/,
  'custom: CustomSectionData;\n  customSections?: Record<string, CustomSectionData>;'
);
fs.writeFileSync('src/types/cv.ts', cvTs);

// 2. lib/cv-schema.ts
let cvSchema = fs.readFileSync('src/lib/cv-schema.ts', 'utf8');
const customRegex = /(custom: z\.object\(\{[\s\S]*?\}\)\)),/;
cvSchema = cvSchema.replace(
  customRegex,
  '$1,\n    customSections: z.record(z.object({\n      sectionTitle: z.string(),\n      items: z.array(\n        z.object({\n          id: z.string(),\n          title: z.string(),\n          subtitle: z.string(),\n          date: z.string(),\n          description: z.string(),\n        })\n      )\n    })).optional(),'
);
fs.writeFileSync('src/lib/cv-schema.ts', cvSchema);
console.log('Types and Schema patched');
