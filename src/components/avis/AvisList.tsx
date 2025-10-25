import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Rating } from '../ui/Rating';
import { Avis } from '@/services/avisService';

interface AvisListProps {
  avis: Avis[];
  className?: string;
}

export const AvisList = ({ avis, className = '' }: AvisListProps) => {
  if (avis.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Aucun avis pour le moment. Soyez le premier à donner votre avis !</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {avis.map((avi) => (
        <div key={avi.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
          <div className="flex items-start space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={avi.utilisateurAvatar || ''} alt={avi.utilisateurNom} />
              <AvatarFallback className="bg-[#015635] text-white">
                {avi.utilisateurNom
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{avi.utilisateurNom}</h4>
                  <div className="flex items-center mt-0.5">
                    <Rating value={avi.note} readOnly size={16} />
                    <span className="ml-2 text-sm text-gray-500">
                      {format(new Date(avi.date), 'dd MMMM yyyy', { locale: fr })}
                    </span>
                  </div>
                </div>
              </div>
              
              {avi.commentaire && (
                <p className="mt-2 text-gray-700">{avi.commentaire}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvisList;
