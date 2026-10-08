import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface ResilientDishImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  fallbackAccent?: string;
  className?: string;
}

export const ResilientDishImage: React.FC<ResilientDishImageProps> = ({
  src,
  alt,
  fallbackTitle,
  fallbackAccent = '#B9381E',
  className = 'w-full h-full object-cover'
}) => {
  const [hasError, setHasError] = useState(false);

  // Normalize path so /src/assets/images/ also maps to /images/ in production builds
  const normalizedSrc = src.startsWith('/src/assets/images/')
    ? src.replace('/src/assets/images/', '/images/')
    : src;

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center bg-[#F2EFE9] border border-[#E6E1D8] ${className}`}
      >
        <Utensils className="w-8 h-8 mb-2 opacity-60" style={{ color: fallbackAccent }} />
        <span className="font-display text-sm font-semibold text-[#1C1917] max-w-[20ch]">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={normalizedSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

