const fs = require('fs');
let p = 'src/components/editor/settings/SettingsEditor.tsx';
let code = fs.readFileSync(p, 'utf8');

// Add sectionTitleColor to resetColors
code = code.replace(
  /pageBgColor: '#ffffff'/,
  'pageBgColor: \'#ffffff\',\n      sectionTitleColor: \'#0f172a\''
);

// Add sectionTitleColor to applyRandomPalette
code = code.replace(
  /pageBgColor: p\.pageBgColor/,
  'pageBgColor: p.pageBgColor,\n                  sectionTitleColor: p.headingColor'
);

// Add color input for sectionTitleColor
const colorInput = `          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">Heading Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={settings.headingColor}
                onChange={(e) => updateSettings({ headingColor: e.target.value })}
                className="h-8 w-full rounded cursor-pointer border border-slate-300"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">Section Title Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={settings.sectionTitleColor ?? settings.headingColor}
                onChange={(e) => updateSettings({ sectionTitleColor: e.target.value })}
                className="h-8 w-full rounded cursor-pointer border border-slate-300"
              />
            </div>
          </div>`;

code = code.replace(
  /<div className=\"space-y-1\.5\">\s*<label className=\"text-xs font-medium text-slate-700\">Heading Color<\/label>\s*<div className=\"flex gap-2\">\s*<input\s*type=\"color\"\s*value=\{settings\.headingColor\}\s*onChange=\{\(e\) => updateSettings\(\{ headingColor: e\.target\.value \}\)\}\s*className=\"h-8 w-full rounded cursor-pointer border border-slate-300\"\s*\/>\s*<\/div>\s*<\/div>/,
  colorInput
);

// Add global spacing slider
const globalSpacingSlider = `        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Global Section Spacing: {settings.globalSpacing ?? 24}px</label>
          <input
            type="range"
            min="8"
            max="64"
            step="4"
            value={settings.globalSpacing ?? 24}
            onChange={(e) => updateSettings({ globalSpacing: Number(e.target.value) })}
            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Border Radius`;

code = code.replace(
  /<div className=\"space-y-1\.5\">\s*<label className=\"text-xs font-medium text-slate-700\">Border Radius/,
  globalSpacingSlider
);

fs.writeFileSync(p, code);
console.log('SettingsEditor updated.');
