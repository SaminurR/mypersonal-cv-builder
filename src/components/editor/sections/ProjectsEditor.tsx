import { useCVStore } from "../../../store/cv-store";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, closestCenter } from "@dnd-kit/core";

export function ProjectsEditor() {
  const items = useCVStore((state) => state.cv.projects.items);
  const addProject = useCVStore((state) => state.addProject);
  const updateProject = useCVStore((state) => state.updateProject);
  const removeProject = useCVStore((state) => state.removeProject);
  const reorderProjects = useCVStore((state) => state.reorderProjects);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const newArray = [...items];
    const [moved] = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, moved);
    reorderProjects(newArray);
  };

  return (
    <div className="space-y-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((proj) => (
            <SortableProjectItem key={proj.id} proj={proj} update={updateProject} remove={removeProject} />
          ))}
        </SortableContext>
      </DndContext>
      <Button variant="outline" className="w-full" onClick={addProject}>
        <Plus size={16} /> Add Project
      </Button>
    </div>
  );
}

function SortableProjectItem({ proj, update, remove }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: proj.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-slate-50 border border-slate-200 rounded-md p-3 mb-3 relative group">
      <div className="absolute top-3 left-2 cursor-grab text-slate-400 hover:text-slate-600" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>
      <div className="pl-6 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <Input className="flex-1" placeholder="Project Name" value={proj.name} onChange={(e) => update(proj.id, { name: e.target.value })} />
          <button onClick={() => remove(proj.id)} className="p-2 text-slate-400 hover:text-red-500 rounded hover:bg-red-50" title="Remove"><Trash2 size={16} /></button>
        </div>
        <Input placeholder="URL (optional)" value={proj.url} onChange={(e) => update(proj.id, { url: e.target.value })} />
        <Input 
          placeholder="Technologies (comma separated)" 
          value={proj.technologies.join(", ")} 
          onChange={(e) => update(proj.id, { technologies: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} 
        />
        <textarea
          className="w-full min-h-[60px] rounded-md border border-slate-300 px-2 py-1 text-sm"
          placeholder="Project Description..."
          value={proj.description}
          onChange={(e) => update(proj.id, { description: e.target.value })}
        />
      </div>
    </div>
  );
}
