import { Rating } from '../ui/Rating';

interface RatingSummaryProps {
  averageRating: number;
  totalRatings: number;
  ratingDistribution: Record<number, number>; // {5: 10, 4: 5, ...}
  className?: string;
}

export const RatingSummary = ({
  averageRating,
  totalRatings,
  ratingDistribution,
  className = '',
}: RatingSummaryProps) => {
  // Calculate percentage for each rating
  const getPercentage = (rating: number) => {
    if (totalRatings === 0) return 0;
    return Math.round((ratingDistribution[rating] || 0) / totalRatings * 100);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6">
        <div className="text-center mb-4 md:mb-0">
          <div className="text-5xl font-bold text-gray-900">
            {averageRating.toFixed(1)}
          </div>
          <div className="mt-1">
            <Rating value={Math.round(averageRating)} readOnly size={24} />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {totalRatings} avis
          </p>
        </div>

        <div className="w-full max-w-xs space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <div className="w-8 text-sm font-medium text-gray-700">
                {rating}
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full mx-2 overflow-hidden">
                <div
                  className="bg-yellow-400 h-full rounded-full"
                  style={{
                    width: `${getPercentage(rating)}%`,
                    transition: 'width 0.5s ease-in-out',
                  }}
                />
              </div>
              <div className="w-10 text-right text-sm text-gray-500">
                {getPercentage(rating)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingSummary;
