const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/preview/templates/*Template.tsx');

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');

  // Insert spacing lookup in renderSection
  if (!code.includes('const spacing = sections.find')) {
    code = code.replace(
      /const renderSection = \(id: SectionId, title: string\) => \{/,
      'const renderSection = (id: SectionId, title: string) => {\n    const spacing = sections.find(sec => sec.id === id)?.spacing ?? (id === "summary" ? 24 : 24);'
    );
  }

  // Replace mb-6, mb-4, mb-8 in the root elements of case blocks with dynamic style
  // We look for: <div key={id} data-section={id} className="mb-6 ...">
  code = code.replace(
    /<div key=\{id\} data-section=\{id\} className="mb-\d+([^"]*)"/g,
    '<div key={id} data-section={id} className="$1" style={{ marginBottom: `${spacing}px` }}'
  );

  // We should also replace it if the class list has other classes first, e.g. className="break-inside-avoid mb-4
  code = code.replace(
    /<div key=\{id\} data-section=\{id\} className="([^"]*)mb-\d+([^"]*)"/g,
    '<div key={id} data-section={id} className="$1$2" style={{ marginBottom: `${spacing}px` }}'
  );

  fs.writeFileSync(file, code);
  console.log('Patched ' + file);
}
