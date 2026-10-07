import type { SkillItem, LevelMode } from "../../../types/cv";
import { useCVStore } from "../../../store/cv-store";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Trash2 } from "lucide-react";

interface SkillItemEditorProps {
  groupId: string;
  item: SkillItem;
  levelMode: LevelMode;
}

export function SkillItemEditor({ groupId, item }: SkillItemEditorProps) {
  const updateSkillItem = useCVStore((state) => state.updateSkillItem);
  const removeSkillItem = useCVStore((state) => state.removeSkillItem);

  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = 0;
    if (val < 0) val = 0;
    if (val > 100) val = 100;
    updateSkillItem(groupId, item.id, { level: val });
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1">
        <Input
          value={item.name}
          onChange={(e) => updateSkillItem(groupId, item.id, { name: e.target.value })}
          placeholder="Skill name"
        />
      </div>
      <div className="w-8 shrink-0 flex flex-col justify-center">
        <input
          type="color"
          value={item.color || "#e5e7eb"}
          onChange={(e) => updateSkillItem(groupId, item.id, { color: e.target.value })}
          title="Custom Skill Color (leave default to use accent color)"
          className="w-full h-8 cursor-pointer rounded border border-slate-200 p-0 overflow-hidden"
        />
      </div>
      <div className="w-20 shrink-0">
        <Input
          type="number"
          min="0"
          max="100"
          value={item.level}
          onChange={handleLevelChange}
          placeholder="0-100"
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeSkillItem(groupId, item.id)}
        className="shrink-0 text-slate-400 hover:text-red-600"
        title="Remove skill"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
