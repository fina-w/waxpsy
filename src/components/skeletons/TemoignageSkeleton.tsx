import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const TemoignageSkeleton = () => (
  <div className="bg-white rounded-xl p-6 shadow-md">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <Skeleton circle width={40} height={40} />
        <div>
          <Skeleton width={100} height={16} />
          <Skeleton width={80} height={12} className="mt-1" />
        </div>
      </div>
    </div>
    <div className="flex items-center gap-3 mb-4">
      <Skeleton width="70%" height={20} />
      <Skeleton width={60} height={24} />
    </div>
    <Skeleton count={4} className="mb-4" />
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <Skeleton width={60} height={20} />
      <Skeleton width={100} height={36} />
    </div>
  </div>
);

export const TemoignageSkeletonGrid = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[...Array(count)].map((_, i) => (
      <TemoignageSkeleton key={i} />
    ))}
  </div>
);
