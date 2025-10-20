import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Skeleton pour la liste des quiz (QuizPage.tsx - page d'accueil)
export const QuizListSkeleton = () => (
  <div className="max-w-4xl mx-auto">
    {/* En-tête */}
    <div className="text-center mb-12">
      <Skeleton height={48} width="50%" className="mx-auto mb-4" />
      <Skeleton height={24} width="70%" className="mx-auto" count={2} />
    </div>

    {/* Grille de quiz */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-md p-6">
          <Skeleton circle width={48} height={48} className="mb-4" />
          <Skeleton height={28} width="80%" className="mb-2" />
          <Skeleton count={2} className="mb-4" />
          <div className="flex justify-between mb-4">
            <Skeleton width={100} height={20} />
            <Skeleton width={100} height={20} />
          </div>
          <Skeleton height={48} borderRadius={8} />
        </div>
      ))}
    </div>
  </div>
);

// Skeleton pour une question de quiz en cours
export const QuizQuestionSkeleton = () => (
  <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
    {/* Barre de progression */}
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <Skeleton width={150} height={20} />
        <Skeleton width={60} height={20} />
      </div>
      <Skeleton height={8} borderRadius={4} />
    </div>

    {/* Question */}
    <Skeleton height={32} className="mb-8" count={2} />

    {/* Options de réponse */}
    <div className="space-y-4 mb-8">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} height={56} borderRadius={8} />
      ))}
    </div>

    {/* Bouton suivant */}
    <Skeleton height={48} borderRadius={8} />
  </div>
);
