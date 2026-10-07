const fs = require('fs');
const glob = require('glob');
const files = glob.sync('src/components/preview/templates/*.tsx');

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');

  // Fix MinimalTemplate and SidebarTemplate
  code = code.replace(
    /let style: React\.CSSProperties = \{\s*color: 'var\(--color-heading\)'/,
    `let style: React.CSSProperties = {\n      color: 'var(--color-section-title)'`
  );

  fs.writeFileSync(file, code);
  console.log('Patched ' + file);
}
