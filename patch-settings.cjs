const fs = require('fs');
let p = 'src/components/editor/settings/SettingsEditor.tsx';
let code = fs.readFileSync(p, 'utf8');

const resetColorsBlock = `
  const resetColors = () => {
    updateSettings({
      accentColor: '#2563eb',
      textColor: '#1e293b',
      headingColor: '#0f172a',
      subheadingColor: '#334155',
      mutedColor: '#64748b',
      pageBgColor: '#ffffff'
    });
  };
`;

code = code.replace(
  /const applyRandomPalette = \(\) => \{/,
  resetColorsBlock + '\n  const applyRandomPalette = () => {'
);

const resetButtonUI = `
            <div className="flex items-center gap-3">
              <button 
                onClick={resetColors}
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-red-500 hover:text-red-600"
              >
                Reset Colors
              </button>
              <button 
                onClick={applyRandomPalette}
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-blue-600 hover:text-blue-700"
              >
                <Shuffle size={12} /> Randomize Theme
              </button>
            </div>
`;

code = code.replace(
  /<button \s*onClick=\{applyRandomPalette\}[\s\S]*?<\/button>/,
  resetButtonUI
);

fs.writeFileSync(p, code);
console.log('patched settings editor');
