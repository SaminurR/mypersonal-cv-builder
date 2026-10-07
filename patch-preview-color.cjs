const fs = require('fs');
let p = 'src/components/preview/PreviewPanel.tsx';
let code = fs.readFileSync(p, 'utf8');

code = code.replace(
  /'--color-muted': cv.settings.mutedColor \|\| '#64748b',/,
  '\'--color-muted\': cv.settings.mutedColor || \'#64748b\',\n                \'--color-section-title\': cv.settings.sectionTitleColor || cv.settings.headingColor || cv.settings.textColor,'
);

fs.writeFileSync(p, code);
console.log('PreviewPanel updated.');
