import { create } from 'zustand';

interface ImageCacheState {
  loadedImages: Record<string, boolean>;
  setImageLoaded: (src: string) => void;
  preloadImages: (sources: string[]) => void;
}

export const useImageCache = create<ImageCacheState>((set, get) => ({
  loadedImages: {},
  
  setImageLoaded: (src) =>
    set((state) => ({
      loadedImages: { ...state.loadedImages, [src]: true },
    })),
    
  preloadImages: (sources: string[]) => {
    sources.forEach((src) => {
      if (!get().loadedImages[src]) {
        const img = new Image();
        img.src = src;
        img.onload = () => get().setImageLoaded(src);
      }
    });
  },
}));
