import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ProfileSkeleton = () => (
  <div className="flex gap-4 bg-white p-6 rounded-lg shadow-md">
    <Skeleton circle width={80} height={80} />
    <div className="flex-1">
      <Skeleton width="40%" height={24} className="mb-2" />
      <Skeleton width="60%" className="mb-2" />
      <Skeleton count={2} className="mb-2" />
      <div className="flex gap-2 mt-4">
        <Skeleton width={100} height={36} />
        <Skeleton width={100} height={36} />
      </div>
    </div>
  </div>
);

export const ProfileSkeletonList = ({ count = 4 }: { count?: number }) => (
  <div className="space-y-4">
    {[...Array(count)].map((_, i) => (
      <ProfileSkeleton key={i} />
    ))}
  </div>
);
