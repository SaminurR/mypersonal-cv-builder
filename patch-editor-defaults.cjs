const fs = require('fs');
let p = 'src/components/editor/EditorPanel.tsx';
let code = fs.readFileSync(p, 'utf8');

// I need to merge the logic of id.startsWith('custom_') into the REAL default case at the bottom.
// Or just let the bottom default handle it.
const defaultRegex = /default:\s*if \(id === "custom"\) return <CustomSectionEditor sectionId="custom" \/>;\s*if \(id\.startsWith\("custom_"\)\) \{\s*return <CustomSectionEditor sectionId=\{id\} \/>;\s*\}/;

code = code.replace(defaultRegex, 'case "custom": return <CustomSectionEditor sectionId="custom" />;');

const bottomDefault = /default:\s*return <div className="text-sm text-slate-500 italic p-4">Coming soon\.\.\.<\/div>;/;
const newBottomDefault = `default:
        if (id.startsWith("custom_")) {
          return <CustomSectionEditor sectionId={id} />;
        }
        return <div className="text-sm text-slate-500 italic p-4">Coming soon...</div>;`;

code = code.replace(bottomDefault, newBottomDefault);
fs.writeFileSync(p, code);
console.log('Fixed EditorPanel');
