import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { X } from 'lucide-react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export function FilterDrawer({ isOpen, onClose, children, title = "Filters & Sort" }: FilterDrawerProps) {
  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-96 lg:w-[480px] bg-primary/20 backdrop-blur-3xl shadow-2xl z-100 transform transition-transform duration-300 ease-out overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--color-base-300)]/20">
            <h2 className="text-xl font-semibold text-[var(--color-base-content)]">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[var(--color-base-200)] transition-colors duration-200"
              aria-label="Close filters"
            >
              <X className="w-5 h-5 text-[var(--color-base-content)]" />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {children}
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-[var(--color-base-300)]/20">
            <button
              onClick={onClose}
              className="w-full btn btn-primary btn-mobile"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}