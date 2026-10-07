import React from "react";
import type { CVData, CVSettings, SectionId } from "../../../types/cv";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface RetroTemplateProps {
  data: CVData;
  settings: CVSettings;
}

const ICONS: Record<string, React.ReactNode> = {
  email: <Mail size={12} />,
  phone: <Phone size={12} />,
  location: <MapPin size={12} />,
  website: <Globe size={12} />,
  github: <Globe size={12} />,
  linkedin: <Globe size={12} />,
};

function SectionHeading({ title }: { title: string }) {
  return (
    <h3 
      className="text-lg font-bold mb-3 uppercase tracking-widest border-b-4 border-black pb-1 inline-block"
      style={{ color: 'var(--color-section-title)', borderColor: 'var(--color-heading)' }}
    >
      {title}
    </h3>
  );
}

export function RetroTemplate({ data, settings }: RetroTemplateProps) {
  const { sections } = data;
  const baseFontSize = settings.fontSizeScale * 14;
  const textColor = 'var(--color-text)';

  const renderSection = (id: SectionId, title: string) => {
    const spacing = sections.find(sec => sec.id === id)?.spacing ?? settings.globalSpacing ?? 24;
    switch (id) {
      case "summary":
        if (!data.summary.text) return null;
        return (
          <div key={id} data-section={id} className=" hover:outline-dashed hover:outline-2 hover:outline-blue-300 transition-all cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: `${spacing}px` }}>
            <SectionHeading title={title} />
            <p className="whitespace-pre-wrap font-mono text-[0.95em] leading-relaxed border-l-4 pl-4 py-1" style={{ borderColor: 'var(--color-accent)' }}>
              {data.summary.text}
            </p>
          </div>
        );

      case "experience":
      case "education":
      case "projects":
      case "certificates":
      default: {
          if (id === "custom" || id.startsWith("custom_")) {
            const sectionData = id === "custom" ? (data.custom as any) : (data.customSections?.[id] as any);
            if (!sectionData || !sectionData.items || !sectionData.items.length) return null;
            const isHorizontal = sectionData.layout === 'horizontal';
            if (isHorizontal) {
              return (
                <div key={id} data-section={id} className="hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: `${spacing}px` }}>
                  <SectionHeading title={title} />
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {sectionData.items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-1.5 break-inside-avoid">
                        {item.url ? (
                          <a href={item.url.startsWith('http') ? item.url : `https://${item.url}`} target="_blank" rel="noreferrer" className="font-medium hover:underline flex items-center gap-1" style={{ color: 'var(--color-heading)' }}>
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
              <div key={id} data-section={id} className="mb-6 hover:outline-dashed hover:outline-2 hover:outline-blue-300 transition-all cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: `${spacing}px` }}>
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
}
  };

  return (
    <div
      style={{
        fontSize: `${baseFontSize}px`,
        color: textColor,
        lineHeight: 1.4,
        fontFamily: settings.fontFamily.includes("Mono") ? settings.fontFamily : "Courier New, monospace",
      }}
      className="p-6 border-8 border-black m-2 bg-white"
    >
      {/* Header */}
      {sections.find((s) => s.id === "header")?.visible && (
        <div data-section="header" className="mb-8 hover:outline-dashed hover:outline-2 hover:outline-blue-300 transition-all cursor-pointer relative border-b-4 border-black pb-6"
        >
          <div className="flex gap-6 items-center w-full" style={{ flexDirection: 'row' }}>
            
            {/* Photo Left OR Spacer for Center Alignment */}
            {(data.header.photoUrl && settings.photoPosition === 'left') ? (
              <img 
                src={data.header.photoUrl} 
                alt="Profile" 
                style={{ 
                  width: `${settings.photoSize}px`, 
                  height: `${settings.photoSize}px`,
                  objectFit: 'cover',
                  flexShrink: 0
                }} 
                className="border-4 border-black shadow-[4px_4px_0_0_black] bg-white"
              />
            ) : (
              settings.headerAlignment === 'center' && data.header.photoUrl ? <div style={{ width: `${settings.photoSize}px`, flexShrink: 0 }} /> : null
            )}

            {/* Text Info */}
            <div className="flex-1 w-full" style={{ textAlign: settings.headerAlignment as any }}>
              <h1
                className="text-5xl font-black mb-2 uppercase tracking-tighter"
                style={{ color: 'var(--color-heading)' }}
              >
                {data.header.fullName}
              </h1>
              <h2 className="text-xl font-bold bg-black text-white inline-block px-3 py-1 mb-4 uppercase">
                {data.header.title}
              </h2>
              <div
                className={`flex flex-wrap gap-x-4 gap-y-2 text-[0.9em] font-bold ${
                  settings.headerAlignment === "center" ? "justify-center" : "justify-start"
                }`}
              >
                {data.header.contacts.map((contact) => {
                  if (!contact.value) return null;
                  return (
                    <div key={contact.id} className="flex items-center gap-1.5 border-2 border-black px-2 py-1 bg-yellow-50" style={{ boxShadow: '2px 2px 0 0 black' }}>
                      <span className="text-black">
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
                  width: `${settings.photoSize}px`, 
                  height: `${settings.photoSize}px`,
                  objectFit: 'cover',
                  flexShrink: 0
                }} 
                className="border-4 border-black shadow-[4px_4px_0_0_black] bg-white ml-auto"
              />
            ) : (
              settings.headerAlignment === 'center' && data.header.photoUrl ? <div style={{ width: `${settings.photoSize}px`, flexShrink: 0 }} /> : null
            )}

          </div>
        </div>
      )}

      {/* Dynamic Sections */}
      {sections
        .filter((s) => s.visible && s.id !== "header")
        .sort((a, b) => a.order - b.order)
        .map((s) => renderSection(s.id, s.title))}
    </div>
  );
}
