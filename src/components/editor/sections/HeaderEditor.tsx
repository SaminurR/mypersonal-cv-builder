import { useCVStore } from "../../../store/cv-store";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Trash2, Plus } from "lucide-react";

export function HeaderEditor() {
  const header = useCVStore((state) => state.cv.header);
  const updateHeader = useCVStore((state) => state.updateHeader);
  const addContact = useCVStore((state) => state.addContact);
  const updateContact = useCVStore((state) => state.updateContact);
  const removeContact = useCVStore((state) => state.removeContact);

  return (
    <div className="space-y-4">

      <div className="space-y-2 mb-4 bg-slate-50 p-3 rounded border border-slate-100">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Profile Photo</label>
        <div className="flex items-center gap-4">
          {header.photoUrl && (
            <img src={header.photoUrl} alt="Profile" className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm" />
          )}
          <div className="flex-1">
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => updateHeader({ photoUrl: reader.result as string });
                  reader.readAsDataURL(file);
                }
              }}
              className="text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          {header.photoUrl && (
            <Button variant="ghost" size="sm" onClick={() => updateHeader({ photoUrl: '' })} className="text-red-500 hover:text-red-600 hover:bg-red-50">
              Remove
            </Button>
          )}
        </div>
      </div>
    
      <Input
        label="Full Name"
        value={header.fullName}
        onChange={(e) => updateHeader({ fullName: e.target.value })}
        placeholder="John Doe"
      />
      <Input
        label="Professional Title"
        value={header.title}
        onChange={(e) => updateHeader({ title: e.target.value })}
        placeholder="Frontend Developer"
      />
      
      <div className="pt-2">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Contact Links</h3>
        <div className="space-y-2 mb-3">
          {header.contacts.map((contact) => (
            <div key={contact.id} className="flex gap-2 items-start bg-slate-50 p-2 rounded border border-slate-100">
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <Input
                    className="w-1/3"
                    placeholder="Icon (e.g. mail, phone)"
                    value={contact.icon}
                    onChange={(e) => updateContact(contact.id, { icon: e.target.value })}
                  />
                  <Input
                    className="w-2/3"
                    placeholder="Value (e.g. john@example.com)"
                    value={contact.value}
                    onChange={(e) => updateContact(contact.id, { value: e.target.value })}
                  />
                </div>
                <Input
                  placeholder="URL (optional)"
                  value={contact.url}
                  onChange={(e) => updateContact(contact.id, { url: e.target.value })}
                />
              </div>
              <button
                onClick={() => removeContact(contact.id)}
                className="p-2 text-slate-400 hover:text-red-500 rounded hover:bg-red-50 transition-colors"
                title="Remove Contact"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full" onClick={addContact}>
          <Plus size={16} /> Add Contact
        </Button>
      </div>
    </div>
  );
}
