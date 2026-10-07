const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/preview/templates/*Template.tsx');

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');

  // Replace var(--color-heading) inside SectionHeading with var(--color-section-title)
  // Wait, the SectionHeading usually looks like:
  // style={{ color: 'var(--color-heading)'
  // We should be careful to only replace it inside SectionHeading.
  // Using a regex for SectionHeading:
  code = code.replace(
    /function SectionHeading([\s\S]*?)style=\{\{([\s\S]*?)color: 'var\(--color-heading\)'([\s\S]*?)\}\}/g,
    'function SectionHeading$1style={{$2color: \'var(--color-section-title)\'$3}}'
  );

  // ClassicTemplate doesn't have a separate SectionHeading function, it renders it inline:
  // style={headingStyle} where headingStyle has color: 'var(--color-heading)'
  code = code.replace(
    /const headingStyle: React\.CSSProperties = \{[\s\S]*?color: 'var\(--color-heading\)'/g,
    (match) => match.replace('var(--color-heading)', 'var(--color-section-title)')
  );
  
  // CompactTemplate renders it inline in each switch case!
  // color: 'var(--color-heading)'
  // Just blanket replace all inline `color: 'var(--color-heading)'` inside uppercase section titles in CompactTemplate
  // Actually, wait, CompactTemplate has: `<h3 className="text-md font-bold mb-2 uppercase" style={{ color: 'var(--color-heading)' }}>`
  // And RetroTemplate has it inside SectionHeading.
  if (file.includes('CompactTemplate')) {
    code = code.replace(
      /className="text-md font-bold mb-2 uppercase" style=\{\{ color: 'var\(--color-heading\)' \}\}/g,
      'className="text-md font-bold mb-2 uppercase" style={{ color: \'var(--color-section-title)\' }}'
    );
  }

  // Update fallback for spacing
  code = code.replace(
    /\?\? \(id === "summary" \? 24 : 24\)/g,
    '?? settings.globalSpacing ?? 24'
  );

  fs.writeFileSync(file, code);
  console.log('Patched ' + file);
}
