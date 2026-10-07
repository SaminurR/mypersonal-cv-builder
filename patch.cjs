const fs = require('fs');

function patch() {
  const dir = 'src/components/preview/templates';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
  
  for (const f of files) {
    const p = dir + '/' + f;
    let code = fs.readFileSync(p, 'utf8');
    
    // Inject the CSS vars into the inline styles 
    code = code.replace(/color:\s*accentColor/g, "color: 'var(--color-accent)'");
    code = code.replace(/backgroundColor:\s*accentColor/g, "backgroundColor: 'var(--color-accent)'");
    
    // Convert opacity-80 or 75 to muted color
    code = code.replace(/opacity-75/g, "");
    code = code.replace(/opacity-80/g, "");
    code = code.replace(/opacity-50/g, "");
    
    // Hardcoded grays -> CSS var
    code = code.replace(/text-slate-500/g, "text-[color:var(--color-muted)]");
    code = code.replace(/text-gray-500/g, "text-[color:var(--color-muted)]");
    code = code.replace(/text-slate-600/g, "text-[color:var(--color-muted)]");
    
    fs.writeFileSync(p, code);
  }
}

patch();
console.log("Templates updated successfully.");
