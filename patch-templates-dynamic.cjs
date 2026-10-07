const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/preview/templates/*.tsx');

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');

  // Replace `case "custom":` block with dynamic rendering
  // The block goes until `default:` or end of switch
  const customRegex = /case "custom":[\s\S]*?(?=default:)/;
  
  if (code.match(customRegex)) {
    const isCompact = file.includes('CompactTemplate');
    const isSidebar = file.includes('SidebarTemplate');
    const isMinimal = file.includes('MinimalTemplate');
    const isClassic = file.includes('ClassicTemplate');
    const isRetro = file.includes('RetroTemplate');
    
    let replacement = `case "custom":
        default: {
          if (id === "custom" || id.startsWith("custom_")) {
            const sectionData = id === "custom" ? (data.custom as any) : (data.customSections?.[id] as any);
            if (!sectionData || !sectionData.items || !sectionData.items.length) return null;
            return (
              <div key={id} data-section={id} className=" hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: \`\${spacing}px\` }}>
                <SectionHeading title={title} />
                <div className="flex flex-col gap-3">
                  {sectionData.items.map((item: any) => (
                    <div key={item.id} className="break-inside-avoid">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="font-bold">{item.title}</h4>
                        {item.date && (
                          <span
                            className="text-[0.9em] font-medium"
                            style={{ color: 'var(--color-accent)' }}
                          >
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && <div className="text-[0.95em] mb-1">{item.subtitle}</div>}
                      {item.description && (
                        <p className="text-[0.9em] leading-relaxed text-gray-700">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        }
`;

    // Overrides for specific templates formatting
    if (isClassic) {
      replacement = `case "custom":
        default: {
          if (id === "custom" || id.startsWith("custom_")) {
            const sectionData = id === "custom" ? (data.custom as any) : (data.customSections?.[id] as any);
            if (!sectionData || !sectionData.items || !sectionData.items.length) return null;
            return (
              <div key={id} data-section={id} className="mb-4 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: \`\${spacing}px\` }}>
                <h3 style={headingStyle}>{title}</h3>
                <div className="flex flex-col gap-3">
                  {sectionData.items.map((item: any) => (
                    <div key={item.id} className="break-inside-avoid">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="font-bold">{item.title}</h4>
                        {item.date && (
                          <span className="text-[0.9em] font-medium" style={{ color: 'var(--color-accent)' }}>
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && <div className="text-[0.95em] mb-1">{item.subtitle}</div>}
                      {item.description && (
                        <p className="text-[0.9em] leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        }
`;
    }
    
    if (isCompact) {
      replacement = `case "custom":
        default: {
          if (id === "custom" || id.startsWith("custom_")) {
            const sectionData = id === "custom" ? (data.custom as any) : (data.customSections?.[id] as any);
            if (!sectionData || !sectionData.items || !sectionData.items.length) return null;
            return (
              <div key={id} data-section={id} className="mb-4 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: \`\${spacing}px\` }}>
                <h3 className="text-md font-bold mb-2 uppercase" style={{ color: 'var(--color-section-title)' }}>
                  {title}
                </h3>
                <div className="flex flex-col gap-2">
                  {sectionData.items.map((item: any) => (
                    <div key={item.id} className="break-inside-avoid text-[0.9em]">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold">{item.title}</span>
                        {item.date && (
                          <span className="text-[0.9em] font-medium" style={{ color: 'var(--color-accent)' }}>
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && <div className="mb-0.5">{item.subtitle}</div>}
                      {item.description && (
                        <p className="leading-snug text-gray-700">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        }
`;
    }
    
    if (isRetro) {
      replacement = `case "custom":
        default: {
          if (id === "custom" || id.startsWith("custom_")) {
            const sectionData = id === "custom" ? (data.custom as any) : (data.customSections?.[id] as any);
            if (!sectionData || !sectionData.items || !sectionData.items.length) return null;
            return (
              <div key={id} data-section={id} className="mb-6 hover:outline-dashed hover:outline-2 hover:outline-blue-300 transition-all cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: \`\${spacing}px\` }}>
                <SectionHeading title={title} />
                <div className="flex flex-col gap-4">
                  {sectionData.items.map((item: any) => (
                    <div key={item.id} className="border-2 border-black p-3" style={{ boxShadow: '4px 4px 0 0 var(--color-accent)' }}>
                      <div className="flex justify-between items-baseline border-b-2 border-dotted border-gray-400 pb-2 mb-2">
                        <div>
                          <h4 className="font-bold text-lg uppercase">{item.title}</h4>
                          {item.subtitle && (
                            <div className="text-[0.9em] font-bold" style={{ color: 'var(--color-subheading)' }}>
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          {item.date && (
                            <div className="text-[0.9em] font-mono bg-gray-200 px-2 py-0.5 border border-black inline-block">
                              {item.date}
                            </div>
                          )}
                        </div>
                      </div>
                      {item.description && (
                        <div
                          className="text-[0.9em] leading-relaxed pl-3 font-mono"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        }
`;
    }

    code = code.replace(customRegex, replacement);
    fs.writeFileSync(file, code);
    console.log('Patched templates case ' + file);
  }
}
