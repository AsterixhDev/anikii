import type { ReactNode } from 'react';
import { Link } from 'react-router';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'ghost' | 'link' | 'outline' | 'gradient';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  to?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  href,
  to,
  className = '',
  onClick,
  type = 'button',
  style,
}: ButtonProps): React.ReactElement {
  const baseClasses = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out transform-gpu hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none rounded-xl btn-mobile';
  
  const variantClasses = {
    primary: `bg-[var(--color-primary)] text-[var(--color-primary-content)] hover:bg-[var(--color-primary)]/90 shadow-lg hover:shadow-xl focus:ring-[var(--color-primary)]`,
    secondary: `bg-[var(--color-secondary)] text-[var(--color-secondary-content)] hover:bg-[var(--color-secondary)]/90 shadow-lg hover:shadow-xl focus:ring-[var(--color-secondary)]`,
    accent: `bg-[var(--color-accent)] text-[var(--color-accent-content)] hover:bg-[var(--color-accent)]/90 shadow-lg hover:shadow-xl focus:ring-[var(--color-accent)]`,
    neutral: `bg-[var(--color-neutral)] text-[var(--color-neutral-content)] hover:bg-[var(--color-neutral)]/90 shadow-lg hover:shadow-xl focus:ring-[var(--color-neutral)]`,
    ghost: `bg-[var(--color-base-200)]/50 hover:bg-[var(--color-base-200)] text-[var(--color-base-content)]/70 hover:text-[var(--color-base-content)] border border-[var(--color-base-300)]/50 hover:border-[var(--color-base-300)]`,
    link: `text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 underline-offset-4 hover:underline transition-colors duration-200`,
    outline: `bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-content)] transition-all duration-300`,
    gradient: `bg-theme-gradient hover:bg-theme-gradient/90 text-[var(--color-primary-content)] shadow-lg hover:shadow-xl focus:ring-[var(--color-primary)]`,
  };
  
  const sizeClasses = {
    xs: 'px-3 py-1.5 text-xs rounded-lg',
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
    xl: 'px-10 py-5 text-xl rounded-2xl',
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    variant !== 'ghost' && variant !== 'link' ? 'before:absolute before:inset-0 before:rounded-xl before:bg-white/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && <span className="loading loading-spinner loading-sm mr-2" />}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} style={style}>
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
    >
      {content}
    </button>
  );
}