import { useCVStore } from "../../../store/cv-store";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, closestCenter } from "@dnd-kit/core";

export function EducationEditor() {
  const items = useCVStore((state) => state.cv.education.items);
  const addEducation = useCVStore((state) => state.addEducation);
  const updateEducation = useCVStore((state) => state.updateEducation);
  const removeEducation = useCVStore((state) => state.removeEducation);
  const reorderEducation = useCVStore((state) => state.reorderEducation);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const newArray = [...items];
    const [moved] = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, moved);
    reorderEducation(newArray);
  };

  return (
    <div className="space-y-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((edu) => (
            <SortableEducationItem key={edu.id} edu={edu} update={updateEducation} remove={removeEducation} />
          ))}
        </SortableContext>
      </DndContext>
      <Button variant="outline" className="w-full" onClick={addEducation}>
        <Plus size={16} /> Add Education
      </Button>
    </div>
  );
}

function SortableEducationItem({ edu, update, remove }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: edu.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-slate-50 border border-slate-200 rounded-md p-3 mb-3 relative group">
      <div className="absolute top-3 left-2 cursor-grab text-slate-400 hover:text-slate-600" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>
      <div className="pl-6 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <Input className="flex-1" placeholder="Institution" value={edu.institution} onChange={(e) => update(edu.id, { institution: e.target.value })} />
          <button onClick={() => remove(edu.id)} className="p-2 text-slate-400 hover:text-red-500 rounded hover:bg-red-50" title="Remove"><Trash2 size={16} /></button>
        </div>
        <div className="flex gap-2">
          <Input className="flex-1" placeholder="Degree (e.g. BS)" value={edu.degree} onChange={(e) => update(edu.id, { degree: e.target.value })} />
          <Input className="flex-1" placeholder="Field of Study" value={edu.field} onChange={(e) => update(edu.id, { field: e.target.value })} />
        </div>
        <div className="flex gap-2">
          <Input className="flex-1" placeholder="Start Date" value={edu.startDate} onChange={(e) => update(edu.id, { startDate: e.target.value })} />
          <Input className="flex-1" placeholder="End Date" value={edu.endDate} onChange={(e) => update(edu.id, { endDate: e.target.value })} />
        </div>
        <textarea
          className="w-full min-h-[60px] rounded-md border border-slate-300 px-2 py-1 text-sm"
          placeholder="Description or achievements..."
          value={edu.description}
          onChange={(e) => update(edu.id, { description: e.target.value })}
        />
      </div>
    </div>
  );
}
