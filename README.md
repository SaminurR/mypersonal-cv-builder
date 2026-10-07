# Minimalist CV Builder

A purely client-side, highly customizable, and privacy-first CV/Resume builder. Build your CV with a live A4 preview and export it to PDF, PNG, or JPEG instantly.

## ✨ Features

- **Privacy First**: No backend, no database, no sign-ups. All data is saved locally to your browser's `localStorage`.
- **Live A4 Preview**: See exactly how your CV will look as you type. Includes a zoom feature that doesn't distort exports.
- **Rich Customization**:
  - **4 Templates**: Minimal, Sidebar, Compact, Classic.
  - **Theming**: Pick your own Accent, Text, and Background colors.
  - **Typography**: Choose from 5 professional fonts and seamlessly scale font sizes.
  - **Layout**: Adjust page margins, sidebar widths, and header alignments.
- **Skill Bars**: The flagship feature. Build unlimited skill groups with 4 different bar styles (Thin, Thick, Segmented, Dots) and 3 level modes (Percentage, 1-10 Scale, Custom Text Labels).
- **Drag & Drop**: Easily reorder entire sections (Experience, Education, Projects, etc.) or individual items within them.
- **Export Options**:
  - Download as **High-Res PNG / JPEG**.
  - Download as an **Image-based PDF** (automatically handles multi-page splitting).
  - Print / Save as a **Selectable Text PDF**.
- **Data Portability**: Export your CV data as a JSON file and import it later or on another device.
- **Mobile Friendly**: Features a dedicated mobile tab navigation (Edit, Customize, Preview).

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (with `persist` middleware)
- **Drag & Drop**: [dnd-kit](https://dndkit.com/)
- **Exporting**: [html-to-image](https://github.com/bubkoo/html-to-image) & [jsPDF](https://github.com/parallax/jsPDF)
- **Validation**: [Zod](https://zod.dev/)

## 🚀 Local Development

1. **Clone the repository** (if applicable) and navigate to the folder:
   ```bash
   cd cv-builder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🌐 Deploy to Vercel (Free Plan)

Because this app relies on no backend, it is completely free to host on Vercel as a static site.

### Method 1: Using the Vercel Dashboard (Recommended)
1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
3. Import your repository.
4. Vercel will automatically detect **Vite**. The default settings are correct:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` or `vite build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your CV Builder will be live in seconds!

### Method 2: Using the Vercel CLI
1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Run the `vercel` command from the root of your project:
   ```bash
   vercel
   ```
3. Follow the prompts to link the project to your Vercel account. It will automatically detect Vite and configure the deployment.
4. To deploy to production, run:
   ```bash
   vercel --prod
   ```

## 📄 License
MIT License
