import type { SkillGroup, SkillItem } from "../../../types/cv";

interface SkillGroupPreviewProps {
  group: SkillGroup;
  globalAccent: string;
}

export function SkillGroupPreview({ group, globalAccent }: SkillGroupPreviewProps) {
  const accent = group.accentColorOverride || globalAccent;

  const getLevelLabel = (item: SkillItem) => {
    if (group.levelMode === "percentage") return `${item.level}%`;
    if (group.levelMode === "number") return Math.round((item.level / 100) * 10) || 1;
    
    // text mode
    const idx = Math.min(4, Math.floor(item.level / 20));
    return group.customTextLevels[idx] || group.customTextLevels[4];
  };

  const renderBar = (item: SkillItem) => {
    const { level, color } = item;
    const itemAccent = color || accent;
    
    switch (group.barStyle) {
      case "thin":
        return (
          <div className="w-full bg-gray-200 mt-1" style={{ height: "2px" }}>
            <div style={{ width: `${level}%`, backgroundColor: itemAccent, height: "100%" }} />
          </div>
        );
      case "thick":
        return (
          <div className="w-full bg-gray-200 rounded-sm mt-1" style={{ height: "6px" }}>
            <div className="rounded-sm" style={{ width: `${level}%`, backgroundColor: itemAccent, height: "100%" }} />
          </div>
        );
      case "segmented": {
        const segments = 5;
        const activeSegments = Math.round((level / 100) * segments);
        return (
          <div className="flex gap-1 mt-1 w-full" style={{ height: "6px" }}>
            {Array.from({ length: segments }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{ backgroundColor: i < activeSegments ? accent : "#e5e7eb" }}
              />
            ))}
          </div>
        );
      }
      case "dots": {
        const dots = 5;
        const activeDots = Math.round((level / 100) * dots);
        return (
          <div className="flex gap-1.5 mt-1">
            {Array.from({ length: dots }).map((_, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: i < activeDots ? accent : "#e5e7eb",
                }}
              />
            ))}
          </div>
        );
      }
    }
  };

  return (
    <div className="mb-4 break-inside-avoid">
      <h4 className="font-semibold mb-2" style={{ color: accent, fontSize: "1em" }}>
        {group.title}
      </h4>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {group.items.map((item) => (
          <div key={item.id} className="flex flex-col justify-center">
            <div className="flex justify-between items-end mb-0.5">
              <span className="font-medium" style={{ fontSize: "0.9em" }}>{item.name}</span>
              {group.showLevelLabel && (
                <span className="text-[color:var(--color-muted)]" style={{ fontSize: "0.8em" }}>
                  {getLevelLabel(item)}
                </span>
              )}
            </div>
            {renderBar(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
