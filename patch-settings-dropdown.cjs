const fs = require('fs');
let p = 'src/components/editor/settings/SettingsEditor.tsx';
let code = fs.readFileSync(p, 'utf8');

code = code.replace(
  '{ value: "classic", label: "Classic (Traditional)" },',
  '{ value: "classic", label: "Classic (Traditional)" },\n              { value: "retro", label: "Retro (Brutalist)" },'
);

fs.writeFileSync(p, code);
console.log('patched');
