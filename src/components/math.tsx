interface MathProps {
  children: string;
  inline?: boolean;
  className?: string;
}

export function Math({ children, inline = false, className }: MathProps) {
  return <span className={className}>{children}</span>;
}
