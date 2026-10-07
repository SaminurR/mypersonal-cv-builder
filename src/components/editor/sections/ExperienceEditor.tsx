import { useCVStore } from "../../../store/cv-store";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, closestCenter } from "@dnd-kit/core";

export function ExperienceEditor() {
  const items = useCVStore((state) => state.cv.experience.items);
  const addExperience = useCVStore((state) => state.addExperience);
  const updateExperience = useCVStore((state) => state.updateExperience);
  const removeExperience = useCVStore((state) => state.removeExperience);
  const addBullet = useCVStore((state) => state.addBullet);
  const updateBullet = useCVStore((state) => state.updateBullet);
  const removeBullet = useCVStore((state) => state.removeBullet);
  const reorderExperience = useCVStore((state) => state.reorderExperience);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const newArray = [...items];
    const [moved] = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, moved);
    reorderExperience(newArray);
  };

  return (
    <div className="space-y-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((exp) => (
            <SortableExperienceItem
              key={exp.id}
              exp={exp}
              update={updateExperience}
              remove={removeExperience}
              addBullet={addBullet}
              updateBullet={updateBullet}
              removeBullet={removeBullet}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Button variant="outline" className="w-full" onClick={addExperience}>
        <Plus size={16} /> Add Experience
      </Button>
    </div>
  );
}

function SortableExperienceItem({ exp, update, remove, addBullet, updateBullet, removeBullet }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: exp.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-slate-50 border border-slate-200 rounded-md p-3 mb-3 relative group">
      <div className="absolute top-3 left-2 cursor-grab text-slate-400 hover:text-slate-600" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>
      <div className="pl-6 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <Input className="flex-1" placeholder="Position Title" value={exp.position} onChange={(e) => update(exp.id, { position: e.target.value })} />
          <button onClick={() => remove(exp.id)} className="p-2 text-slate-400 hover:text-red-500 rounded hover:bg-red-50" title="Remove Experience"><Trash2 size={16} /></button>
        </div>
        <Input placeholder="Company Name" value={exp.company} onChange={(e) => update(exp.id, { company: e.target.value })} />
        <div className="flex gap-2">
          <Input className="flex-1" placeholder="Start Date" value={exp.startDate} onChange={(e) => update(exp.id, { startDate: e.target.value })} />
          <Input className="flex-1" placeholder="End Date" value={exp.endDate} onChange={(e) => update(exp.id, { endDate: e.target.value })} />
        </div>
        <div className="flex gap-2">
          <Input className="flex-1" placeholder="Location" value={exp.location} onChange={(e) => update(exp.id, { location: e.target.value })} />
          <Input className="flex-1" placeholder="Years (optional)" value={exp.years} onChange={(e) => update(exp.id, { years: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Bullets</label>
          <div className="space-y-2 mb-2">
            {exp.bullets.map((b: string, i: number) => (
              <div key={i} className="flex gap-2">
                <textarea
                  className="flex-1 min-h-[40px] rounded-md border border-slate-300 px-2 py-1 text-sm"
                  value={b}
                  onChange={(e) => updateBullet(exp.id, i, e.target.value)}
                  placeholder="Did something awesome..."
                />
                <button onClick={() => removeBullet(exp.id, i)} className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
          <Button variant="secondary" className="w-full text-xs py-1" onClick={() => addBullet(exp.id)}>
            <Plus size={14} /> Add Bullet
          </Button>
        </div>
      </div>
    </div>
  );
}
