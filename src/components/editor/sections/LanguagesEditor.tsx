import { useCVStore } from "../../../store/cv-store";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, closestCenter } from "@dnd-kit/core";

export function LanguagesEditor() {
  const items = useCVStore((state) => state.cv.languages.items);
  const addLanguage = useCVStore((state) => state.addLanguage);
  const updateLanguage = useCVStore((state) => state.updateLanguage);
  const removeLanguage = useCVStore((state) => state.removeLanguage);
  const reorderLanguages = useCVStore((state) => state.reorderLanguages);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const newArray = [...items];
    const [moved] = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, moved);
    reorderLanguages(newArray);
  };

  return (
    <div className="space-y-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((lang) => (
            <SortableLanguageItem key={lang.id} lang={lang} update={updateLanguage} remove={removeLanguage} />
          ))}
        </SortableContext>
      </DndContext>
      <Button variant="outline" className="w-full" onClick={addLanguage}>
        <Plus size={16} /> Add Language
      </Button>
    </div>
  );
}

function SortableLanguageItem({ lang, update, remove }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lang.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-slate-50 border border-slate-200 rounded-md p-2 mb-2 flex items-center gap-2">
      <div className="cursor-grab text-slate-400 hover:text-slate-600" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>
      <Input className="flex-1" placeholder="Language" value={lang.language} onChange={(e) => update(lang.id, { language: e.target.value })} />
      <Input className="flex-1" placeholder="Proficiency (e.g. Native)" value={lang.proficiency} onChange={(e) => update(lang.id, { proficiency: e.target.value })} />
      <button onClick={() => remove(lang.id)} className="p-2 text-slate-400 hover:text-red-500 rounded hover:bg-red-50" title="Remove"><Trash2 size={16} /></button>
    </div>
  );
}
