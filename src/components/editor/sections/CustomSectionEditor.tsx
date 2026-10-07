import { useCVStore } from "../../../store/cv-store";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Plus, GripVertical, Trash2 } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../../ui/SortableItem";

interface CustomSectionEditorProps {
  sectionId?: string;
}

export function CustomSectionEditor({ sectionId = "custom" }: CustomSectionEditorProps) {
  const customSection = useCVStore((state) => 
    sectionId === "custom" 
      ? state.cv.custom 
      : (state.cv.customSections?.[sectionId] || { items: [] as any[], layout: "vertical" as const })
  );
  
  const customItems = customSection.items || [];
  const layout = customSection.layout || "vertical";
  
  const updateCustomSectionLayout = useCVStore((state) => state.updateCustomSectionLayout);
  const addCustomEntry = useCVStore((state) => state.addCustomEntry);
  const updateCustomEntry = useCVStore((state) => state.updateCustomEntry);
  const removeCustomEntry = useCVStore((state) => state.removeCustomEntry);
  const reorderCustomEntries = useCVStore((state) => state.reorderCustomEntries);
  const removeDynamicSection = useCVStore((state) => state.removeDynamicSection);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = customItems.findIndex((item: any) => item.id === active.id);
      const newIndex = customItems.findIndex((item: any) => item.id === over.id);
      reorderCustomEntries(sectionId, arrayMove(customItems, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex-1 space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Display Layout</label>
          <select 
            value={layout} 
            onChange={(e) => updateCustomSectionLayout(sectionId, e.target.value as any)}
            className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="vertical">Vertical (Detailed list with descriptions)</option>
            <option value="horizontal">Horizontal (Compact links & tags)</option>
          </select>
        </div>
        
        {sectionId !== "custom" && (
          <div className="mt-5">
            <Button variant="danger" onClick={() => removeDynamicSection(sectionId)}>
              Delete Section
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext items={customItems.map((i: any) => i.id)} strategy={verticalListSortingStrategy}>
            {customItems.map((item: any) => (
              <SortableItem key={item.id} id={item.id}>
                <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="mt-2 cursor-grab text-slate-400 active:cursor-grabbing">
                    <GripVertical size={16} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Title / Name"
                        value={item.title}
                        onChange={(e) => updateCustomEntry(sectionId, item.id, { title: e.target.value })}
                        placeholder="e.g. Behance"
                      />
                      <Input
                        label="URL (Optional)"
                        value={item.url || ""}
                        onChange={(e) => updateCustomEntry(sectionId, item.id, { url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    {layout === "vertical" && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            label="Subtitle / Role (Optional)"
                            value={item.subtitle}
                            onChange={(e) => updateCustomEntry(sectionId, item.id, { subtitle: e.target.value })}
                            placeholder="e.g. Acme Corp"
                          />
                          <Input
                            label="Date"
                            value={item.date}
                            onChange={(e) => updateCustomEntry(sectionId, item.id, { date: e.target.value })}
                            placeholder="e.g. Dec 2023"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-slate-700">Description</label>
                          <textarea
                            value={item.description}
                            onChange={(e) => updateCustomEntry(sectionId, item.id, { description: e.target.value })}
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[80px]"
                            placeholder="Describe the details..."
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => removeCustomEntry(sectionId, item.id)}
                    className="mt-1 text-slate-400 hover:text-red-500"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <Button onClick={() => addCustomEntry(sectionId)} variant="outline" className="w-full">
        <Plus size={16} className="mr-2" />
        Add Item
      </Button>
    </div>
  );
}
