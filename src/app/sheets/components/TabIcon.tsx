interface TabIconProps {
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  isSelected: boolean;
}

export function TabIcon({ icon: Icon, isSelected }: TabIconProps) {
  return (
    <div className={`w-6 h-6 md:w-6 md:h-6 ${isSelected ? "text-foreground" : ""}`}>
      <Icon size={20} className="w-full h-full md:w-6 md:h-6" />
    </div>
  );
}
