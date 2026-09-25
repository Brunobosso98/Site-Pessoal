import { useEffect, useRef, useState, type ReactNode, type AnchorHTMLAttributes } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { MotionContext, useMotionExperience } from "@/hooks/use-motion-experience";

export function MotionExperience({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    try {
      setPaused(sessionStorage.getItem("portfolio-motion") === "paused");
    } catch {
      /* Storage can be unavailable in private browsing. */
    }
  }, []);
  const toggle = () => {
    const next = !paused;
    setPaused(next);
    try {
      sessionStorage.setItem("portfolio-motion", next ? "paused" : "playing");
    } catch {
      /* The preference still applies for this visit. */
    }
  };
  const staticMotion = !!reduced || paused;
  return (
    <MotionContext.Provider value={{ staticMotion, paused, toggle }}>
      <MotionConfig reducedMotion={staticMotion ? "always" : "user"}>
        <div data-motion={staticMotion ? "static" : "full"}>{children}</div>
      </MotionConfig>
    </MotionContext.Provider>
  );
}

/** The server-rendered title remains readable before hydration. */
export function KineticTitle({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { staticMotion } = useMotionExperience();
  useEffect(() => {
    if (staticMotion) return;
    const animations = Array.from(ref.current?.querySelectorAll(".title-line > span") ?? []).map(
      (line, index) =>
        line.animate(
          [
            { transform: "translateY(105%) rotate(2deg)", filter: "blur(5px)" },
            { transform: "translateY(0) rotate(0)", filter: "blur(0)" },
          ],
          {
            duration: 1000,
            delay: index * 110,
            easing: "cubic-bezier(.16,1,.3,1)",
            fill: "backwards",
          },
        ),
    );
    return () => animations.forEach((animation) => animation.cancel());
  }, [staticMotion]);
  return (
    <h1 ref={ref} className="kinetic-title">
      {children}
    </h1>
  );
}

export function MagneticLink({
  children,
  href,
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { staticMotion } = useMotionExperience();
  return (
    <a
      {...props}
      ref={ref}
      href={href}
      className={`magnetic-link ${className}`}
      onPointerMove={(event) => {
        if (staticMotion || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--mx",
          `${(event.clientX - rect.left - rect.width / 2) * 0.09}px`,
        );
        event.currentTarget.style.setProperty(
          "--my",
          `${(event.clientY - rect.top - rect.height / 2) * 0.14}px`,
        );
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--mx", "0px");
        ref.current?.style.setProperty("--my", "0px");
      }}
    >
      {children}
    </a>
  );
}
