const fs = require('fs');
const glob = fs.readdirSync('src/components/preview/templates').filter(f => f.endsWith('.tsx'));
glob.forEach(f => {
  let p = 'src/components/preview/templates/' + f;
  let code = fs.readFileSync(p, 'utf8');
  
  // Replace the old grid layout for languages
  const regex = /<div className="grid grid-cols-2 gap-2">[\s\S]*?\{data\.languages\.items\.map\(\(lang\) => \([\s\S]*?<\/div>\s*\)\)\}\s*<\/div>\s*<\/div>/g;
  
  const replacement = `<div className="flex flex-wrap gap-x-6 gap-y-2">
                {data.languages.items.map((lang) => (
                  <div key={lang.id} className="flex items-center gap-1.5">
                    <span className="font-medium" style={{ color: 'var(--color-subheading)' }}>{lang.language}</span>
                    {lang.proficiency && <span className="text-[0.9em]" style={{ color: 'var(--color-muted)' }}>({lang.proficiency})</span>}
                  </div>
                ))}
              </div>
            </div>`;
            
  code = code.replace(regex, replacement);
  fs.writeFileSync(p, code);
});
console.log("Languages fixed");
