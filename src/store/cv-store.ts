import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CVData,
  CVSettings,
  ContactItem,
  HeaderData,
  SectionId,
  SectionMeta,
  SkillGroup,
  SkillItem,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  LanguageItem,
  CertificateItem,
  CustomEntry,
  ReferenceItem,
  HobbyItem,
} from "../types/cv";
import { sampleData } from "../lib/sample-data";

const uid = () => Math.random().toString(36).slice(2, 10);

interface CVStore {
  cv: CVData;
  activeSection: string | null;
  setActiveSection: (id: string | null) => void;

  // Sections
  updateSectionOrder: (sections: SectionMeta[]) => void;
  toggleSectionVisibility: (id: SectionId) => void;
  updateSectionTitle: (id: SectionId, title: string) => void;

  // Header
  updateHeader: (partial: Partial<HeaderData>) => void;
  addContact: () => void;
  updateContact: (id: string, partial: Partial<ContactItem>) => void;
  removeContact: (id: string) => void;
  reorderContacts: (contacts: ContactItem[]) => void;

  // Summary
  updateSummary: (text: string) => void;

  // Skills
  addSkillGroup: () => void;
  updateSkillGroup: (id: string, partial: Partial<SkillGroup>) => void;
  removeSkillGroup: (id: string) => void;
  reorderSkillGroups: (groups: SkillGroup[]) => void;
  addSkillItem: (groupId: string) => void;
  updateSkillItem: (
    groupId: string,
    itemId: string,
    partial: Partial<SkillItem>
  ) => void;
  removeSkillItem: (groupId: string, itemId: string) => void;
  reorderSkillItems: (groupId: string, items: SkillItem[]) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (id: string, partial: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (items: ExperienceItem[]) => void;
  addBullet: (expId: string) => void;
  updateBullet: (expId: string, index: number, value: string) => void;
  removeBullet: (expId: string, index: number) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, partial: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (items: EducationItem[]) => void;

  // Projects
  addProject: () => void;
  updateProject: (id: string, partial: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  reorderProjects: (items: ProjectItem[]) => void;

  // Languages
  addLanguage: () => void;
  updateLanguage: (id: string, partial: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;
  reorderLanguages: (items: LanguageItem[]) => void;

  // Certificates
  addCertificate: () => void;
  updateCertificate: (id: string, partial: Partial<CertificateItem>) => void;
  removeCertificate: (id: string) => void;
  reorderCertificates: (items: CertificateItem[]) => void;

  
  // References
  addReference: () => void;
  updateReference: (id: string, partial: Partial<ReferenceItem>) => void;
  removeReference: (id: string) => void;
  reorderReferences: (items: ReferenceItem[]) => void;

  // Hobbies
  addHobby: () => void;
  updateHobby: (id: string, partial: Partial<HobbyItem>) => void;
  removeHobby: (id: string) => void;
  reorderHobbies: (items: HobbyItem[]) => void;

  // Custom
  updateCustomSectionTitle: (title: string) => void;
  addCustomEntry: () => void;
  updateCustomEntry: (id: string, partial: Partial<CustomEntry>) => void;
  removeCustomEntry: (id: string) => void;
  reorderCustomEntries: (items: CustomEntry[]) => void;

  // Settings
  updateSettings: (partial: Partial<CVSettings>) => void;

  // Reset/Load
  resetCV: () => void;
  loadCV: (data: CVData) => void;
}

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      cv: sampleData,
      activeSection: null,
      setActiveSection: (id) => set({ activeSection: id }),

      // ── Sections ──────────────────────────────────────
      updateSectionOrder: (sections) =>
        set((s) => ({ cv: { ...s.cv, sections } })),

      toggleSectionVisibility: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            sections: s.cv.sections.map((sec) =>
              sec.id === id ? { ...sec, visible: !sec.visible } : sec
            ),
          },
        })),

      updateSectionTitle: (id, title) =>
        set((s) => ({
          cv: {
            ...s.cv,
            sections: s.cv.sections.map((sec) =>
              sec.id === id ? { ...sec, title } : sec
            ),
          },
        })),

      // ── Header ────────────────────────────────────────
      updateHeader: (partial) =>
        set((s) => ({
          cv: { ...s.cv, header: { ...s.cv.header, ...partial } },
        })),

      addContact: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            header: {
              ...s.cv.header,
              contacts: [
                ...s.cv.header.contacts,
                { id: uid(), icon: "globe", label: "", value: "", url: "" },
              ],
            },
          },
        })),

      updateContact: (id, partial) =>
        set((s) => ({
          cv: {
            ...s.cv,
            header: {
              ...s.cv.header,
              contacts: s.cv.header.contacts.map((c) =>
                c.id === id ? { ...c, ...partial } : c
              ),
            },
          },
        })),

      removeContact: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            header: {
              ...s.cv.header,
              contacts: s.cv.header.contacts.filter((c) => c.id !== id),
            },
          },
        })),

      reorderContacts: (contacts) =>
        set((s) => ({
          cv: { ...s.cv, header: { ...s.cv.header, contacts } },
        })),

      // ── Summary ───────────────────────────────────────
      updateSummary: (text) =>
        set((s) => ({
          cv: { ...s.cv, summary: { text } },
        })),

      // ── Skills ────────────────────────────────────────
      addSkillGroup: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            skills: {
              groups: [
                ...s.cv.skills.groups,
                {
                  id: uid(),
                  title: "New Group",
                  levelMode: "percentage",
                  barStyle: "thick",
                  showLevelLabel: true,
                  accentColorOverride: "",
                  customTextLevels: [
                    "Beginner",
                    "Intermediate",
                    "Good",
                    "Closer to Expert",
                    "Expert",
                  ],
                  items: [],
                },
              ],
            },
          },
        })),

      updateSkillGroup: (id, partial) =>
        set((s) => ({
          cv: {
            ...s.cv,
            skills: {
              groups: s.cv.skills.groups.map((g) =>
                g.id === id ? { ...g, ...partial } : g
              ),
            },
          },
        })),

      removeSkillGroup: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            skills: {
              groups: s.cv.skills.groups.filter((g) => g.id !== id),
            },
          },
        })),

      reorderSkillGroups: (groups) =>
        set((s) => ({
          cv: { ...s.cv, skills: { groups } },
        })),

      addSkillItem: (groupId) =>
        set((s) => ({
          cv: {
            ...s.cv,
            skills: {
              groups: s.cv.skills.groups.map((g) =>
                g.id === groupId
                  ? {
                      ...g,
                      items: [
                        ...g.items,
                        { id: uid(), name: "New Skill", level: 50 },
                      ],
                    }
                  : g
              ),
            },
          },
        })),

      updateSkillItem: (groupId, itemId, partial) =>
        set((s) => ({
          cv: {
            ...s.cv,
            skills: {
              groups: s.cv.skills.groups.map((g) =>
                g.id === groupId
                  ? {
                      ...g,
                      items: g.items.map((item) =>
                        item.id === itemId ? { ...item, ...partial } : item
                      ),
                    }
                  : g
              ),
            },
          },
        })),

      removeSkillItem: (groupId, itemId) =>
        set((s) => ({
          cv: {
            ...s.cv,
            skills: {
              groups: s.cv.skills.groups.map((g) =>
                g.id === groupId
                  ? { ...g, items: g.items.filter((i: any) => i.id !== itemId) }
                  : g
              ),
            },
          },
        })),

      reorderSkillItems: (groupId, items) =>
        set((s) => ({
          cv: {
            ...s.cv,
            skills: {
              groups: s.cv.skills.groups.map((g) =>
                g.id === groupId ? { ...g, items } : g
              ),
            },
          },
        })),

      // ── Experience ────────────────────────────────────
      addExperience: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            experience: {
              items: [
                ...s.cv.experience.items,
                {
                  id: uid(),
                  company: "",
                  position: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  years: "",
                  bullets: [""],
                },
              ],
            },
          },
        })),

      updateExperience: (id, partial) =>
        set((s) => ({
          cv: {
            ...s.cv,
            experience: {
              items: s.cv.experience.items.map((e) =>
                e.id === id ? { ...e, ...partial } : e
              ),
            },
          },
        })),

      removeExperience: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            experience: {
              items: s.cv.experience.items.filter((e) => e.id !== id),
            },
          },
        })),

      reorderExperience: (items) =>
        set((s) => ({
          cv: { ...s.cv, experience: { items } },
        })),

      addBullet: (expId) =>
        set((s) => ({
          cv: {
            ...s.cv,
            experience: {
              items: s.cv.experience.items.map((e) =>
                e.id === expId
                  ? { ...e, bullets: [...e.bullets, ""] }
                  : e
              ),
            },
          },
        })),

      updateBullet: (expId, index, value) =>
        set((s) => ({
          cv: {
            ...s.cv,
            experience: {
              items: s.cv.experience.items.map((e) =>
                e.id === expId
                  ? {
                      ...e,
                      bullets: e.bullets.map((b, i) =>
                        i === index ? value : b
                      ),
                    }
                  : e
              ),
            },
          },
        })),

      removeBullet: (expId, index) =>
        set((s) => ({
          cv: {
            ...s.cv,
            experience: {
              items: s.cv.experience.items.map((e) =>
                e.id === expId
                  ? {
                      ...e,
                      bullets: e.bullets.filter((_, i) => i !== index),
                    }
                  : e
              ),
            },
          },
        })),

      // ── Education ─────────────────────────────────────
      addEducation: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            education: {
              items: [
                ...s.cv.education.items,
                {
                  id: uid(),
                  institution: "",
                  degree: "",
                  field: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                },
              ],
            },
          },
        })),

      updateEducation: (id, partial) =>
        set((s) => ({
          cv: {
            ...s.cv,
            education: {
              items: s.cv.education.items.map((e) =>
                e.id === id ? { ...e, ...partial } : e
              ),
            },
          },
        })),

      removeEducation: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            education: {
              items: s.cv.education.items.filter((e) => e.id !== id),
            },
          },
        })),

      reorderEducation: (items) =>
        set((s) => ({
          cv: { ...s.cv, education: { items } },
        })),

      // ── Projects ──────────────────────────────────────
      addProject: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            projects: {
              items: [
                ...s.cv.projects.items,
                {
                  id: uid(),
                  name: "",
                  description: "",
                  url: "",
                  technologies: [],
                },
              ],
            },
          },
        })),

      updateProject: (id, partial) =>
        set((s) => ({
          cv: {
            ...s.cv,
            projects: {
              items: s.cv.projects.items.map((p) =>
                p.id === id ? { ...p, ...partial } : p
              ),
            },
          },
        })),

      removeProject: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            projects: {
              items: s.cv.projects.items.filter((p) => p.id !== id),
            },
          },
        })),

      reorderProjects: (items) =>
        set((s) => ({
          cv: { ...s.cv, projects: { items } },
        })),

      // ── Languages ─────────────────────────────────────
      addLanguage: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            languages: {
              items: [
                ...s.cv.languages.items,
                { id: uid(), language: "", proficiency: "" },
              ],
            },
          },
        })),

      updateLanguage: (id, partial) =>
        set((s) => ({
          cv: {
            ...s.cv,
            languages: {
              items: s.cv.languages.items.map((l) =>
                l.id === id ? { ...l, ...partial } : l
              ),
            },
          },
        })),

      removeLanguage: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            languages: {
              items: s.cv.languages.items.filter((l) => l.id !== id),
            },
          },
        })),

      reorderLanguages: (items) =>
        set((s) => ({
          cv: { ...s.cv, languages: { items } },
        })),

      // ── Certificates ──────────────────────────────────
      addCertificate: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            certificates: {
              items: [
                ...s.cv.certificates.items,
                { id: uid(), name: "", issuer: "", date: "", url: "" },
              ],
            },
          },
        })),

      updateCertificate: (id, partial) =>
        set((s) => ({
          cv: {
            ...s.cv,
            certificates: {
              items: s.cv.certificates.items.map((c) =>
                c.id === id ? { ...c, ...partial } : c
              ),
            },
          },
        })),

      removeCertificate: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            certificates: {
              items: s.cv.certificates.items.filter((c) => c.id !== id),
            },
          },
        })),

      reorderCertificates: (items) =>
        set((s) => ({
          cv: { ...s.cv, certificates: { items } },
        })),

      
      // References
      addReference: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            references: {
              items: [
                ...s.cv.references.items,
                { id: uid(), name: "", position: "", company: "", contact: "", url: "" },
              ],
            },
          },
        })),
      updateReference: (id, partial) =>
        set((s) => ({
          cv: {
            ...s.cv,
            references: {
              items: s.cv.references.items.map((i: any) => (i.id === id ? { ...i, ...partial } : i)),
            },
          },
        })),
      removeReference: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            references: { items: s.cv.references.items.filter((i: any) => i.id !== id) },
          },
        })),
      reorderReferences: (items) =>
        set((s) => ({
          cv: { ...s.cv, references: { items } },
        })),

      // Hobbies
      addHobby: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            hobbies: {
              items: [
                ...s.cv.hobbies.items,
                { id: uid(), name: "" },
              ],
            },
          },
        })),
      updateHobby: (id, partial) =>
        set((s) => ({
          cv: {
            ...s.cv,
            hobbies: {
              items: s.cv.hobbies.items.map((i: any) => (i.id === id ? { ...i, ...partial } : i)),
            },
          },
        })),
      removeHobby: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            hobbies: { items: s.cv.hobbies.items.filter((i: any) => i.id !== id) },
          },
        })),
      reorderHobbies: (items) =>
        set((s) => ({
          cv: { ...s.cv, hobbies: { items } },
        })),

      // ── Custom Section ────────────────────────────────
      updateCustomSectionTitle: (title) =>
        set((s) => ({
          cv: {
            ...s.cv,
            custom: { ...s.cv.custom, sectionTitle: title },
          },
        })),

      addCustomEntry: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            custom: {
              ...s.cv.custom,
              items: [
                ...s.cv.custom.items,
                {
                  id: uid(),
                  title: "",
                  subtitle: "",
                  date: "",
                  description: "",
                },
              ],
            },
          },
        })),

      updateCustomEntry: (id, partial) =>
        set((s) => ({
          cv: {
            ...s.cv,
            custom: {
              ...s.cv.custom,
              items: s.cv.custom.items.map((e) =>
                e.id === id ? { ...e, ...partial } : e
              ),
            },
          },
        })),

      removeCustomEntry: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            custom: {
              ...s.cv.custom,
              items: s.cv.custom.items.filter((e) => e.id !== id),
            },
          },
        })),

      reorderCustomEntries: (items) =>
        set((s) => ({
          cv: { ...s.cv, custom: { ...s.cv.custom, items } },
        })),

      // ── Settings ──────────────────────────────────────
      updateSettings: (partial) =>
        set((s) => ({
          cv: {
            ...s.cv,
            settings: { ...s.cv.settings, ...partial },
          },
        })),

      // ── Reset/Load ────────────────────────────────────
      resetCV: () => set({ cv: sampleData }),
      loadCV: (data) => set({ cv: data }),
    }),
    { name: "cv-builder-data" }
  )
);
