import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Skeleton pour Articles.tsx et Histoire.tsx (pages de détail avec contenu long)
export const ArticleDetailSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4">
    {/* Navigation breadcrumb */}
    <div className="flex items-center space-x-4 mb-8">
      <Skeleton width={60} height={20} />
      <Skeleton width={100} height={36} borderRadius={20} />
      <Skeleton width={100} height={36} borderRadius={20} />
    </div>

    {/* Titre */}
    <Skeleton height={40} className="mb-6" />

    {/* Image principale */}
    <Skeleton height={300} className="mb-6 rounded-lg" />

    {/* Métadonnées (auteur, date, etc.) */}
    <div className="flex items-center gap-4 mb-8">
      <Skeleton circle width={40} height={40} />
      <div className="flex-1">
        <Skeleton width={150} height={20} className="mb-2" />
        <Skeleton width={100} height={16} />
      </div>
    </div>

    {/* Contenu de l'article */}
    <div className="space-y-4">
      <Skeleton count={3} />
      <Skeleton count={2} />
      <Skeleton count={4} />
      <Skeleton count={3} />
      <Skeleton count={2} />
    </div>

    {/* Tags */}
    <div className="flex gap-2 mt-8">
      <Skeleton width={80} height={32} borderRadius={16} />
      <Skeleton width={100} height={32} borderRadius={16} />
      <Skeleton width={90} height={32} borderRadius={16} />
    </div>
  </div>
);
