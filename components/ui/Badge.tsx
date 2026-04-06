type BadgeVariant = "default" | "sold-out" | "one-of-one" | "new";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-oat text-brown border border-border",
  "sold-out": "bg-ink/10 text-muted border border-border",
  "one-of-one": "bg-rose-light/40 text-rose-dark border border-rose-light",
  new: "bg-sage/20 text-sage-dark border border-sage/40",
};

export default function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5
        text-xs font-sans font-medium tracking-wider uppercase
        rounded-sm
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
