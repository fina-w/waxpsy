import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Skeleton pour la section Troubles du Homepage (carousel)
export const TroublesCarouselSkeleton = () => (
  <section className="py-16 px-6 bg-gradient-to-r from-white via-white to-blue-100">
    <div className="max-w-7xl mx-auto">
      {/* Titre de section */}
      <Skeleton height={40} width="30%" className="mx-auto mb-12" />

      {/* Carousel de troubles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-transparent">
            <Skeleton height={200} className="mb-4" />
            <Skeleton height={28} width="70%" className="mx-auto mb-2" />
            <Skeleton height={20} width="50%" className="mx-auto" />
          </div>
        ))}
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-center gap-4 mt-8">
        <Skeleton circle width={40} height={40} />
        <Skeleton circle width={40} height={40} />
      </div>
    </div>
  </section>
);

// Skeleton pour la section Témoignages du Homepage
export const TemoignagesCarouselSkeleton = () => (
  <section className="py-16 px-6 bg-gradient-to-r from-white via-white to-blue-100">
    <div className="max-w-7xl mx-auto">
      {/* Titre de section */}
      <Skeleton height={40} width="40%" className="mx-auto mb-12" />

      {/* Carousel de témoignages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
            {/* Avatar + nom */}
            <div className="flex items-center gap-3 mb-4">
              <Skeleton circle width={40} height={40} />
              <div className="flex-1">
                <Skeleton width="60%" height={20} className="mb-1" />
                <Skeleton width="40%" height={16} />
              </div>
            </div>

            {/* Titre du témoignage */}
            <Skeleton height={24} width="80%" className="mb-3" />

            {/* Contenu */}
            <Skeleton count={3} className="mb-4" />

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 border-t">
              <Skeleton width={60} height={20} />
              <Skeleton width={80} height={32} borderRadius={8} />
            </div>
          </div>
        ))}
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-center gap-4 mt-8">
        <Skeleton circle width={40} height={40} />
        <Skeleton circle width={40} height={40} />
      </div>
    </div>
  </section>
);
