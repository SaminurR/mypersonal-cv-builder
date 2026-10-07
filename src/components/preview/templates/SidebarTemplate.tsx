import type { CVData, SectionId } from "../../../types/cv";
import { SkillGroupPreview } from "./SkillGroupPreview";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Link as LinkIcon,
} from "lucide-react";

interface MinimalTemplateProps {
  data: CVData;
}

const ICONS: Record<string, React.ReactNode> = {
  mail: <Mail size={12} />,
  phone: <Phone size={12} />,
  "map-pin": <MapPin size={12} />,
  globe: <Globe size={12} />,
  linkedin: <Globe size={12} />, // fallback
  github: <Globe size={12} />, // fallback
};

export function SidebarTemplate({ data }: MinimalTemplateProps) {
  const { settings, sections } = data;
  const { accentColor, textColor, headingStyle, fontSizeScale, layout, sidebarWidth } = settings;

  const baseFontSize = 14 * fontSizeScale;

  const SectionHeading = ({ title }: { title: string }) => {
    let style: React.CSSProperties = {
      color: 'var(--color-section-title)',
      fontSize: "1.2em",
      marginBottom: "0.5em",
      fontWeight: "bold",
    };

    if (headingStyle === "uppercase") {
      style.textTransform = "uppercase";
      style.letterSpacing = "0.05em";
    } else if (headingStyle === "underline") {
      style.borderBottom = `1px solid ${accentColor}`;
      style.paddingBottom = "0.2em";
    } else if (headingStyle === "small-caps") {
      style.fontVariant = "small-caps";
      style.fontSize = "1.3em";
    }

    return (
      <h3 style={style} className="mt-6 mb-3 break-after-avoid">
        {title}
      </h3>
    );
  };

  const renderSection = (id: SectionId, title: string) => {
    const spacing = sections.find(sec => sec.id === id)?.spacing ?? settings.globalSpacing ?? 24;
    switch (id) {
      case "summary":
        if (!data.summary.text) return null;
        return (
          <div key={id} data-section={id} className=" break-inside-avoid hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: `${spacing}px` }}>
            <SectionHeading title={title} />
            <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
              {data.summary.text}
            </p>
          </div>
        );

      case "experience":
        if (!data.experience.items.length) return null;
        return (
          <div key={id} data-section={id} className=" hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: `${spacing}px` }}>
            <SectionHeading title={title} />
            <div className="flex flex-col gap-4">
              {data.experience.items.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-[1.05em]">{exp.position}</h4>
                    <span
                      className="text-[0.9em] font-medium"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ""}
                      {exp.years && ` (${exp.years})`}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2 text-[0.95em]">
                    <span className="font-medium">{exp.company}</span>
                    <span className="text-[color:var(--color-muted)]">{exp.location}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="text-[0.9em] leading-relaxed ml-2 -indent-4 pl-4">
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
          <div key={id} data-section={id} className=" hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: `${spacing}px` }}>
            <SectionHeading title={title} />
            {data.skills.groups.map((group) => (
              <SkillGroupPreview
                key={group.id}
                group={group}
                globalAccent={accentColor}
              />
            ))}
          </div>
        );

      case "education":
        if (!data.education.items.length) return null;
        return (
          <div key={id} data-section={id} className=" hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: `${spacing}px` }}>
            <SectionHeading title={title} />
            <div className="flex flex-col gap-3">
              {data.education.items.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-bold">{edu.degree} in {edu.field}</h4>
                    <span
                      className="text-[0.9em] font-medium"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ""}
                    </span>
                  </div>
                  <div className="text-[0.95em] mb-1">{edu.institution}</div>
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
          <div key={id} data-section={id} className=" hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: `${spacing}px` }}>
            <SectionHeading title={title} />
            <div className="flex flex-col gap-3">
              {data.projects.items.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold">{proj.name}</h4>
                    {proj.url && (
                      <a
                        href={proj.url}
                        className="text-gray-400 no-underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <LinkIcon size={12} />
                      </a>
                    )}
                  </div>
                  <p className="text-[0.9em] leading-relaxed mb-1.5">
                    {proj.description}
                  </p>
                  {proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[0.8em] rounded-sm"
                        >
                          {t}
                        </span>
                      ))}
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
          <div key={id} data-section={id} className=" break-inside-avoid hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: `${spacing}px` }}>
            <SectionHeading title={title} />
            <div className="flex flex-col gap-2">
              {data.languages.items.map((lang) => (
                <div key={lang.id} className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="font-medium">{lang.language}</span>
                  <span className="text-gray-600 text-[0.9em]">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "certificates":
        if (!data.certificates.items.length) return null;
        return (
          <div key={id} data-section={id} className=" hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: `${spacing}px` }}>
            <SectionHeading title={title} />
            <div className="flex flex-col gap-2">
              {data.certificates.items.map((cert) => (
                <div key={cert.id} className="break-inside-avoid flex flex-col justify-between items-start gap-1">
                  <div>
                    <h4 className="font-bold">{cert.name}</h4>
                    <div className="text-[0.9em] text-gray-600">
                      {cert.issuer}
                    </div>
                  </div>
                  <div className="text-[0.9em] font-medium" style={{ color: 'var(--color-accent)' }}>
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
          <div key={id} data-section={id} className=" hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: `${spacing}px` }}>
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
          <div key={id} data-section={id} className=" hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: `${spacing}px` }}>
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
              <div key={id} data-section={id} className=" hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1" style={{ marginBottom: `${spacing}px` }}>
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
}
  };

  const isLeftSidebar = layout !== "right-sidebar";
  const actualSidebarWidth = sidebarWidth || 35; // default 35%
  const sidebarSections = ["skills", "languages", "certificates"];
  const mainSections = ["summary", "experience", "education", "projects", "custom"];

  return (
    <div
      style={{
        fontSize: `${baseFontSize}px`,
        color: textColor,
        lineHeight: 1.5,
        display: "flex",
        flexDirection: isLeftSidebar ? "row" : "row-reverse",
        gap: "2rem",
      }}
    >
      {/* Sidebar Column */}
      <div style={{ width: `${actualSidebarWidth}%` }} className="flex flex-col shrink-0">
        {/* Header inside sidebar */}
        {sections.find((s) => s.id === "header")?.visible && (
          <div className="mb-6">
            <h1
              className="text-3xl font-extrabold mb-1 tracking-tight leading-tight"
              style={{ color: 'var(--color-heading)' }}
            >
              {data.header.fullName}
            </h1>
            <h2 className="text-lg font-medium text-gray-600 mb-4 leading-tight">
              {data.header.title}
            </h2>
            <div className="flex flex-col gap-2 text-[0.9em] text-gray-600">
              {data.header.contacts.map((contact) => {
                if (!contact.value) return null;
                return (
                  <div key={contact.id} className="flex items-center gap-2">
                    <span style={{ color: 'var(--color-accent)' }}>
                      {ICONS[contact.icon] || <LinkIcon size={12} />}
                    </span>
                    {contact.url ? (
                      <a
                        href={contact.url}
                        className="no-underline text-inherit break-all"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <span className="break-all">{contact.value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {sections
          .filter((s) => s.visible && sidebarSections.includes(s.id))
          .sort((a, b) => a.order - b.order)
          .map((s) => renderSection(s.id, s.title))}
      </div>

      {/* Main Column */}
      <div style={{ width: `${100 - actualSidebarWidth}%` }} className="flex flex-col">
        {sections
          .filter((s) => s.visible && mainSections.includes(s.id))
          .sort((a, b) => a.order - b.order)
          .map((s) => renderSection(s.id, s.title))}
      </div>
    </div>
  );
}
