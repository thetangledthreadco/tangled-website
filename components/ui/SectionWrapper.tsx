interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  narrow?: boolean;
}

export default function SectionWrapper({
  children,
  className = "",
  as: Tag = "section",
  narrow = false,
}: SectionWrapperProps) {
  return (
    <Tag
      className={`
        w-full px-6 md:px-12 py-20 md:py-28
        ${className}
      `}
    >
      <div className={`mx-auto ${narrow ? "max-w-3xl" : "max-w-6xl"}`}>
        {children}
      </div>
    </Tag>
  );
}
