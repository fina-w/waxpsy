import { useState, useEffect } from 'react';
import { useImageCache } from '../../stores/imageCache';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  placeholder?: string;
  containerClassName?: string;
}

export const OptimizedImage = ({
  src,
  placeholder = '/placeholder.jpg',
  className = '',
  containerClassName = '',
  alt = '',
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { loadedImages, setImageLoaded } = useImageCache();
  const isCached = loadedImages[src];

  useEffect(() => {
    if (isCached) {
      setIsLoading(false);
      return;
    }

    const img = new Image();
    img.src = src;
    
    const handleLoad = () => {
      setImageLoaded(src);
      setIsLoading(false);
    };

    img.onload = handleLoad;
    
    // Nettoyage
    return () => {
      img.onload = null;
    };
  }, [src, isCached, setImageLoaded]);

  // Si l'image est en cours de chargement ou n'est pas encore en cache
  if (isLoading) {
    return (
      <div className={`relative ${containerClassName}`}>
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
        <img
          src={placeholder}
          alt=""
          className={`${className} opacity-0`}
          {...props}
        />
      </div>
    );
  }

  // Image chargée
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} transition-opacity duration-300`}
      loading="lazy"
      {...props}
    />
  );
};
