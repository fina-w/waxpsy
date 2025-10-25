import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchEvenements } from '../services/api';
import { format, compareDesc, compareAsc } from 'date-fns';
import { fr } from 'date-fns/locale';
import Footer from './footer';
import { CalendrierSkeleton } from './skeletons';
import SearchFilters from './ui/SearchFilters';
import { Bars3Icon, HomeIcon, UserIcon, BriefcaseIcon, ChatBubbleLeftRightIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  // États
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  type SortOrder = 'recent' | 'ancien';
  const [sortOrder, setSortOrder] = useState<SortOrder>('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 6 événements par page

  // Configuration des filtres pour SearchFilters
  const filters = [
    {
      name: 'tri',
      label: 'Trier par',
      type: 'select' as const,
      options: [
        { value: 'recent', label: 'Plus récents' },
        { value: 'ancien', label: 'Plus anciens' }
      ],
      defaultValue: 'recent'
    }
  ];

  // Gestion de la recherche
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset à la première page lors d'une nouvelle recherche
  }, []);

  // Gestion du changement de filtre
  const handleFilterChange = useCallback((filterName: string, value: string | number) => {
    if (filterName === 'tri' && (value === 'recent' || value === 'ancien')) {
      setSortOrder(value as 'recent' | 'ancien');
      setCurrentPage(1); // Reset à la première page lors d'un changement de filtre
    }
  }, []);

  // Filtrer et trier les événements
  const filteredAndSortedEvents = useMemo(() => {
    let result = [...evenements];

    // Filtrer par terme de recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(evt =>
        evt.titre.toLowerCase().includes(term) ||
        evt.description.toLowerCase().includes(term) ||
        evt.lieu?.toLowerCase().includes(term) ||
        evt.type.toLowerCase().includes(term)
      );
    }

    // Trier par date
    result.sort((a, b) => {
      return sortOrder === 'recent'
        ? compareDesc(a.date, b.date)
        : compareAsc(a.date, b.date);
    });

    return result;
  }, [evenements, searchTerm, sortOrder]);

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
        // Trier par date décroissante par défaut
        evenementsAvecDates.sort((a: Evenement, b: Evenement) =>
          compareDesc(a.date, b.date)
        );
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

  // Fonction pour obtenir la classe de badge en fonction du type d'événement
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'webinaire':
        return 'bg-blue-100 text-blue-800';
      case 'formation':
        return 'bg-yellow-100 text-yellow-800';
      case 'atelier':
        return 'bg-purple-100 text-purple-800';
      case 'conference':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Pagination des événements
  const totalPages = Math.ceil(filteredAndSortedEvents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const evenementsAffiches = filteredAndSortedEvents.slice(indexOfFirstItem, indexOfLastItem);

  // Log pour débogage
  console.log('Total événements:', filteredAndSortedEvents.length);
  console.log('Événements par page:', itemsPerPage);
  console.log('Nombre total de pages:', totalPages);
  console.log('Événements affichés:', evenementsAffiches.length);

  // Gestion du changement de page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <CalendrierSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100 flex items-center justify-center">
        <div className="text-red-500 text-center p-4">
          <p className="text-xl font-semibold">Erreur</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
          Calendrier des Événements
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Découvrez nos prochains événements et ateliers sur la santé mentale
        </p>

        {/* Barre de recherche et filtres */}
        <div className="mb-8 max-w-3xl mx-auto">
          <SearchFilters
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filters={filters}
            searchPlaceholder="Rechercher un événement..."
            className="space-y-4"
          />
        </div>

        <div className="p-6 mb-8">
          {evenementsAffiches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {evenementsAffiches.map((evenement) => (
                <div
                  key={evenement.id}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
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
                      <div className="text-gray-300">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{evenement.titre}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getTypeBadgeClass(evenement.type)}`}>
                        {evenement.type}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-1">{evenement.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        {format(evenement.date, 'PPP', { locale: fr })}
                      </div>

                      {evenement.heureDebut && evenement.heureFin && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {evenement.heureDebut} - {evenement.heureFin}
                        </div>
                      )}

                      {evenement.lieu && (
                        <div className="flex items-start">
                          <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span className="line-clamp-2">{evenement.lieu}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <a
                        href={evenement.lien || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        En savoir plus
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun événement trouvé.</p>
              <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos critères de recherche.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              {/* Bouton Précédent */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Précédent
              </button>

              {/* Numéros de page */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-green-600 text-white'
                        : 'border border-green-600 text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              {/* Bouton Suivant */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Suivant
              </button>
            </div>
          )}
        </div>

        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-[#015635">Proposez un événement</h2>
          <p className="text-gray-700 mb-4">
            Vous organisez un événement en lien avec la santé mentale ? Faites-le nous savoir !
          </p>
          <a
            href="mailto:contact@waxpsy.fr"
            className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#038855] hover:bg-[#015635]"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Nous contacter
          </a>
        </div>
      </div>


      <Footer/>
    </div>
  );
};

export default CalendrierEvenements;
