const fs = require('fs');
let p = 'src/components/preview/templates/MinimalTemplate.tsx';
let code = fs.readFileSync(p, 'utf8');

const newHeader = `
          <div data-section="header" className="mb-8 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer relative"
          >
            <div className="flex gap-6 items-center w-full" style={{ flexDirection: 'row' }}>
              
              {/* Photo Left OR Spacer for Center Alignment */}
              {(data.header.photoUrl && settings.photoPosition === 'left') ? (
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
              ) : (
                settings.headerAlignment === 'center' && data.header.photoUrl ? <div style={{ width: \`\${settings.photoSize}px\`, flexShrink: 0 }} /> : null
              )}

              {/* Text Info */}
              <div className="flex-1 w-full" style={{ textAlign: settings.headerAlignment as any }}>
                <h1
                  className="text-4xl font-extrabold mb-1 tracking-tight"
                  style={{ color: 'var(--color-heading)' }}
                >
                  {data.header.fullName}
                </h1>
                <h2 className="text-xl font-medium text-gray-600 mb-4">
                  {data.header.title}
                </h2>
                <div
                  className={\`flex flex-wrap gap-x-4 gap-y-2 text-[0.9em] text-gray-600 \${
                    settings.headerAlignment === "center" ? "justify-center" : "justify-start"
                  }\`}
                >
                  {data.header.contacts.map((contact) => {
                    if (!contact.value) return null;
                    return (
                      <div key={contact.id} className="flex items-center gap-1.5">
                        <span style={{ color: 'var(--color-accent)' }}>
                          {ICONS[contact.icon] || <span />}
                        </span>
                        {contact.url ? (
                          <a
                            href={contact.url}
                            className="no-underline text-inherit"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <span>{contact.value}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Photo Right OR Spacer for Center Alignment */}
              {(data.header.photoUrl && settings.photoPosition !== 'left') ? (
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
                  className="shadow-sm ml-auto"
                />
              ) : (
                settings.headerAlignment === 'center' && data.header.photoUrl ? <div style={{ width: \`\${settings.photoSize}px\`, flexShrink: 0 }} /> : null
              )}

            </div>
          </div>
`;

code = code.replace(/<div data-section="header"[\s\S]*?(?=\{\/\* Dynamic Sections \*\/)/, newHeader + "      ");
fs.writeFileSync(p, code);
console.log('MinimalTemplate fixed');
