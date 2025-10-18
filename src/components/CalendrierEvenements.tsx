import React, { useState, useEffect } from 'react';
import { fetchEvenements } from '../services/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Footer from './footer';
import Header from './Header';

interface Evenement {
  id: string;
  titre: string;
  description: string;
  date: Date;
  lieu: string;
  type: 'webinaire' | 'formation' | 'atelier' | 'conference' | 'autre';
  lien?: string;
  image?: string;
  imageUrl?: string;
  heureDebut?: string;
  heureFin?: string;
  placesDisponibles?: number;
  prix?: number;
  organisateur?: string;
  contactEmail?: string;
  contactTelephone?: string;
}

const CalendrierEvenements: React.FC = () => {
  // État pour le mois en cours
  const [moisEnCours, setMoisEnCours] = useState<Date>(new Date());
  
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les événements depuis l'API
  useEffect(() => {
    const chargerEvenements = async () => {
      try {
        setLoading(true);
        const data = await fetchEvenements();
        // Convertir les dates de chaîne en objets Date
        const evenementsAvecDates = data.map((evt: any) => ({
          ...evt,
          date: new Date(evt.date)
        }));
        setEvenements(evenementsAvecDates);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des événements:', err);
        setError('Impossible de charger les événements. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    chargerEvenements();
  }, []);

  // Fonction pour obtenir la couleur en fonction du type d'événement
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'webinaire':
        return 'bg-blue-100 text-blue-800';
      case 'formation':
        return 'bg-green-100 text-green-800';
      case 'atelier':
        return 'bg-purple-100 text-purple-800';
      case 'conference':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Trier les événements par date
  const evenementsTries = [...evenements].sort((a, b) => a.date.getTime() - b.date.getTime());

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Chargement des événements...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Calendrier des Événements</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {format(moisEnCours, 'MMMM yyyy', { locale: fr })}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evenementsTries.map((evenement) => (
            <div 
              key={evenement.id} 
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                {evenement.imageUrl ? (
                  <img 
                    src={evenement.imageUrl} 
                    alt={evenement.titre} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-event.jpg';
                    }}
                  />
                ) : evenement.image ? (
                  <img 
                    src={evenement.image} 
                    alt={evenement.titre} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-event.jpg';
                    }}
                  />
                ) : (
                  <div className="text-gray-400">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-sm">Aucune image</span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{evenement.titre}</h3>
                    <p className="text-gray-600 text-sm">
                      {format(evenement.date, "EEEE d MMMM yyyy 'à' HH'h'mm", { locale: fr })}
                    </p>
                    <p className="text-gray-700 mt-1">
                      <span className="font-medium">Lieu :</span> {evenement.lieu}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getTypeColor(evenement.type)}`}>
                    {evenement.type.charAt(0).toUpperCase() + evenement.type.slice(1)}
                  </span>
                </div>
                
                <p className="text-gray-600 mt-2">{evenement.description}</p>
                
                {evenement.lien && (
                  <div className="mt-4">
                    <a
                      href={evenement.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                    >
                      En savoir plus
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {evenements.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucun événement prévu pour le moment.</p>
            <p className="text-gray-400 text-sm mt-2">Revenez plus tard pour découvrir nos prochains événements.</p>
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6 justify-center items-center text-center">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Proposez un événement</h2>
        <p className="text-gray-700 mb-4">
          Vous organisez un événement lié à la santé mentale au Sénégal ? Faites-le nous savoir !
        </p>
        <button 
          onClick={() => alert('Fonctionnalité à venir : Formulaire de soumission d\'événement')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Proposer un événement
        </button>
      </div>
    </div>
      </main>
      <Footer/>
    </div>
  );
};

export default CalendrierEvenements;
