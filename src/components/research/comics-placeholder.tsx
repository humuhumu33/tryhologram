import { BookOpen } from 'lucide-react';
import './research.css';

interface ComicsPlaceholderProps {
  title: string;
  description: string;
}

export function ComicsPlaceholder({ title, description }: ComicsPlaceholderProps) {
  return (
    <div className="comics-placeholder">
      <BookOpen size={32} className="mx-auto mb-3 text-purple opacity-50" />
      <h3 className="comics-placeholder-title">{title}</h3>
      <p className="comics-placeholder-text">{description}</p>
    </div>
  );
}
