import React, { useState, useEffect } from 'react';
import Header from './Header';

interface Professionnel {
  id: string;
  nom: string;
  specialite: string;
  adresse: string;
  telephone: string;
  email: string;
  description: string;
  verification: boolean;
  langues: string[];
}

const ProfessionalsList: React.FC = () => {
  const [professionnels, setProfessionnels] = useState<Professionnel[]>([]);
  const [filteredProfessionnels, setFilteredProfessionnels] = useState<Professionnel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Temporarily hardcoded data for debugging - remove after confirming render
    const hardcodedData = [
      {
        id: "101",
        nom: "Cabinet Zeynab Ayub",
        specialite: "Psychiatre",
        adresse: "Dakar, Sénégal",
        telephone: "(221) 77 952 05",
        email: "zeynab.ayub@psychiatre.sn",
        description: "Spécialisée en troubles anxieux et dépressifs. Approche intégrative (médicaments + thérapie).",
        verification: true,
        langues: ["Français", "Wolof"]
      },
      {
        id: "102",
        nom: "Dr. Amadou Sow",
        specialite: "Psychologue",
        adresse: "Dakar, Sénégal",
        telephone: "(221) 78 456 78 90",
        email: "amadou.sow@psy.sn",
        description: "Psychologue spécialisé en thérapie cognitivo-comportementale pour adultes.",
        verification: true,
        langues: ["Français", "Wolof"]
      },
      {
        id: "103",
        nom: "Dr. Khadija Diallo",
        specialite: "Psychiatre",
        adresse: "Cabinet Fann Hock, Dakar",
        telephone: "+221 77 123 45 67",
        email: "k.diallo.psy@email.sn",
        description: "Spécialisée dans les troubles neurodéveloppementaux (TDAH, autisme) chez les enfants et les adultes.",
        verification: true,
        langues: ["Français", "Wolof", "Pulaar"]
      },
      {
        id: "104",
        nom: "M. Seydou Cissé",
        specialite: "Psychologue clinicien",
        adresse: "Centre de santé mentale de Grand Yoff, Dakar",
        telephone: "+221 78 987 65 43",
        email: "s.cisse.psy@email.sn",
        description: "Approche humaniste et thérapies cognitivo-comportementales (TCC) pour troubles anxieux.",
        verification: true,
        langues: ["Français", "Sérère"]
      },
      {
        id: "105",
        nom: "Pr. Fatou Ndiaye",
        specialite: "Psychiatre spécialisée en TDAH",
        adresse: "Clinique des Almadies, Dakar",
        telephone: "+221 33 889 01 23",
        email: "f.ndiaye.tdah@clinique.sn",
        description: "Expertise en diagnostic et traitement du TDAH chez les enfants et adolescents.",
        verification: true,
        langues: ["Français", "Wolof"]
      },
      {
        id: "106",
        nom: "Dr. Moussa Traoré",
        specialite: "Psychologue pour adultes",
        adresse: "Centre Médico-Psychologique, Thiès",
        telephone: "+221 77 555 66 77",
        email: "m.traore.adultes@psy.sn",
        description: "Thérapie pour troubles dépressifs et anxieux chez les adultes.",
        verification: true,
        langues: ["Français", "Bambara"]
      }
    ];
    console.log('Using hardcoded data for debugging');
    setProfessionnels(hardcodedData);
    setFilteredProfessionnels(hardcodedData);
    setLoading(false);
    setError('');
    
    // Comment out fetch for now
    /*
    const fetchProfessionnels = async () => {
      try {
        const response = await fetch('/api/professionnels');
        if (!response.ok) throw new Error('Failed to fetch professionals');
        const data = await response.json();
        console.log('Fetched data:', data);
        setProfessionnels(data);
        setFilteredProfessionnels(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchProfessionnels();
    */
  }, []);

  useEffect(() => {
    let filtered = professionnels;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.specialite.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(p => {
        const descLower = p.description.toLowerCase();
        const specLower = p.specialite.toLowerCase();
        if (selectedFilter === 'adulte') {
          return descLower.includes('adulte') || specLower.includes('adulte');
        } else if (selectedFilter === 'tdah') {
          return descLower.includes('tdah') || descLower.includes('neurodéveloppemental') || specLower.includes('tdah');
        }
        return true;
      });
    }

    setFilteredProfessionnels(filtered);
  }, [searchTerm, selectedFilter, professionnels]);

  // Extract categories from description (simple keyword-based)
  const getCategories = (description: string) => {
    const lowerDesc = description.toLowerCase();
    const categories = [];
    if (lowerDesc.includes('thérapie') || lowerDesc.includes('tcc')) categories.push('Thérapie');
    if (lowerDesc.includes('consultation') || lowerDesc.includes('séance')) categories.push('Consultations');
    if (lowerDesc.includes('enfant') || lowerDesc.includes('adulte')) categories.push('Séances individuelles');
    if (categories.length === 0) categories.push('Consultations', 'Thérapie');
    return categories.slice(0, 2); // Limit to 2 like image
  };

  if (loading) {
  return (
    <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center">Loading professionals...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      {/* Header */}
      <header>
           <Header /> 
          </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-12 text-green-800">Liste des psychologues et psychiatres</h1>

        {/* Search */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Rechercher spécialiste"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-8">
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Filtre par:</span>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="ml-2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="all">Tous</option>
              <option value="adulte">Adulte</option>
              <option value="tdah">TDAH</option>
            </select>
          </label>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredProfessionnels.map((pro) => {
            const categories = getCategories(pro.description);
            return (
              <div key={pro.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                {/* Photo */}
                <div className="relative h-48 bg-gradient-to-r from-green-50 to-green-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=200&q=80`}
                    alt={pro.nom}
                    className="w-40 h-32 rounded-lg object-cover shadow-md"
                  />
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between">
                    <h2 className="text-2xl font-bold text-green-800 flex-1">{pro.nom}</h2>
                    {pro.verification && <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm ml-2">Vérifié</span>}
                  </div>
                  <p className="text-gray-700"><strong>Spécialité:</strong> {pro.specialite}</p>
                  <p className="text-gray-700"><strong>Adresse:</strong> {pro.adresse}</p>
                  <p className="text-gray-700"><strong>Téléphone mobile:</strong> <a href={`tel:${pro.telephone}`} className="text-green-600 hover:underline">{pro.telephone}</a></p>
                  <p className="text-gray-700"><strong>Adresse email:</strong> <a href={`mailto:${pro.email}`} className="text-green-600 hover:underline">{pro.email}</a></p>
                  <p className="text-gray-600 italic">{pro.description}</p>
                  {pro.langues.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium text-gray-600">Langues:</span>
                      {pro.langues.map((lang, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">{lang}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {categories.map((cat, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{cat}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProfessionnels.length === 0 && (
          <p className="text-center text-gray-500 mt-12 text-lg">Aucun professionnel trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default ProfessionalsList;
