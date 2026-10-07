import { z } from "zod";

export const cvSchema = z.object({
  sections: z.array(
    z.object({
      id: z.enum([
        "header",
        "summary",
        "experience",
        "skills",
        "education",
        "projects",
        "languages",
        "certificates",
        "references", "hobbies", "custom",
      ]),
      title: z.string(),
      visible: z.boolean(),
      order: z.number(),
    })
  ),
  header: z.object({
    fullName: z.string(),
    title: z.string(),
    photoUrl: z.string(),
    contacts: z.array(
      z.object({
        id: z.string(),
        icon: z.string(),
        label: z.string(),
        value: z.string(),
        url: z.string(),
      })
    ),
  }),
  summary: z.object({
    text: z.string(),
  }),
  skills: z.object({
    groups: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        levelMode: z.enum(["percentage", "number", "text"]),
        barStyle: z.enum(["thin", "thick", "segmented", "dots"]),
        showLevelLabel: z.boolean(),
        accentColorOverride: z.string(),
        customTextLevels: z.tuple([
          z.string(),
          z.string(),
          z.string(),
          z.string(),
          z.string(),
        ]),
        items: z.array(
          z.object({
            id: z.string(),
              name: z.string(),
              level: z.number(),
              color: z.string().optional(),
          })
        ),
      })
    ),
  }),
  experience: z.object({
    items: z.array(
      z.object({
        id: z.string(),
        company: z.string(),
        position: z.string(),
        location: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        years: z.string(),
        bullets: z.array(z.string()),
      })
    ),
  }),
  education: z.object({
    items: z.array(
      z.object({
        id: z.string(),
        institution: z.string(),
        degree: z.string(),
        field: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string(),
      })
    ),
  }),
  projects: z.object({
    items: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        url: z.string(),
        technologies: z.array(z.string()),
      })
    ),
  }),
  languages: z.object({
    items: z.array(
      z.object({
        id: z.string(),
        language: z.string(),
        proficiency: z.string(),
      })
    ),
  }),
  certificates: z.object({
    items: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        issuer: z.string(),
        date: z.string(),
        url: z.string(),
      })
    ),
  }),
  
    references: z.object({
      items: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          position: z.string(),
          company: z.string(),
          contact: z.string(),
          url: z.string(),
        })
      )
    }),
    hobbies: z.object({
      items: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      )
    }),
    custom: z.object({
    sectionTitle: z.string(),
    items: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string(),
        date: z.string(),
        description: z.string(),
      })
    ),
  }),
  settings: z.object({
    pageBgColor: z.string(),
    textColor: z.string(),
    headingColor: z.string().optional().default("#0f172a"),
    subheadingColor: z.string().optional().default("#334155"),
    mutedColor: z.string().optional().default("#64748b"),
    accentColor: z.string(),
    fontFamily: z.string(),
    fontSizeScale: z.number(),
    spacing: z.enum(["compact", "normal", "spacious"]),
    layout: z.enum(["single", "left-sidebar", "right-sidebar"]),
    sidebarWidth: z.number(),
    pageMargin: z.number(),
    barCornerStyle: z.enum(["square", "rounded"]),
    barThickness: z.number(),
    headingStyle: z.enum(["uppercase", "underline", "plain", "small-caps"]),
    dateFormat: z.enum(["MM/YYYY", "MMM YYYY", "YYYY"]),
    bulletStyle: z.enum(["disc", "dash", "none"]),
    showPhoto: z.boolean(),
    photoPosition: z.enum(["left", "right"]).optional(),
    photoShape: z.enum(["circle", "square", "rounded"]),
    photoSize: z.number(),
    borderRadius: z.number().default(4),
    headerAlignment: z.enum(["left", "center"]),
    template: z.enum(["minimal", "sidebar", "compact", "classic", "retro"]),
  }),
});
