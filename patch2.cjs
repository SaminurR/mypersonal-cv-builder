const fs = require('fs');

function patchHeadings() {
  const dir = 'src/components/preview/templates';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
  
  for (const f of files) {
    const p = dir + '/' + f;
    let code = fs.readFileSync(p, 'utf8');
    
    // In all templates, there is usually a `const SectionHeading` or similar.
    // Let's globally find all `color: 'var(--color-accent)'` inside `SectionHeading` and replace.
    // Or we can just globally find h1, h2, h3 or font-bold and use heading/subheading colors.
    
    // Quick and dirty regex: replace the color of the H3 in SectionHeading
    // In MinimalTemplate: `color: 'var(--color-accent)'` inside `let style: React.CSSProperties = {` inside `SectionHeading`
    
    // This regex looks for `SectionHeading` definition up to the style block and replaces the color
    code = code.replace(/(const SectionHeading[\s\S]*?style:\s*React\.CSSProperties\s*=\s*\{[\s\S]*?color:\s*)'var\(--color-accent\)'/, "$1'var(--color-heading)'");
    
    // Also the main h1 (Full Name)
    code = code.replace(/(<h1[^>]*style=\{\{\s*color:\s*)'var\(--color-accent\)'/, "$1'var(--color-heading)'");
    
    // Also the Job Titles/Degrees (they usually don't have color set inline, they inherit textColor)
    // We can inject style={{ color: 'var(--color-subheading)' }} into font-semibold
    code = code.replace(/className="font-semibold"/g, 'className="font-semibold" style={{ color: "var(--color-subheading)" }}');
    
    fs.writeFileSync(p, code);
  }
}

patchHeadings();
console.log("Headings updated successfully.");
