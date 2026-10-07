const fs = require('fs');
let p = 'src/components/editor/EditorPanel.tsx';
let code = fs.readFileSync(p, 'utf8');

// 1. Imports
if (!code.includes('ReferencesEditor')) {
  code = code.replace(/import \{ CustomSectionEditor \} from "\.\/sections\/CustomSectionEditor";/, 
    'import { CustomSectionEditor } from "./sections/CustomSectionEditor";\nimport { ReferencesEditor } from "./sections/ReferencesEditor";\nimport { HobbiesEditor } from "./sections/HobbiesEditor";');
  
  // 2. Open state initialization
  code = code.replace(/custom: false,/, 'custom: false,\n    references: false,\n    hobbies: false,');

  // 3. Render map switch
  const renderSwitch = `
                {section.id === "references" && <ReferencesEditor />}
                {section.id === "hobbies" && <HobbiesEditor />}`;
  
  code = code.replace(/\{section.id === "custom" && <CustomSectionEditor \/>\}/, 
    `{section.id === "custom" && <CustomSectionEditor />}${renderSwitch}`);

  fs.writeFileSync(p, code);
  console.log('EditorPanel patched');
}
