import React from "react";
import { Header } from "./Header";
import { PhoneIcon } from "@heroicons/react/24/solid";
import db from "../../db.json";

const UrgenceSOS: React.FC = () => {
  const { ressourcesSOS } = db;

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white text-gray-800 px-4 md:px-20 py-10">
        {/* En-tête */}
        <header className="text-center mb-10">
          <h1 className="text-red-600 text-3xl font-bold">
            Besoin d'aide urgente ?
          </h1>
          <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
            En cas de détresse intense ou de danger immédiat, demandez de
            l'aide sans attendre. Des services d'urgence et des professionnels
            sont disponibles pour vous accompagner. Cliquez sur le bouton
            ci-dessous pour appeler directement.
          </p>
        </header>

        {/* Numéro d'urgence */}
        <section className="text-center mb-10">
          <h2 className="text-orange-600 text-2xl font-semibold mb-6">
            Numéros d'urgences
          </h2>

          <div className="max-w-xl mx-auto bg-gray-50 border border-gray-300 rounded-lg shadow p-6 text-left">
            <h3 className="font-bold text-lg mb-2 text-red-700">SOS</h3>
            <ul className="space-y-3">
              {ressourcesSOS.numerosUrgence.map((urgence, index) => (
                <li key={index} className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-red-600 mr-2" />
                  <span>
                    {urgence.nom} : <strong>{urgence.numero}</strong>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Centres spécialisés */}
        <section className="text-center mb-10">
          <h2 className="text-orange-600 text-2xl font-semibold mb-6">
            Centres spécialisés en santé mentale :
          </h2>

          <div className="max-w-2xl mx-auto bg-gray-50 border border-gray-300 rounded-lg shadow p-6 text-left">
            {ressourcesSOS.centresCrise.map((centre, index) => (
              <div key={index} className="mb-4">
                <p className="mb-2">
                  <strong>{centre.nom}</strong> : {centre.adresse}
                </p>
                <p className="mb-2">
                  Téléphone : <strong>{centre.telephone}</strong>
                </p>
                <p>
                  Horaires : <strong>{centre.horaires}</strong>
                </p>
                {index < ressourcesSOS.centresCrise.length - 1 && <hr className="my-4" />}
              </div>
            ))}
          </div>
        </section>

        {/* Protocole de crise */}
        <section className="text-center mb-10">
          <h2 className="text-orange-600 text-2xl font-semibold mb-6">
            Protocole en cas de crise :
          </h2>

          <div className="max-w-2xl mx-auto bg-gray-50 border border-gray-300 rounded-lg shadow p-6 text-left">
            <p className="text-gray-700">{ressourcesSOS.protocolesCrise}</p>
          </div>
        </section>

        {/* Signes de crise */}
        <section className="text-center mb-10">
          <h2 className="text-red-700 text-2xl font-bold mb-6">
            Signes qu'une personne est en crise :
          </h2>

          <div className="max-w-2xl mx-auto bg-gray-50 border border-gray-300 rounded-lg shadow p-6 text-left">
            <ul className="space-y-2">
              {ressourcesSOS.signesCrise.map((signe, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>{signe}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Conseils pour les proches */}
        <section className="text-center mt-12">
          <h2 className="text-red-700 text-2xl font-bold">
            Que Faire en cas de crise ?
          </h2>
          <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
            {ressourcesSOS.conseilsProches}
          </p>
        </section>
      </div>
    </div>
  );
};

export default UrgenceSOS;
