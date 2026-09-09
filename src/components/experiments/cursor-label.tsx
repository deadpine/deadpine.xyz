"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type CursorLabelProps = {
  visible: boolean;
  label?: string;
};

export function CursorLabel({
  visible,
  label = "view project",
}: CursorLabelProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed z-50 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-white/85 px-2.5 py-1 font-mono text-xs tracking-wide text-black shadow-md backdrop-blur-md transition-opacity duration-150 lg:block",
        visible ? "opacity-100" : "opacity-0"
      )}
      style={{
        left: pos.x,
        top: pos.y + 18,
      }}
    >
      {label}
    </div>
  );
}
