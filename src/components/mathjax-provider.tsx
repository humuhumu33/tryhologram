"use client";

import { MathJaxContext } from "better-react-mathjax";
import { ReactNode } from "react";

const mathJaxConfig = {
  loader: { load: ["[tex]/ams"] },
  tex: {
    packages: { "[+]": ["ams"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};

interface MathJaxProviderProps {
  children: ReactNode;
}

export function MathJaxProvider({ children }: MathJaxProviderProps) {
  return (
    <MathJaxContext config={mathJaxConfig}>{children}</MathJaxContext>
  );
}
