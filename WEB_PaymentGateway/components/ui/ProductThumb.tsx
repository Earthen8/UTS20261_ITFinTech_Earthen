interface ProductThumbProps {
  emoji?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProductThumb({ emoji = '📦', size = 'md', className = '' }: ProductThumbProps) {
  const sizeClasses = {
    sm: 'h-10 w-10 text-lg',
    md: 'h-14 w-14 text-2xl',
    lg: 'h-20 w-20 text-4xl',
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl bg-violet-50 ${sizeClasses[size] || sizeClasses.md} ${className}`}
      aria-hidden="true"
    >
      <span>{emoji}</span>
    </div>
  );
}
