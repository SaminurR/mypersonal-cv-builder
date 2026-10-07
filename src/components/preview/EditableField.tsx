import React, { useState, useRef, useEffect } from 'react';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
}

export function EditableField({ value, onSave, className = "", style, multiline = false }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Optional: select all or move cursor to end
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (localValue !== value) {
      onSave(localValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setLocalValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    const Element = multiline ? 'textarea' : 'input';
    return (
      <Element
        ref={inputRef as any}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`bg-blue-50/20 outline-blue-400 outline outline-1 outline-offset-2 rounded-sm w-full ${className}`}
        style={{ 
          ...style, 
          resize: 'none', 
          background: 'transparent', 
          color: 'inherit', 
          font: 'inherit', 
          padding: 0, 
          margin: 0, 
          border: 'none',
          minHeight: multiline ? '1.5em' : 'auto'
        }}
        autoFocus
      />
    );
  }

  return (
    <span 
      onClick={(e) => { e.preventDefault(); setIsEditing(true); }} 
      className={`cursor-text hover:outline-dashed hover:outline-1 hover:outline-blue-300 hover:bg-blue-50/10 transition-all rounded-sm inline-block min-w-[20px] ${className}`}
      style={style}
      title="Click to edit"
    >
      {value || <span className="opacity-30 italic">Add text...</span>}
    </span>
  );
}
