import { useCVStore } from "../../../store/cv-store";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, closestCenter } from "@dnd-kit/core";

export function CustomSectionEditor() {
  const custom = useCVStore((state) => state.cv.custom);
  const items = custom.items;
  const updateCustomSectionTitle = useCVStore((state) => state.updateCustomSectionTitle);
  const addCustomEntry = useCVStore((state) => state.addCustomEntry);
  const updateCustomEntry = useCVStore((state) => state.updateCustomEntry);
  const removeCustomEntry = useCVStore((state) => state.removeCustomEntry);
  const reorderCustomEntries = useCVStore((state) => state.reorderCustomEntries);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const newArray = [...items];
    const [moved] = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, moved);
    reorderCustomEntries(newArray);
  };

  return (
    <div className="space-y-4">
      <Input
        label="Section Title"
        value={custom.sectionTitle}
        onChange={(e) => updateCustomSectionTitle(e.target.value)}
        placeholder="Custom Section (e.g. Awards, Publications)"
      />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((entry) => (
            <SortableCustomEntry key={entry.id} entry={entry} update={updateCustomEntry} remove={removeCustomEntry} />
          ))}
        </SortableContext>
      </DndContext>
      <Button variant="outline" className="w-full" onClick={addCustomEntry}>
        <Plus size={16} /> Add Entry
      </Button>
    </div>
  );
}

function SortableCustomEntry({ entry, update, remove }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: entry.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-slate-50 border border-slate-200 rounded-md p-3 mb-3 relative group">
      <div className="absolute top-3 left-2 cursor-grab text-slate-400 hover:text-slate-600" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>
      <div className="pl-6 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <Input className="flex-1" placeholder="Title" value={entry.title} onChange={(e) => update(entry.id, { title: e.target.value })} />
          <button onClick={() => remove(entry.id)} className="p-2 text-slate-400 hover:text-red-500 rounded hover:bg-red-50" title="Remove"><Trash2 size={16} /></button>
        </div>
        <div className="flex gap-2">
          <Input className="flex-1" placeholder="Subtitle" value={entry.subtitle} onChange={(e) => update(entry.id, { subtitle: e.target.value })} />
          <Input className="flex-1" placeholder="Date/Info" value={entry.date} onChange={(e) => update(entry.id, { date: e.target.value })} />
        </div>
        <textarea
          className="w-full min-h-[60px] rounded-md border border-slate-300 px-2 py-1 text-sm"
          placeholder="Description..."
          value={entry.description}
          onChange={(e) => update(entry.id, { description: e.target.value })}
        />
      </div>
    </div>
  );
}
