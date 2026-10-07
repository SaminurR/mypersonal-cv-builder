const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/preview/templates/*.tsx');

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');

  // We need to inject the layout branch inside the `if (id === "custom" || id.startsWith("custom_"))` block.
  // The structure is:
  // if (!sectionData || !sectionData.items || !sectionData.items.length) return null;
  // return ( ... vertical layout ... )

  // Let's replace `return (\n              <div key={id} data-section={id}`
  // with
  // `const isHorizontal = sectionData.layout === 'horizontal';\n            if (isHorizontal) {\n ... \n            }\n            return (\n              <div key={id} data-section={id}`
  
  const horizontalBlock = `
            const isHorizontal = sectionData.layout === 'horizontal';
            if (isHorizontal) {
              return (
                <div key={id} data-section={id} className="hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: \`\${spacing}px\` }}>
                  ${file.includes('ClassicTemplate') ? '<h3 style={headingStyle}>{title}</h3>' : (file.includes('CompactTemplate') ? '<h3 className="text-md font-bold mb-2 uppercase" style={{ color: \'var(--color-section-title)\' }}>{title}</h3>' : '<SectionHeading title={title} />')}
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {sectionData.items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-1.5 break-inside-avoid">
                        {item.url ? (
                          <a href={item.url.startsWith('http') ? item.url : \`https://\${item.url}\`} target="_blank" rel="noreferrer" className="font-medium hover:underline flex items-center gap-1" style={{ color: 'var(--color-heading)' }}>
                            {item.title}
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                          </a>
                        ) : (
                          <span className="font-medium" style={{ color: 'var(--color-heading)' }}>{item.title}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div key={id} data-section={id}`;

  code = code.replace(
    /if \(!sectionData \|\| !sectionData\.items \|\| !sectionData\.items\.length\) return null;\s*return \(\s*<div key=\{id\} data-section=\{id\}/,
    `if (!sectionData || !sectionData.items || !sectionData.items.length) return null;${horizontalBlock}`
  );

  fs.writeFileSync(file, code);
  console.log('Patched layout branch into ' + file);
}
