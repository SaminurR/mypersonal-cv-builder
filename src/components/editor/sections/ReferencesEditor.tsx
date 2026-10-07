import { useCVStore } from "../../../store/cv-store";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, closestCenter } from "@dnd-kit/core";

export function ReferencesEditor() {
  const items = useCVStore((state) => state.cv.references.items);
  const addReference = useCVStore((state) => state.addReference);
  const updateReference = useCVStore((state) => state.updateReference);
  const removeReference = useCVStore((state) => state.removeReference);
  const reorderReferences = useCVStore((state) => state.reorderReferences);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i: any) => i.id === active.id);
    const newIndex = items.findIndex((i: any) => i.id === over.id);
    const newArray = [...items];
    const [moved] = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, moved);
    reorderReferences(newArray);
  };

  return (
    <div className="space-y-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((ref: any) => (
            <SortableReferenceItem key={ref.id} item={ref} update={updateReference} remove={removeReference} />
          ))}
        </SortableContext>
      </DndContext>
      <Button variant="outline" className="w-full" onClick={addReference}>
        <Plus size={16} className="mr-2" /> Add Reference
      </Button>
    </div>
  );
}

function SortableReferenceItem({ item, update, remove }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-slate-50 border border-slate-200 rounded-md p-3 mb-3">
      <div className="flex justify-between items-start mb-3">
        <div className="cursor-grab text-slate-400 hover:text-slate-600" {...attributes} {...listeners}>
          <GripVertical size={16} />
        </div>
        <button onClick={() => remove(item.id)} className="text-slate-400 hover:text-red-500" title="Remove">
          <Trash2 size={16} />
        </button>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Name" value={item.name} onChange={(e) => update(item.id, { name: e.target.value })} placeholder="John Doe" />
          <Input label="Company" value={item.company} onChange={(e) => update(item.id, { company: e.target.value })} placeholder="Acme Corp" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Position" value={item.position} onChange={(e) => update(item.id, { position: e.target.value })} placeholder="Senior Manager" />
          <Input label="Contact (Email/Phone)" value={item.contact} onChange={(e) => update(item.id, { contact: e.target.value })} placeholder="john@example.com" />
        </div>
        <Input label="Link / URL" value={item.url} onChange={(e) => update(item.id, { url: e.target.value })} placeholder="https://linkedin.com/in/johndoe" />
      </div>
    </div>
  );
}
