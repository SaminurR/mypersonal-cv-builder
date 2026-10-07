const fs = require('fs');
const glob = require('glob');
const files = glob.sync('src/components/preview/templates/*.tsx');
files.push('src/components/editor/EditorPanel.tsx');

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Replace the custom block we generated previously
  code = code.replace(/case "custom":\s*default:\s*\{/g, 'default: {');
  code = code.replace(/case "custom":\s*return <CustomSectionEditor sectionId="custom" \/>;\s*default:\s*if/g, 'default:\n          if (id === "custom") return <CustomSectionEditor sectionId="custom" />;\n          if');

  fs.writeFileSync(file, code);
}
console.log('Fixed double defaults');
