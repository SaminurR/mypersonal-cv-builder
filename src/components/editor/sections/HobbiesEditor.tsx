import { useCVStore } from "../../../store/cv-store";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, closestCenter } from "@dnd-kit/core";

export function HobbiesEditor() {
  const items = useCVStore((state) => state.cv.hobbies.items);
  const addHobby = useCVStore((state) => state.addHobby);
  const updateHobby = useCVStore((state) => state.updateHobby);
  const removeHobby = useCVStore((state) => state.removeHobby);
  const reorderHobbies = useCVStore((state) => state.reorderHobbies);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i: any) => i.id === active.id);
    const newIndex = items.findIndex((i: any) => i.id === over.id);
    const newArray = [...items];
    const [moved] = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, moved);
    reorderHobbies(newArray);
  };

  return (
    <div className="space-y-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((hobby: any) => (
            <SortableHobbyItem key={hobby.id} item={hobby} update={updateHobby} remove={removeHobby} />
          ))}
        </SortableContext>
      </DndContext>
      <Button variant="outline" className="w-full" onClick={addHobby}>
        <Plus size={16} className="mr-2" /> Add Hobby
      </Button>
    </div>
  );
}

function SortableHobbyItem({ item, update, remove }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-slate-50 border border-slate-200 rounded-md p-2 mb-2 flex items-center gap-2">
      <div className="cursor-grab text-slate-400 hover:text-slate-600" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>
      <Input className="flex-1" placeholder="Hobby (e.g. Photography, Hiking)" value={item.name} onChange={(e) => update(item.id, { name: e.target.value })} />
      <button onClick={() => remove(item.id)} className="p-2 text-slate-400 hover:text-red-500 rounded hover:bg-red-50" title="Remove">
        <Trash2 size={16} />
      </button>
    </div>
  );
}
