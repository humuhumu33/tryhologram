"use client";

import { MathJax } from "better-react-mathjax";

interface MathProps {
  children: string;
  inline?: boolean;
  className?: string;
}

export function Math({ children, inline = false, className }: MathProps) {
  return (
    <MathJax inline={inline} className={className}>
      {inline ? `\\(${children}\\)` : `\\[${children}\\]`}
    </MathJax>
  );
}
