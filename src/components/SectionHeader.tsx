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
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-cyan">
        <span className="h-px w-8 bg-[var(--cyan)]" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      {desc && <p className="mt-4 text-lg text-muted-foreground">{desc}</p>}
    </div>
  );
}

export default SectionHeader;
