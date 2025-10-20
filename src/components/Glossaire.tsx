import { useState, useEffect } from "react";
import { GlossaireSkeleton } from "./skeletons";

interface TermeGlossaire {
  id: string;
  terme: string;
  definition: string;
  categorie?: string;
}

const Glossaire: React.FC = () => {
  const [termes, setTermes] = useState<TermeGlossaire[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTermes = async () => {
      try {
        setLoading(true);
        const response = await fetch('db.json');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du glossaire');
        }
        const data = await response.json();
        setTermes(data.glossaire);
        setError(null);
      } catch (err) {
        console.error('Erreur:', err);
        setError('Impossible de charger le glossaire. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchTermes();
  }, []);

  const filteredTermes = termes.filter((terme) =>
    terme.terme.toLowerCase().includes(searchTerm.toLowerCase()) ||
    terme.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (terme.categorie && terme.categorie.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-white via-white to-blue-100 min-h-screen">
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <GlossaireSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-white via-white to-blue-100">
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Glossaire de termes psychologiques</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Qu'est-ce qu'une maladie mentale ?</h2>
            <p className="text-gray-600">
              Une maladie mentale est une maladie physique du cerveau qui provoque des perturbations dans la pensée, le comportement, 
              l'énergie ou l'émotion qui rendent difficile de faire face aux exigences ordinaires de la vie. 
              La recherche commence à découvrir les causes compliquées de ces maladies qui peuvent inclure la génétique, 
              la chimie du cerveau, la structure du cerveau, le traumatisme et / ou le fait d'avoir une autre condition médicale, 
              comme les maladies cardiaques.
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Rechercher un terme ou une définition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Liste des termes */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Terme
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Définition
                  </th>
                  {termes.some(t => t.categorie) && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Catégorie
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTermes.length > 0 ? (
                  filteredTermes.map((terme) => (
                    <tr key={terme.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{terme.terme}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-600">{terme.definition}</div>
                      </td>
                      {termes.some(t => t.categorie) && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          {terme.categorie && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                              {terme.categorie}
                            </span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={termes.some(t => t.categorie) ? 3 : 2} className="px-6 py-4 text-center text-gray-500">
                      Aucun terme trouvé pour "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Glossaire;