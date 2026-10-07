const fs = require('fs');

const referencesBlock = `
      case "references":
        if (!data.references.items.length) return null;
        return (
          <div key={id} data-section={id} className="mb-4 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1">
            <SectionHeading title={title} />
            <div className="grid grid-cols-2 gap-4">
              {data.references.items.map((ref) => (
                <div key={ref.id} className="break-inside-avoid">
                  <h4 className="font-bold" style={{ color: 'var(--color-subheading)' }}>{ref.name}</h4>
                  {(ref.position || ref.company) && (
                    <div className="text-[0.9em]" style={{ color: 'var(--color-muted)' }}>
                      {[ref.position, ref.company].filter(Boolean).join(", ")}
                    </div>
                  )}
                  {ref.contact && <div className="text-[0.9em] mt-0.5">{ref.contact}</div>}
                  {ref.url && (
                    <a href={ref.url} className="text-[0.9em] hover:underline" target="_blank" rel="noreferrer" style={{ color: 'var(--color-accent)' }}>
                      {ref.url.replace(/^https?:\\/\\//, '')}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
`;

const hobbiesBlock = `
      case "hobbies":
        if (!data.hobbies.items.length) return null;
        return (
          <div key={id} data-section={id} className="mb-4 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1">
            <SectionHeading title={title} />
            <div className="flex flex-wrap gap-2">
              {data.hobbies.items.map((hobby) => (
                <span key={hobby.id} className="px-2.5 py-1 bg-gray-100 rounded-full text-[0.9em]" style={{ color: 'var(--color-subheading)' }}>
                  {hobby.name}
                </span>
              ))}
            </div>
          </div>
        );
`;

function injectTemplates() {
  const dir = 'src/components/preview/templates';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
  
  for (const f of files) {
    const p = dir + '/' + f;
    let code = fs.readFileSync(p, 'utf8');
    
    if (!code.includes('case "references":')) {
      code = code.replace(/case "custom":/, referencesBlock + '\n' + hobbiesBlock + '\n      case "custom":');
      fs.writeFileSync(p, code);
    }
  }
}

injectTemplates();
console.log("Templates updated with References and Hobbies.");
