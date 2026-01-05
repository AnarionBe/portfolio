interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  const hoverClass = hover
    ? "hover:border-primary/50 hover:shadow-[0_0_20px_rgba(115,191,211,0.15)] transition-all duration-300"
    : "";

  return (
    <div
      className={`relative bg-secondary/40 backdrop-blur-md border border-neutral/30 rounded-lg p-6 overflow-hidden ${hoverClass} ${className}`}
    >
      {/* Glassmorphism reflection overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Primary color accent on top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
