const fs = require('fs');
let p = 'src/components/preview/PreviewPanel.tsx';
let code = fs.readFileSync(p, 'utf8');

// Inject css variable
code = code.replace(
  /'--color-muted': cv.settings.mutedColor \|\| '#64748b',/,
  '\'--color-muted\': cv.settings.mutedColor || \'#64748b\',\n              \'--cv-border-radius\': `${cv.settings.borderRadius ?? 4}px`,'
);

// Inject style block
const styleBlock = `
            >
              <style>{\`
                #cv-preview-page .rounded-sm,
                #cv-preview-page .rounded-md,
                #cv-preview-page .rounded-lg,
                #cv-preview-page .rounded-full,
                #cv-preview-page .rounded {
                  border-radius: var(--cv-border-radius) !important;
                }
              \`}</style>
`;
code = code.replace(
  /            >\s*\{cv\.settings\.template === "minimal"/,
  styleBlock + '              {cv.settings.template === "minimal"'
);

fs.writeFileSync(p, code);
console.log('PreviewPanel patched');
