const fs = require('fs');
let p = 'src/components/editor/settings/SettingsEditor.tsx';
let code = fs.readFileSync(p, 'utf8');

if (!code.includes('PhotoUploader')) {
  code = code.replace(/import \{ Select \} from "\.\.\/\.\.\/ui\/Select";/, 'import { Select } from "../../ui/Select";\nimport { PhotoUploader } from "../../ui/PhotoUploader";');
  
  code = code.replace(/const updateSettings = useCVStore\(\(state\) => state.updateSettings\);/, 'const updateSettings = useCVStore((state) => state.updateSettings);\n  const header = useCVStore((state) => state.cv.header);\n  const updateHeader = useCVStore((state) => state.updateHeader);');
  
  const photoSettingsContent = `
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-800 border-b pb-1">Profile Photo</h3>
        <PhotoUploader value={header.photoUrl} onChange={(url) => updateHeader({ photoUrl: url })} />
        <div className="space-y-3">
`;
  code = code.replace(/<div className="space-y-3">\s*<h3 className="text-sm font-semibold text-slate-800 border-b pb-1">Photo Settings<\/h3>/, photoSettingsContent);
  
  const photoPositionSelect = `
          <Select
            label="Photo Position"
            value={settings.photoPosition || 'right'}
            onChange={(e) => updateSettings({ photoPosition: e.target.value as any })}
            options={[
              { value: "left", label: "Left" },
              { value: "right", label: "Right" },
            ]}
          />
`;
  code = code.replace(/<Select\s*label="Photo Shape"/, photoPositionSelect + '        <Select\n          label="Photo Shape"');

  fs.writeFileSync(p, code);
  console.log('SettingsEditor updated with PhotoUploader');
}
