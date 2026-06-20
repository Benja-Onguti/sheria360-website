/*
  Custom implementation of the `emilkowalski/skill` UI primitives.
  Enhanced with Emil Kowalski design engineering principles:
  - Custom easing curves
  - Press feedback (scale on active)
  - Origin-aware animations
  - Hover-only-on-desktop guard
  - Reduced motion support
*/

import React from 'react';

/* ---------- Container ---------- */
export function Container({ className = '', children, ...props }) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/* ---------- Button ---------- */
const variantStyles = {
  default:
    'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  outline:
    'border border-slate-300 text-slate-900 hover:bg-slate-100 focus:ring-slate-500',
  ghost:
    'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-500',
};
const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

/* Emil principles applied:
   - No transition:all – specify transform & colors separately
   - Use --ease-out custom cubic-bezier
   - Scale down on :active for press feedback (160ms)
   - Scale up on :hover (desktop only via media query CSS)
*/
const buttonBase = [
  'inline-flex items-center justify-center rounded-lg font-medium',
  'transition-[transform,colors,box-shadow] duration-200',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
  'active:scale-[0.97] active:transition-[transform] active:duration-160',
  'press-feedback',
].join(' ');

export function Button({
  variant = 'default',
  size = 'md',
  className = '',
  asChild = false,
  children,
  ...props
}) {
  const cls = `${buttonBase} ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size] || sizeStyles.md} ${className}`;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      className: `${cls} ${children.props.className || ''}`,
    });
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

/* ---------- Badge ---------- */
export function Badge({ className = '', children, ...props }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

/* ---------- Card ----------
   Emil principles:
   - Hover lift with translateY (on desktop only, guarded by CSS)
   - Subtle border and shadow
   - transition on transform and shadow only
*/
const cardBase = [
  'rounded-xl border border-slate-200 bg-white shadow-sm',
  'transition-[transform,box-shadow] duration-200',
  'hover-lift',
].join(' ');

export function Card({ className = '', children, ...props }) {
  return (
    <div className={`${cardBase} ${className}`} {...props}>
      {children}
    </div>
  );
}
