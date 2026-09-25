import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="section-caption">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      {desc && <p className="mt-4 text-lg text-muted-foreground">{desc}</p>}
    </div>
  );
}

export default SectionHeader;
