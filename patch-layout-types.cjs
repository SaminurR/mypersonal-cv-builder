const fs = require('fs');

// 1. types/cv.ts
let cvTs = fs.readFileSync('src/types/cv.ts', 'utf8');
if (!cvTs.includes('layout?: "vertical" | "horizontal"')) {
  cvTs = cvTs.replace(
    /export interface CustomEntry \{[\s\S]*?id: string;/,
    'export interface CustomEntry {\n  id: string;\n  url?: string;'
  );
  cvTs = cvTs.replace(
    /export interface CustomSectionData \{[\s\S]*?items: CustomEntry\[\];/,
    'export interface CustomSectionData {\n  sectionTitle: string;\n  layout?: "vertical" | "horizontal";\n  items: CustomEntry[];'
  );
  fs.writeFileSync('src/types/cv.ts', cvTs);
}

// 2. lib/cv-schema.ts
let cvSchema = fs.readFileSync('src/lib/cv-schema.ts', 'utf8');
if (!cvSchema.includes('layout: z.enum')) {
  cvSchema = cvSchema.replace(
    /custom: z\.object\(\{([\s\S]*?)items: z\.array\(\s*z\.object\(\{([\s\S]*?)id: z\.string\(\),/g,
    'custom: z.object({$1layout: z.enum(["vertical", "horizontal"]).optional(),\n      items: z.array(\n        z.object({$2id: z.string(),\n          url: z.string().optional(),'
  );
  
  // also update customSections in schema
  cvSchema = cvSchema.replace(
    /customSections: z\.record\(z\.object\(\{([\s\S]*?)items: z\.array\(\s*z\.object\(\{([\s\S]*?)id: z\.string\(\),/,
    'customSections: z.record(z.object({$1layout: z.enum(["vertical", "horizontal"]).optional(),\n      items: z.array(\n        z.object({$2id: z.string(),\n          url: z.string().optional(),'
  );
  
  fs.writeFileSync('src/lib/cv-schema.ts', cvSchema);
}

console.log('Types and Schema patched for Custom Section layout & URLs');
