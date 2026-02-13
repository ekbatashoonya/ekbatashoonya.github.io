import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useModePath } from '@/hooks/useModePath';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { homePath } = useModePath();

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground">
        <li>
          <Link 
            to={homePath} 
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            {item.href ? (
              <Link 
                to={item.href} 
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
