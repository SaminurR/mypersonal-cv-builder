import { useCVStore } from "../../../store/cv-store";
import { SkillGroupEditor } from "./SkillGroupEditor";
import { SortableItem } from "../../ui/SortableItem";
import { Button } from "../../ui/Button";
import { Plus } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export function SkillsEditor() {
  const groups = useCVStore((state) => state.cv.skills.groups);
  const addSkillGroup = useCVStore((state) => state.addSkillGroup);
  const reorderSkillGroups = useCVStore((state) => state.reorderSkillGroups);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = groups.findIndex((g) => g.id === active.id);
      const newIndex = groups.findIndex((g) => g.id === over.id);
      reorderSkillGroups(arrayMove(groups, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-6">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={groups.map((g) => g.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-6">
            {groups.map((group) => (
              <SortableItem key={group.id} id={group.id}>
                <SkillGroupEditor group={group} />
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button
        variant="secondary"
        className="w-full mt-4 border border-slate-200 border-dashed"
        onClick={addSkillGroup}
      >
        <Plus size={16} className="mr-2" />
        Add Skill Group
      </Button>
    </div>
  );
}
