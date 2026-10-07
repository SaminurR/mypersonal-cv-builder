import { useCVStore } from "../../../store/cv-store";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, closestCenter } from "@dnd-kit/core";

export function CertificatesEditor() {
  const items = useCVStore((state) => state.cv.certificates.items);
  const addCertificate = useCVStore((state) => state.addCertificate);
  const updateCertificate = useCVStore((state) => state.updateCertificate);
  const removeCertificate = useCVStore((state) => state.removeCertificate);
  const reorderCertificates = useCVStore((state) => state.reorderCertificates);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const newArray = [...items];
    const [moved] = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, moved);
    reorderCertificates(newArray);
  };

  return (
    <div className="space-y-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((cert) => (
            <SortableCertificateItem key={cert.id} cert={cert} update={updateCertificate} remove={removeCertificate} />
          ))}
        </SortableContext>
      </DndContext>
      <Button variant="outline" className="w-full" onClick={addCertificate}>
        <Plus size={16} /> Add Certificate
      </Button>
    </div>
  );
}

function SortableCertificateItem({ cert, update, remove }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: cert.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-slate-50 border border-slate-200 rounded-md p-3 mb-3 relative group">
      <div className="absolute top-3 left-2 cursor-grab text-slate-400 hover:text-slate-600" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>
      <div className="pl-6 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <Input className="flex-1" placeholder="Certificate Name" value={cert.name} onChange={(e) => update(cert.id, { name: e.target.value })} />
          <button onClick={() => remove(cert.id)} className="p-2 text-slate-400 hover:text-red-500 rounded hover:bg-red-50" title="Remove"><Trash2 size={16} /></button>
        </div>
        <div className="flex gap-2">
          <Input className="flex-[2]" placeholder="Issuer" value={cert.issuer} onChange={(e) => update(cert.id, { issuer: e.target.value })} />
          <Input className="flex-1" placeholder="Date" value={cert.date} onChange={(e) => update(cert.id, { date: e.target.value })} />
        </div>
        <Input placeholder="URL (optional)" value={cert.url} onChange={(e) => update(cert.id, { url: e.target.value })} />
      </div>
    </div>
  );
}
