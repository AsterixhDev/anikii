import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  disabled = false
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search 
          className={`w-5 h-5 transition-colors duration-300 ${
            isFocused ? 'text-[var(--color-primary)]' : 'text-[var(--color-base-content)/50]'
          }`} 
        />
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full pl-12 pr-12 py-4 
          text-base sm:text-lg
          bg-[var(--color-base-100)]
          border-2 rounded-2xl
          transition-all duration-300 ease-out
          placeholder:text-[var(--color-base-content)/50]
          focus:outline-none focus:ring-0
          ${isFocused 
            ? 'border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/20' 
            : 'border-[var(--color-base-300)] hover:border-[var(--color-base-200)]'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
        `}
        style={{
          background: isFocused 
            ? 'linear-gradient(135deg, var(--color-base-100) 0%, var(--color-base-200)/30 100%)'
            : undefined
        }}
      />

      {/* Clear Button */}
      {value && !disabled && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--color-base-content)/50] hover:text-[var(--color-base-content)] transition-colors duration-200"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Focus Ring Effect */}
      {isFocused && (
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-20"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)',
            filter: 'blur(8px)',
            zIndex: -1
          }}
        />
      )}
    </div>
  );
}