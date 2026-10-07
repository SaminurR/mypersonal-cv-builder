// ─── Section Identifiers & Metadata ───────────────────

export type SectionId =
  | "header"
  | "summary"
  | "experience"
  | "skills"
  | "education"
  | "projects"
  | "languages"
  | "certificates"
  | "references" | "hobbies" | "custom";

export interface SectionMeta {
  id: SectionId;
  title: string;
  visible: boolean;
  order: number;
}

// ─── Header Section ───────────────────────────────────

export interface ContactItem {
  id: string;
  icon: string;
  label: string;
  value: string;
  url: string;
}

export interface HeaderData {
  photoUrl?: string;
  fullName: string;
  title: string;
  contacts: ContactItem[];
}

// ─── Summary / About Me Section ───────────────────────

export interface SummaryData {
  text: string;
}

// ─── Experience Section ───────────────────────────────

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  years: string;
  bullets: string[];
}

export interface ExperienceData {
  items: ExperienceItem[];
}

// ─── Skill Bars (Main Feature) ────────────────────────

export type LevelMode = "percentage" | "number" | "text";
export type BarStyle = "thin" | "thick" | "segmented" | "dots";

export interface SkillItem {
  id: string;
  name: string;
  level: number;
  color?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  levelMode: LevelMode;
  barStyle: BarStyle;
  showLevelLabel: boolean;
  accentColorOverride: string;
  customTextLevels: [string, string, string, string, string];
  items: SkillItem[];
}

export interface SkillsData {
  groups: SkillGroup[];
}

// ─── Education Section ────────────────────────────────

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationData {
  items: EducationItem[];
}

// ─── Projects Section ─────────────────────────────────

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  url: string;
  technologies: string[];
}

export interface ProjectsData {
  items: ProjectItem[];
}

// ─── Languages Section ────────────────────────────────

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: string;
}

export interface LanguagesData {
  items: LanguageItem[];
}

// ─── Certificates Section ─────────────────────────────

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface CertificatesData {
  items: CertificateItem[];
}

// ─── Custom Section ───────────────────────────────────


export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  contact: string;
  url: string;
}

export interface HobbyItem {
  id: string;
  name: string;
}

export interface CustomEntry {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSectionData {
  sectionTitle: string;
  items: CustomEntry[];
}

// ─── Global Styling & Settings ────────────────────────

export type LayoutType = "single" | "left-sidebar" | "right-sidebar";
export type SpacingLevel = "compact" | "normal" | "spacious";
export type HeadingStyle = "uppercase" | "underline" | "plain" | "small-caps";
export type BulletStyle = "disc" | "dash" | "none";
export type DateFormat = "MM/YYYY" | "MMM YYYY" | "YYYY";
export type PhotoShape = "circle" | "square" | "rounded";
export type HeaderAlignment = "left" | "center";
export type BarCornerStyle = "square" | "rounded";
export type TemplateName = "minimal" | "sidebar" | "compact" | "classic" | "retro";

export interface CVSettings {
  pageBgColor: string;
  textColor: string;
  headingColor: string;
  subheadingColor: string;
  mutedColor: string;
  accentColor: string;
  fontFamily: string;
  fontSizeScale: number;
  spacing: SpacingLevel;
  layout: LayoutType;
  sidebarWidth: number;
  pageMargin: number;
  barCornerStyle: BarCornerStyle;
  barThickness: number;
  headingStyle: HeadingStyle;
  dateFormat: DateFormat;
  bulletStyle: BulletStyle;
  showPhoto: boolean;
  photoPosition?: "left" | "right";
  photoShape: PhotoShape;
  photoSize: number;
  borderRadius: number;
  headerAlignment: HeaderAlignment;
  template: TemplateName;
}

// ─── Root CV Document ─────────────────────────────────

export interface CVData {
  sections: SectionMeta[];
  header: HeaderData;
  summary: SummaryData;
  skills: SkillsData;
  experience: ExperienceData;
  education: EducationData;
  projects: ProjectsData;
  languages: LanguagesData;
  certificates: CertificatesData;
  references: { items: ReferenceItem[] };
  hobbies: { items: HobbyItem[] };
  custom: CustomSectionData;
  settings: CVSettings;
}
