const fs = require('fs');

// 1. Types
let t = fs.readFileSync('src/types/cv.ts', 'utf8');
t = t.replace(/pageBgColor: string;/, 'pageBgColor: string;\n  sectionTitleColor: string;\n  globalSpacing: number;');
fs.writeFileSync('src/types/cv.ts', t);

// 2. Schema
let s = fs.readFileSync('src/lib/cv-schema.ts', 'utf8');
s = s.replace(/pageBgColor: z\.string\(\),/, 'pageBgColor: z.string(),\n    sectionTitleColor: z.string().default("#0f172a"),\n    globalSpacing: z.number().default(24),');
fs.writeFileSync('src/lib/cv-schema.ts', s);

// 3. Sample Data
let d = fs.readFileSync('src/lib/sample-data.ts', 'utf8');
d = d.replace(/pageBgColor: "#ffffff",/, 'pageBgColor: "#ffffff",\n    sectionTitleColor: "#0f172a",\n    globalSpacing: 24,');
fs.writeFileSync('src/lib/sample-data.ts', d);

console.log('Types, Schema, and Sample Data updated.');
