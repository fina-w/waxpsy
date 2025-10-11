import React from 'react';

const Troubles: React.FC = () => {
  return (
    <div className="min-h-screen troubles-bg">
      {/* Main Content */}
      <main className="p-8">
        <h1 className="text-4xl font-bold text-center mb-8 troubles-title">Troubles et Maladies Mentales</h1>
        
        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1: TDAH */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/300x200?text=TDAH" alt="TDAH" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold troubles-title">TDAH: Qu'est-ce que le TDAH?</h3>
            </div>
          </div>

          {/* Card 2: Autisme */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/300x200?text=Autisme" alt="Autisme" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold troubles-title">Autisme: Qu'est-ce que l'Autisme?</h3>
            </div>
          </div>

          {/* Card 3: Dépression */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/300x200?text=Dépression" alt="Dépression" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold troubles-title">Dépression: Qu'est-ce que la Dépression?</h3>
            </div>
          </div>

          {/* Card 4: Anxiété */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/300x200?text=Anxiété" alt="Anxiété" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold troubles-title">Anxiété: Qu'est-ce que l'Anxiété?</h3>
            </div>
          </div>

          {/* Card 5: Trouble Bipolaire */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/300x200?text=Trouble+Bipolaire" alt="Trouble Bipolaire" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold troubles-title">Trouble Bipolaire: Qu'est-ce que le Trouble Bipolaire?</h3>
            </div>
          </div>

          {/* Card 6: Schizophrénie */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/300x200?text=Schizophrénie" alt="Schizophrénie" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold troubles-title">Schizophrénie: Qu'est-ce que la Schizophrénie?</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Troubles;
