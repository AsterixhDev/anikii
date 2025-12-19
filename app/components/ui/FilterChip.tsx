import type { ReactNode } from 'react';

interface FilterChipProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function FilterChip({
  children,
  active = false,
  onClick,
  disabled = false,
  className = ""
}: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transform hover:scale-105 active:scale-95
        focus:ring-[var(--color-primary)]
        ${active 
          ? 'bg-[var(--color-primary)] text-[var(--color-primary-content)] shadow-lg shadow-[var(--color-primary)]/30' 
          : 'bg-[var(--color-base-200)] text-[var(--color-base-content)] hover:bg-[var(--color-base-300)]'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}