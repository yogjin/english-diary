import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full';
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  full: 'max-w-full',
};

export function Layout({ children, maxWidth = '6xl', className = '' }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className={`${maxWidthClasses[maxWidth]} mx-auto ${className}`}>{children}</div>
      </div>
    </div>
  );
}
