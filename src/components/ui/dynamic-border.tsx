import React, { useEffect, useRef, useState } from "react";

import type { PropsWithChildren } from "react";

type DynamicBorderProps = PropsWithChildren<{}>;

export function DynamicBorder({ children }: DynamicBorderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const throttleTimeout = useRef<number | null>(null);
  const [coordinates, setCoordinates] = useState({ x: -350, y: -350 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current || throttleTimeout.current) {
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const diffX = e.clientX - rect.x;
    const diffY = e.clientY - rect.y;
    setCoordinates({ x: diffX, y: diffY });

    throttleTimeout.current = setTimeout(() => {
      throttleTimeout.current = null;
    }, 100);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="cover relative isolate"
      style={
        {
          "--x": `${coordinates.x}px`,
          "--y": `${coordinates.y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
