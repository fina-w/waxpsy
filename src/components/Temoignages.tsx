import React from 'react';

const Temoignages: React.FC = () => {
  return (
    <div className="min-h-screen troubles-bg">
      {/* Main Content */}
      <main className="p-8">
        <h1 className="text-4xl font-bold text-center mb-8 troubles-title">Témoignages</h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          <div className="flex items-center">
            <label className="mr-2 text-green-800 font-semibold">Filtrer par :</label>
            <select className="border border-green-300 rounded px-2 py-1">
              <option>Les plus récents</option>
              <option>Tous</option>
            </select>
          </div>
          <select className="border border-green-300 rounded px-2 py-1">
            <option>Anxiété</option>
            <option>Dépression</option>
            <option>TDAH</option>
            <option>Autisme</option>
          </select>
        </div>
        
        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {/* Card 1: Bineta */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-green-200">
            <div className="flex items-start gap-4">
              <img src="https://via.placeholder.com/80x80?text=Bineta" alt="Bineta" className="w-20 h-20 rounded-full object-cover" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold troubles-title">Je m'appelle Bineta, 32 ans.</h3>
                <p className="text-gray-700 mt-2">Depuis des mois, je traverse une période difficile : fatigue, insomnie, perte d'envie et sentiment d'être submergée par une dépression. Voir plus</p>
                <a href="#" className="text-green-600 hover:underline mt-2 inline-block">Voir plus</a>
              </div>
            </div>
          </div>

          {/* Card 2: Aicha */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-green-200">
            <div className="flex items-start gap-4">
              <img src="https://via.placeholder.com/80x80?text=Aicha" alt="Aicha" className="w-20 h-20 rounded-full object-cover" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold troubles-title">Aicha, 28 ans, souffre d'anxiété.</h3>
                <p className="text-gray-700 mt-2">Elle ressent souvent des peurs intenses, de longues périodes de confusion avec des symptômes simples. Le stress son trouble à trop place dans sa vie. Grâce à un psychologue, elle a appris à mieux le gérer et encourage les autres à chercher de l'aide. Voir plus</p>
                <a href="#" className="text-green-600 hover:underline mt-2 inline-block">Voir plus</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center bg-green-100 p-8 rounded-lg max-w-2xl mx-auto">
          <p className="text-lg text-green-800 mb-4">Voulez-vous témoigner ? Cliquez ici</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Témoigner</button>
        </div>
      </main>
    </div>
  );
};

export default Temoignages;
