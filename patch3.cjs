const fs = require('fs');

function injectDataSections() {
  const dir = 'src/components/preview/templates';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
  
  for (const f of files) {
    const p = dir + '/' + f;
    let code = fs.readFileSync(p, 'utf8');
    
    // Header
    code = code.replace(/<div\s*className="mb-8"/, '<div data-section="header" className="mb-8 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer"');
    
    // Dynamic Sections wrapper
    code = code.replace(/<div key="([^"]+)">/g, '<div key="$1" data-section="$1" className="hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1">');
    code = code.replace(/<div key=\{id\} className="mb-4([^"]*)">/g, '<div key={id} data-section={id} className="mb-4$1 hover:outline-dashed hover:outline-2 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm cursor-pointer -mx-2 px-2 py-1">');
    
    fs.writeFileSync(p, code);
  }
}

injectDataSections();
console.log("Data sections injected successfully.");
