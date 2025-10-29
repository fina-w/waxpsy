import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: number;
  className?: string;
}

export const Rating = ({
  value = 0,
  onChange,
  readOnly = false,
  size = 24,
  className,
}: RatingProps) => {
  const [hover, setHover] = useState<number | null>(null);
  const [rating, setRating] = useState(value);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const handleClick = (value: number) => {
    if (readOnly) return;
    setRating(value);
    if (onChange) onChange(value);
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = hover ? star <= (hover || 0) : star <= (rating || 0);

        return (
          <button
            key={star}
            type="button"
            className={cn(
              "transition-colors",
              !readOnly && "cursor-pointer hover:scale-110",
              isFilled ? "text-yellow-400" : "text-gray-300"
            )}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readOnly && setHover(star)}
            onMouseLeave={() => !readOnly && setHover(null)}
            disabled={readOnly}
            aria-label={`Noter ${star} étoile${star > 1 ? "s" : ""}`}
          >
            <Star
              size={size}
              className={cn(
                "fill-current",
                isFilled ? "opacity-100" : "opacity-50"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
