import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Skeleton pour Glossaire.tsx (liste de termes avec définitions)
export const GlossaireSkeleton = () => (
  <div className="max-w-4xl mx-auto">
    {/* En-tête */}
    <div className="text-center mb-12">
      <Skeleton height={48} width="60%" className="mx-auto mb-6" />
      
      {/* Card d'introduction */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <Skeleton height={32} width="50%" className="mx-auto mb-4" />
        <Skeleton count={4} />
      </div>

      {/* Barre de recherche */}
      <Skeleton height={48} borderRadius={8} className="max-w-2xl mx-auto" />
    </div>

    {/* Liste des termes */}
    <div className="space-y-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between mb-3">
            <Skeleton width={200} height={28} />
            <Skeleton width={80} height={24} borderRadius={12} />
          </div>
          <Skeleton count={2} />
        </div>
      ))}
    </div>
  </div>
);
