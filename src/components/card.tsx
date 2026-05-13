interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  image?: string;
  imageAlt?: string;
}

export function Card({
  children,
  className = "",
  hover = false,
  image,
  imageAlt = "",
}: CardProps) {
  const hoverClass = hover
    ? "hover:border-primary/50 hover:shadow-[0_0_20px_rgba(115,191,211,0.15)] transition-all duration-300"
    : "";

  return (
    <div
      className={`relative bg-secondary/40 backdrop-blur-md border border-neutral/30 rounded-lg overflow-hidden flex flex-col ${hoverClass} ${className}`}
    >
      {/* Image section if provided */}
      {image && (
        <div className="relative w-full h-48 overflow-hidden shrink-0 flex items-center justify-center bg-secondary/60">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-contain"
          />
          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-secondary/60" />
        </div>
      )}

      {/* Content section */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Glassmorphism reflection overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

        {/* Primary color accent on top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
}
