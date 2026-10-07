import type { SkillGroup, BarStyle, LevelMode } from "../../../types/cv";
import { useCVStore } from "../../../store/cv-store";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Select } from "../../ui/Select";
import { SortableItem } from "../../ui/SortableItem";
import { SkillItemEditor } from "./SkillItemEditor";
import { Trash2, Plus } from "lucide-react";
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

interface SkillGroupEditorProps {
  group: SkillGroup;
}

export function SkillGroupEditor({ group }: SkillGroupEditorProps) {
  const updateSkillGroup = useCVStore((state) => state.updateSkillGroup);
  const removeSkillGroup = useCVStore((state) => state.removeSkillGroup);
  const addSkillItem = useCVStore((state) => state.addSkillItem);
  const reorderSkillItems = useCVStore((state) => state.reorderSkillItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = group.items.findIndex((item) => item.id === active.id);
      const newIndex = group.items.findIndex((item) => item.id === over.id);
      reorderSkillItems(group.id, arrayMove(group.items, oldIndex, newIndex));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 space-y-3">
          <Input
            label="Group Title"
            value={group.title}
            onChange={(e) => updateSkillGroup(group.id, { title: e.target.value })}
            placeholder="e.g. Programming Languages"
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Level Mode"
              value={group.levelMode}
              onChange={(e) => updateSkillGroup(group.id, { levelMode: e.target.value as LevelMode })}
              options={[
                { value: "percentage", label: "Percentage" },
                { value: "number", label: "Number (1-10)" },
                { value: "text", label: "Text Labels" },
              ]}
            />
            <Select
              label="Bar Style"
              value={group.barStyle}
              onChange={(e) => updateSkillGroup(group.id, { barStyle: e.target.value as BarStyle })}
              options={[
                { value: "thin", label: "Thin Line" },
                { value: "thick", label: "Thick Bar" },
                { value: "segmented", label: "Segmented Blocks" },
                { value: "dots", label: "Dots" },
              ]}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={group.showLevelLabel}
                onChange={(e) => updateSkillGroup(group.id, { showLevelLabel: e.target.checked })}
                className="rounded border-slate-300"
              />
              Show level label
            </label>
            <Input
              type="color"
              className="h-8 w-16 p-1"
              value={group.accentColorOverride || "#000000"}
              onChange={(e) => updateSkillGroup(group.id, { accentColorOverride: e.target.value })}
              title="Accent Color Override (leave black to use global)"
            />
          </div>
          {group.levelMode === "text" && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Custom Text Levels</label>
              <div className="grid grid-cols-5 gap-1">
                {group.customTextLevels.map((lvl, idx) => (
                  <Input
                    key={idx}
                    value={lvl}
                    onChange={(e) => {
                      const newLevels = [...group.customTextLevels] as [string, string, string, string, string];
                      newLevels[idx] = e.target.value;
                      updateSkillGroup(group.id, { customTextLevels: newLevels });
                    }}
                    className="text-xs px-1 text-center"
                    title={`Level ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeSkillGroup(group.id)}
          className="text-slate-400 hover:text-red-600 mt-6 shrink-0"
          title="Delete Group"
        >
          <Trash2 size={16} />
        </Button>
      </div>

      <div className="space-y-2">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={group.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {group.items.map((item) => (
                <SortableItem key={item.id} id={item.id} className="bg-slate-50/50">
                  <SkillItemEditor groupId={group.id} item={item} levelMode={group.levelMode} />
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2 border-dashed"
          onClick={() => addSkillItem(group.id)}
        >
          <Plus size={14} className="mr-1" />
          Add Skill
        </Button>
      </div>
    </div>
  );
}
