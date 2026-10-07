const fs = require('fs');

let t = 'src/components/preview/templates/ClassicTemplate.tsx';
let c = fs.readFileSync(t, 'utf8');
c = c.replace(/<h3 style=\{headingStyle\}>\{title\}<\/h3>/g, '<SectionHeading title={title} />');
fs.writeFileSync(t, c);

let ed = 'src/components/editor/sections/CustomSectionEditor.tsx';
let e = fs.readFileSync(ed, 'utf8');
e = e.replace(/\|\| \{ items: \[\] \}/g, '|| { items: [] as any[], layout: "vertical" as const }');
fs.writeFileSync(ed, e);
