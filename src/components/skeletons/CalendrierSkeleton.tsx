import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Skeleton pour CalendrierEvenements.tsx (liste d'événements avec dates)
export const CalendrierSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    {/* Titre */}
    <Skeleton height={40} width="40%" className="mx-auto mb-8" />

    {/* Filtres/Navigation */}
    <div className="flex justify-between items-center mb-8">
      <Skeleton width={120} height={40} />
      <Skeleton width={200} height={40} />
      <Skeleton width={120} height={40} />
    </div>

    {/* Liste des événements */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Image de l'événement */}
          <Skeleton height={200} />
          
          <div className="p-6">
            {/* Badge type + date */}
            <div className="flex justify-between items-center mb-3">
              <Skeleton width={80} height={24} borderRadius={12} />
              <Skeleton width={100} height={20} />
            </div>

            {/* Titre */}
            <Skeleton height={24} className="mb-3" />

            {/* Description */}
            <Skeleton count={2} className="mb-4" />

            {/* Lieu et heure */}
            <div className="space-y-2 mb-4">
              <Skeleton width="70%" height={20} />
              <Skeleton width="60%" height={20} />
            </div>

            {/* Bouton */}
            <Skeleton height={40} borderRadius={8} />
          </div>
        </div>
      ))}
    </div>
  </div>
);
