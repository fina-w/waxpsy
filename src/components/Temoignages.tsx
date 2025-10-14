import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';

const Temoignages: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen page-bg">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="p-8">
        <h1 className="text-4xl font-bold text-center mb-8 troubles-title">Les témoignages</h1>
        
        {/* Filters */}
        <div className="flex flex-row items-center justify-between bg-gray-100 rounded-lg px-4 py-3 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded px-3 py-2 bg-white text-sm">
              <option selected>Filtrer par les plus récents</option>
              <option>Tous</option>
            </select>
            <select className="border border-gray-300 rounded px-3 py-2 bg-white text-sm">
              <option selected>Anxiété</option>
              <option>Dépression</option>
              <option>TDAH</option>
              <option>Autisme</option>
            </select>
          </div>
        </div>
        
        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto mb-12">
          {/* Card 1: Binette */}
          <div className="bg-white rounded-xl shadow-lg p-6 relative border border-green-200 z-0">
            <div className="flex items-start gap-4">
              <img src="https://via.placeholder.com/80x80?text=Femme" alt="Binette" className="w-20 h-20 rounded-full object-cover relative z-10 -mt-4 border-4 border-white shadow-md" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold troubles-title">Je m'appelle Binette, 32 ans. Depuis des mois, je traverse une période difficile :</h3>
                <p className="text-gray-700 mt-2">fatigue, insomnie, perte d'envie et tristresse. J'ai compris qu'il s'agissait d'une dépression. Voir plus</p>
                <a href="#" className="text-green-600 hover:underline mt-2 inline-block">Voir plus</a>
              </div>
            </div>
          </div>

          {/* Card 2: Aïcha */}
          <div className="bg-white rounded-xl shadow-lg p-6 relative border border-green-200 z-10">
            <div className="flex items-start gap-4">
              <img src="https://via.placeholder.com/80x80?text=Homme" alt="Aïcha" className="w-20 h-20 rounded-full object-cover relative z-20 -mt-4 border-4 border-white shadow-md" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold troubles-title">Aïcha, 28 ans, souffre d'anxiété. Elle ressent souvent des peurs intenses, de</h3>
                <p className="text-gray-700 mt-2">l'oppression et un cœur qui s'emballe. Longtemps confondue avec du simple stress, son trouble a trop pris place dans sa vie. Grâce à un psychologue, elle a appris à mieux le gérer et encourage les autres à chercher de l'aide. Voir plus</p>
                <a href="#" className="text-green-600 hover:underline mt-2 inline-block">Voir plus</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center bg-green-100 p-8 rounded-xl max-w-2xl mx-auto">
          <p className="text-lg text-green-800 mb-4">Voulez-vous témoigner, cliquer ici</p>
          <button 
            onClick={() => navigate('/share-experience')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Témoigner
          </button>
        </div>
      </main>
    </div>
  );
};

export default Temoignages;
