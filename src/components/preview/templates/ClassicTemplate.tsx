import React from "react";
import type { CVData, SectionId } from "../../../types/cv";
import { SkillGroupPreview } from "./SkillGroupPreview";

interface MinimalTemplateProps {
  data: CVData;
}

export function ClassicTemplate({ data }: MinimalTemplateProps) {
  const { settings, sections } = data;
  const { accentColor, textColor, headingStyle, fontSizeScale } = settings;

  const baseFontSize = 14 * fontSizeScale;

  const SectionHeading = ({ title }: { title: string }) => {
    let style: React.CSSProperties = {
      color: 'var(--color-heading)',
      fontSize: "1.15em",
      marginBottom: "0.5em",
      marginTop: "1em",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      borderBottom: `2px solid ${accentColor}`,
      paddingBottom: "0.2em",
    };

    if (headingStyle === "small-caps") {
      style.fontVariant = "small-caps";
      style.textTransform = "none";
    }

    return (
      <h3 style={style} className="break-after-avoid text-center">
        {title}
      </h3>
    );
  };

  const renderSection = (id: SectionId, title: string) => {
    switch (id) {
      case "summary":
        if (!data.summary.text) return null;
        return (
          <div key={id} data-section={id} className="mb-4 break-inside-avoid hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1">
            <SectionHeading title={title} />
            <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6, textAlign: "justify" }}>
              {data.summary.text}
            </p>
          </div>
        );

      case "experience":
        if (!data.experience.items.length) return null;
        return (
          <div key={id} data-section={id} className="mb-4 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1">
            <SectionHeading title={title} />
            <div className="flex flex-col gap-4">
              {data.experience.items.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-bold text-[1.05em]">{exp.position}</h4>
                    <span className="text-[0.9em] font-bold" style={{ color: 'var(--color-accent)' }}>
                      {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ""}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-medium italic">{exp.company}</span>
                    <span className="text-[0.9em] text-gray-600">{exp.location}</span>
                  </div>
                  <ul className="list-disc list-outside space-y-1 ml-5">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="text-[0.9em] leading-relaxed pl-1">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case "skills":
        if (!data.skills.groups.length) return null;
        return (
          <div key={id} data-section={id} className="mb-4 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1">
            <SectionHeading title={title} />
            {data.skills.groups.map((group) => (
              <SkillGroupPreview key={group.id} group={group} globalAccent={accentColor} />
            ))}
          </div>
        );

      case "education":
        if (!data.education.items.length) return null;
        return (
          <div key={id} data-section={id} className="mb-4 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1">
            <SectionHeading title={title} />
            <div className="flex flex-col gap-3">
              {data.education.items.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-bold">{edu.degree} in {edu.field}</h4>
                    <span className="text-[0.9em] font-bold" style={{ color: 'var(--color-accent)' }}>
                      {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ""}
                    </span>
                  </div>
                  <div className="text-[0.95em] italic mb-1">{edu.institution}</div>
                  {edu.description && (
                    <p className="text-[0.9em] text-gray-600 mt-1">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "projects":
        if (!data.projects.items.length) return null;
        return (
          <div key={id} data-section={id} className="mb-4 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1">
            <SectionHeading title={title} />
            <div className="flex flex-col gap-3">
              {data.projects.items.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold">{proj.name}</h4>
                    {proj.url && (
                      <a href={proj.url} className="text-[0.85em] text-blue-600 underline" target="_blank" rel="noreferrer">
                        View Project
                      </a>
                    )}
                  </div>
                  <p className="text-[0.9em] leading-relaxed mb-1.5">
                    {proj.description}
                  </p>
                  {proj.technologies.length > 0 && (
                    <div className="text-[0.85em] text-gray-600 italic">
                      Technologies: {proj.technologies.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "languages":
        if (!data.languages.items.length) return null;
        return (
          <div key={id} data-section={id} className="mb-4 break-inside-avoid hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1">
            <SectionHeading title={title} />
            <div className="flex justify-center flex-wrap gap-6">
              {data.languages.items.map((lang) => (
                <div key={lang.id} className="flex flex-col items-center">
                  <span className="font-bold">{lang.language}</span>
                  <span className="text-gray-600 text-[0.9em] italic">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "certificates":
        if (!data.certificates.items.length) return null;
        return (
          <div key={id} data-section={id} className="mb-4 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1">
            <SectionHeading title={title} />
            <div className="flex flex-col gap-2">
              {data.certificates.items.map((cert) => (
                <div key={cert.id} className="break-inside-avoid flex justify-between items-baseline">
                  <div>
                    <h4 className="font-bold">{cert.name}</h4>
                    <div className="text-[0.9em] text-gray-600 italic">{cert.issuer}</div>
                  </div>
                  <div className="text-[0.9em] font-bold" style={{ color: 'var(--color-accent)' }}>
                    {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      
      case "references":
        if (!data.references.items.length) return null;
        return (
          <div key={id} data-section={id} className="mb-4 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1">
            <SectionHeading title={title} />
            <div className="grid grid-cols-2 gap-4">
              {data.references.items.map((ref: any) => (
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
                      {ref.url.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        );


      case "hobbies":
        if (!data.hobbies.items.length) return null;
        return (
          <div key={id} data-section={id} className="mb-4 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1">
            <SectionHeading title={title} />
            <div className="flex flex-wrap gap-2">
              {data.hobbies.items.map((hobby: any) => (
                <span key={hobby.id} className="px-2.5 py-1 bg-gray-100 rounded-full text-[0.9em]" style={{ color: 'var(--color-subheading)' }}>
                  {hobby.name}
                </span>
              ))}
            </div>
          </div>
        );

      case "custom":
        if (!data.custom.items.length) return null;
        return (
          <div key={id} data-section={id} className="mb-4 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1">
            <SectionHeading title={title || data.custom.sectionTitle} />
            <div className="flex flex-col gap-3">
              {data.custom.items.map((item) => (
                <div key={item.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-bold">{item.title}</h4>
                    {item.date && (
                      <span className="text-[0.9em] font-bold" style={{ color: 'var(--color-accent)' }}>
                        {item.date}
                      </span>
                    )}
                  </div>
                  {item.subtitle && <div className="text-[0.95em] italic mb-1">{item.subtitle}</div>}
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

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        fontSize: `${baseFontSize}px`,
        color: textColor,
        lineHeight: 1.6,
        fontFamily: settings.fontFamily.includes("Serif") || settings.fontFamily === "Georgia" ? settings.fontFamily : "Georgia, serif", // Enforce serif feel if not explicitly set
      }}
    >
      {/* Header */}
      {sections.find((s) => s.id === "header")?.visible && (
        <div className="mb-6 text-center border-b-4 double pb-4" style={{ borderBottomColor: accentColor, borderBottomStyle: 'double' }}>
          <h1
            className="text-4xl font-serif mb-1 tracking-wide uppercase"
            style={{ color: 'var(--color-heading)' }}
          >
            {data.header.fullName}
          </h1>
          <h2 className="text-xl italic text-gray-700 mb-3 font-serif">
            {data.header.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[0.9em] text-gray-600">
            {data.header.contacts.map((contact, index) => {
              if (!contact.value) return null;
              return (
                <React.Fragment key={contact.id}>
                  {index > 0 && <span className="text-gray-400">•</span>}
                  <div className="flex items-center">
                    {contact.url ? (
                      <a href={contact.url} className="text-inherit hover:underline" target="_blank" rel="noreferrer">
                        {contact.value}
                      </a>
                    ) : (
                      <span>{contact.value}</span>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
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
