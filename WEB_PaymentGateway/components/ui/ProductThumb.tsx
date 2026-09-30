import { useState } from 'react';

interface ProductThumbProps {
  imageUrl?: string;
  emoji?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProductThumb({
  imageUrl,
  emoji = '📦',
  size = 'md',
  className = '',
}: ProductThumbProps) {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'h-11 w-11',
    md: 'h-16 w-16',
    lg: 'h-20 w-20',
  };

  const emojiSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  if (imageUrl && !hasError) {
    return (
      <div
        className={`shrink-0 overflow-hidden rounded-2xl ${sizeClasses[size]} ${className}`}
      >
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl bg-[#f0ebe4] ${sizeClasses[size]} ${emojiSizes[size]} ${className}`}
      aria-hidden="true"
    >
      <span>{emoji}</span>
    </div>
  );
}
