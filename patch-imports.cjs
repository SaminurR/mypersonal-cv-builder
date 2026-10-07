const fs = require('fs');
let pEditor = 'src/components/editor/EditorPanel.tsx';
let pCustom = 'src/components/editor/sections/CustomSectionEditor.tsx';

let ed = fs.readFileSync(pEditor, 'utf8');
if (!ed.includes('Plus,')) {
  ed = ed.replace(/import \{([^}]+)\} from "lucide-react";/, 'import {$1, Plus} from "lucide-react";');
  fs.writeFileSync(pEditor, ed);
}

let cust = fs.readFileSync(pCustom, 'utf8');
cust = cust.replace(/import React from "react";\n/, '');
fs.writeFileSync(pCustom, cust);
console.log('Fixed imports');
