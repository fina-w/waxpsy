import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Skeleton pour ShareExperience.tsx et autres formulaires
export const FormSkeleton = () => (
  <div className="max-w-2xl mx-auto">
    {/* Titre */}
    <Skeleton height={40} width="60%" className="mx-auto mb-8" />

    {/* Formulaire */}
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Champ 1 */}
      <div>
        <Skeleton width={150} height={20} className="mb-2" />
        <Skeleton height={48} borderRadius={8} />
      </div>

      {/* Champ 2 */}
      <div>
        <Skeleton width={150} height={20} className="mb-2" />
        <Skeleton height={48} borderRadius={8} />
      </div>

      {/* Champ textarea */}
      <div>
        <Skeleton width={180} height={20} className="mb-2" />
        <Skeleton height={200} borderRadius={8} />
      </div>

      {/* Bouton submit */}
      <Skeleton height={48} borderRadius={8} />
    </div>
  </div>
);
