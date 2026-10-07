import type { CVData, SectionId } from "../../../types/cv";
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

export function CompactTemplate({ data }: MinimalTemplateProps) {
  const { settings, sections } = data;
  const { accentColor, textColor, headingStyle, fontSizeScale } = settings;

  // Make everything smaller in compact mode
  const baseFontSize = 13 * fontSizeScale;

  const SectionHeading = ({ title }: { title: string }) => {
    let style: React.CSSProperties = {
      color: 'var(--color-heading)',
      fontSize: "1.1em",
      marginBottom: "0.2em",
      marginTop: "0.5em",
      fontWeight: "bold",
    };

    if (headingStyle === "uppercase") {
      style.textTransform = "uppercase";
      style.letterSpacing = "0.05em";
    } else if (headingStyle === "underline") {
      style.borderBottom = `1px solid ${accentColor}`;
      style.paddingBottom = "0.1em";
    } else if (headingStyle === "small-caps") {
      style.fontVariant = "small-caps";
      style.fontSize = "1.2em";
    }

    return (
      <h3 style={style} className="break-after-avoid">
        {title}
      </h3>
    );
  };

  const renderSection = (id: SectionId, title: string) => {
    switch (id) {
      case "summary":
        if (!data.summary.text) return null;
        return (
          <div key={id} className="mb-2 break-inside-avoid">
            <SectionHeading title={title} />
            <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.4, fontSize: "0.95em" }}>
              {data.summary.text}
            </p>
          </div>
        );

      case "experience":
        if (!data.experience.items.length) return null;
        return (
          <div key={id} className="mb-2">
            <SectionHeading title={title} />
            <div className="flex flex-col gap-1.5">
              {data.experience.items.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[1em]">
                      {exp.position} <span className="font-normal mx-1">at</span> {exp.company}
                    </span>
                    <span
                      className="text-[0.85em] font-medium"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ""}
                      {exp.years && ` (${exp.years})`}
                    </span>
                  </div>
                  {exp.location && <div className="text-[0.85em] text-[color:var(--color-muted)] italic mb-0.5">{exp.location}</div>}
                  <ul className="list-disc list-inside">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="text-[0.9em] leading-snug ml-2 -indent-3 pl-3">
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
          <div key={id} className="mb-2">
            <SectionHeading title={title} />
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {data.skills.groups.map((group) => (
                <div key={group.id} className="mb-1">
                  <h4 className="font-bold text-[0.9em]" style={{ color: group.accentColorOverride || accentColor }}>
                    {group.title}
                  </h4>
                  <div className="flex flex-wrap gap-x-2 text-[0.85em]">
                    {group.items.map(i => i.name).join(" • ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "education":
        if (!data.education.items.length) return null;
        return (
          <div key={id} className="mb-2">
            <SectionHeading title={title} />
            <div className="flex flex-col gap-1.5">
              {data.education.items.map((edu) => (
                <div key={edu.id} className="break-inside-avoid flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-[0.95em]">{edu.degree} in {edu.field}</span>
                    <span className="text-[0.9em] ml-2 text-gray-600">{edu.institution}</span>
                  </div>
                  <span
                    className="text-[0.85em] font-medium"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "projects":
        if (!data.projects.items.length) return null;
        return (
          <div key={id} className="mb-2">
            <SectionHeading title={title} />
            <div className="flex flex-col gap-1.5">
              {data.projects.items.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[0.95em]">
                      {proj.name}
                      {proj.url && (
                        <a href={proj.url} className="text-gray-400 no-underline ml-1" target="_blank" rel="noreferrer">
                          <LinkIcon size={10} className="inline" />
                        </a>
                      )}
                    </span>
                    <span className="text-[0.85em] text-[color:var(--color-muted)]">{proj.technologies.join(" • ")}</span>
                  </div>
                  <p className="text-[0.9em] leading-snug">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "languages":
        if (!data.languages.items.length) return null;
        return (
          <div key={id} className="mb-2 break-inside-avoid">
            <SectionHeading title={title} />
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {data.languages.items.map((lang) => (
                <div key={lang.id} className="flex gap-1 text-[0.9em]">
                  <span className="font-bold">{lang.language}:</span>
                  <span className="text-gray-600">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "certificates":
        if (!data.certificates.items.length) return null;
        return (
          <div key={id} className="mb-2">
            <SectionHeading title={title} />
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {data.certificates.items.map((cert) => (
                <div key={cert.id} className="break-inside-avoid flex gap-1 text-[0.9em]">
                  <span className="font-bold">{cert.name}</span>
                  <span className="text-[color:var(--color-muted)]">({cert.issuer}, {cert.date})</span>
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
          <div key={id} className="mb-2">
            <SectionHeading title={title || data.custom.sectionTitle} />
            <div className="flex flex-col gap-1.5">
              {data.custom.items.map((item) => (
                <div key={item.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[0.95em]">
                      {item.title} {item.subtitle && <span className="font-normal text-gray-600 ml-1">| {item.subtitle}</span>}
                    </span>
                    {item.date && (
                      <span className="text-[0.85em] font-medium" style={{ color: 'var(--color-accent)' }}>
                        {item.date}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-[0.9em] leading-snug">
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
        lineHeight: 1.4,
      }}
    >
      {/* Header */}
      {sections.find((s) => s.id === "header")?.visible && (
        <div
          className="mb-4 pb-2 border-b-2"
          style={{ borderColor: accentColor, textAlign: settings.headerAlignment as any }}
        >
          <div className="flex justify-between items-end">
            <div>
              <h1
                className="text-3xl font-extrabold tracking-tight"
                style={{ color: 'var(--color-heading)' }}
              >
                {data.header.fullName}
              </h1>
              <h2 className="text-lg font-bold text-gray-700">
                {data.header.title}
              </h2>
            </div>
            <div
              className={`flex flex-col text-[0.85em] text-gray-600 ${
                settings.headerAlignment === "left" ? "items-start" : "items-end"
              }`}
            >
              <div className="flex flex-wrap justify-end gap-x-3 gap-y-1 w-full max-w-sm">
                {data.header.contacts.map((contact) => {
                  if (!contact.value) return null;
                  return (
                    <div key={contact.id} className="flex items-center gap-1">
                      <span style={{ color: 'var(--color-accent)' }}>
                        {ICONS[contact.icon] || <LinkIcon size={10} />}
                      </span>
                      {contact.url ? (
                        <a href={contact.url} className="no-underline text-inherit" target="_blank" rel="noreferrer">
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
