const fs = require('fs');

function addPhotoFeature() {
  // 1. types/cv.ts
  let types = fs.readFileSync('src/types/cv.ts', 'utf8');
  if (!types.includes('photoUrl?: string;')) {
    types = types.replace(/export interface HeaderData \{/, "export interface HeaderData {\n  photoUrl?: string;");
  }
  if (!types.includes('photoShape:')) {
    types = types.replace(/export interface CVSettings \{/, "export interface CVSettings {\n  photoShape: 'circle' | 'square' | 'rounded';\n  photoSize: number;");
  }
  fs.writeFileSync('src/types/cv.ts', types);

  // 2. lib/cv-schema.ts
  let schema = fs.readFileSync('src/lib/cv-schema.ts', 'utf8');
  if (!schema.includes('photoUrl:')) {
    schema = schema.replace(/fullName: z\.string\(\),/, "fullName: z.string(),\n    photoUrl: z.string().optional(),");
  }
  if (!schema.includes('photoShape:')) {
    schema = schema.replace(/pageBgColor: z\.string\(\),/, "pageBgColor: z.string(),\n    photoShape: z.enum(['circle', 'square', 'rounded']).default('circle'),\n    photoSize: z.number().default(100),");
  }
  fs.writeFileSync('src/lib/cv-schema.ts', schema);

  // 3. lib/sample-data.ts
  let sample = fs.readFileSync('src/lib/sample-data.ts', 'utf8');
  if (!sample.includes('photoShape:')) {
    sample = sample.replace(/settings: \{/, "settings: {\n    photoShape: 'circle',\n    photoSize: 100,");
  }
  fs.writeFileSync('src/lib/sample-data.ts', sample);

  // 4. HeaderEditor.tsx
  let headerEditor = fs.readFileSync('src/components/editor/sections/HeaderEditor.tsx', 'utf8');
  if (!headerEditor.includes('photoUrl')) {
    const photoUploader = `
      <div className="space-y-2 mb-4 bg-slate-50 p-3 rounded border border-slate-100">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Profile Photo</label>
        <div className="flex items-center gap-4">
          {header.photoUrl && (
            <img src={header.photoUrl} alt="Profile" className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm" />
          )}
          <div className="flex-1">
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => updateHeader({ photoUrl: reader.result as string });
                  reader.readAsDataURL(file);
                }
              }}
              className="text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          {header.photoUrl && (
            <Button variant="ghost" size="sm" onClick={() => updateHeader({ photoUrl: '' })} className="text-red-500 hover:text-red-600 hover:bg-red-50">
              Remove
            </Button>
          )}
        </div>
      </div>
    `;
    headerEditor = headerEditor.replace(/<div className="space-y-4">/, `<div className="space-y-4">\n${photoUploader}`);
    fs.writeFileSync('src/components/editor/sections/HeaderEditor.tsx', headerEditor);
  }

  // 5. SettingsEditor.tsx
  let settingsEditor = fs.readFileSync('src/components/editor/settings/SettingsEditor.tsx', 'utf8');
  if (!settingsEditor.includes('photoShape')) {
    const photoControls = `
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-800 border-b pb-1">Photo Settings</h3>
        <Select
          label="Photo Shape"
          value={settings.photoShape}
          onChange={(e) => updateSettings({ photoShape: e.target.value as any })}
          options={[
            { value: "circle", label: "Circle" },
            { value: "rounded", label: "Rounded Squares" },
            { value: "square", label: "Square" },
          ]}
        />
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Photo Size: {settings.photoSize}px</label>
          <input
            type="range"
            min="50"
            max="200"
            value={settings.photoSize}
            onChange={(e) => updateSettings({ photoSize: Number(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>
    `;
    settingsEditor = settingsEditor.replace(/\{\/\* Colors & Fonts \*\/\}/, `${photoControls}\n\n      {/* Colors & Fonts */}`);
    fs.writeFileSync('src/components/editor/settings/SettingsEditor.tsx', settingsEditor);
  }

  // 6. Templates (Adding photo logic)
  const dir = 'src/components/preview/templates';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
  
  for (const f of files) {
    const p = dir + '/' + f;
    let code = fs.readFileSync(p, 'utf8');
    
    if (!code.includes('photoUrl')) {
      // Create the photo block
      const photoBlock = `
        {data.header.photoUrl && (
          <img 
            src={data.header.photoUrl} 
            alt="Profile" 
            style={{ 
              width: \`\${settings.photoSize}px\`, 
              height: \`\${settings.photoSize}px\`,
              borderRadius: settings.photoShape === 'circle' ? '50%' : settings.photoShape === 'rounded' ? '12px' : '0',
              objectFit: 'cover',
              flexShrink: 0
            }} 
            className="shadow-sm"
          />
        )}
      `;

      // We inject it into the header wrapper. Usually <div className="mb-8"
      // Wait, to put it "top left", we can just wrap the text header in a flex container if it isn't already.
      // E.g., change `<div data-section="header" className="mb-8 ...">` to `<div data-section="header" className="mb-8 flex gap-6 items-start ...">`
      
      // Since different templates might have different header alignments (center, left, etc), we should adapt slightly.
      code = code.replace(
        /(<div\s*data-section="header"\s*className="[^"]*mb-8[^"]*"\s*style=\{\{[^}]*\}\}\s*>)/,
        `$1\n<div className="flex gap-6 items-center" style={{ flexDirection: settings.headerAlignment === 'center' ? 'column' : 'row' }}>\n${photoBlock}\n<div className="flex-1">`
      );
      
      // And we need to close the two new divs we just opened. The header usually ends before {/* Dynamic Sections */}
      // It looks like `</div>\n      )}`
      code = code.replace(
        /(<\/div>\s*)\n(\s*)\{\/\* Dynamic Sections \*\/}/,
        `  </div>\n</div>\n$1\n$2{/* Dynamic Sections */}`
      );
      
      fs.writeFileSync(p, code);
    }
  }
}

addPhotoFeature();
console.log("Photo feature integrated successfully.");
