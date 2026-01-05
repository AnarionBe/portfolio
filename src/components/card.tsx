interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  const hoverClass = hover
    ? "hover:border-primary transition-colors duration-200"
    : "";

  return (
    <div
      className={`bg-secondary border border-neutral rounded-lg p-6 ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}
