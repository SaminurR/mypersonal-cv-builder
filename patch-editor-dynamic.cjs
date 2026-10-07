const fs = require('fs');
let p = 'src/components/editor/EditorPanel.tsx';
let code = fs.readFileSync(p, 'utf8');

code = code.replace(
  /case "custom":\s*return <CustomSectionEditor \/>;/,
  `case "custom":
          return <CustomSectionEditor sectionId="custom" />;
        default:
          if (id.startsWith("custom_")) {
            return <CustomSectionEditor sectionId={id} />;
          }`
);

const addBtn = `            </SortableContext>
          </DndContext>
          <div className="mt-4 px-4 pb-4">
            <button
              onClick={() => useCVStore.getState().addDynamicSection()}
              className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 py-3 text-sm font-medium text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              <Plus size={16} />
              Add Custom Section
            </button>
          </div>
        </div>
      </div>`;

code = code.replace(
  /<\/SortableContext>\s*<\/DndContext>\s*<\/div>\s*<\/div>/,
  addBtn
);

// We also need to import Plus from lucide-react in EditorPanel.tsx if not already
if (!code.includes('Plus')) {
  code = code.replace(/import \{ ([^}]+) \} from "lucide-react";/, 'import { $1, Plus } from "lucide-react";');
}

fs.writeFileSync(p, code);
console.log('EditorPanel patched');
