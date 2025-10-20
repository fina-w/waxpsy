import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const CardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <Skeleton height={200} />
    <div className="p-6">
      <Skeleton width="70%" height={24} className="mb-4" />
      <Skeleton count={3} className="mb-2" />
      <Skeleton width="40%" height={32} className="mt-4" />
    </div>
  </div>
);

export const CardSkeletonGrid = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(count)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);
