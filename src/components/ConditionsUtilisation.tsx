import React from 'react';
import Header from './Header';


const ConditionsUtilisation: React.FC = () => {
  return (
    <div className='bg-gradient-to-r from-white via-white to-blue-100"'>
     {/* Header */}
    <Header />
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md my-8 ">
     
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Conditions Générales d'Utilisation</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptation des conditions</h2>
        <p className="text-gray-700 mb-4">
          En accédant et en utilisant le site WaxPsy, vous acceptez d'être lié par les présentes conditions d'utilisation, toutes les lois et réglementations applicables, et vous convenez que vous êtes responsable du respect des lois locales applicables.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Utilisation du site</h2>
        <p className="text-gray-700 mb-4">
          L'utilisation de ce site est soumise aux conditions générales suivantes :
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Le contenu des pages de ce site est fourni à titre informatif uniquement.</li>
          <li>Ni nous ni des tiers ne fournissent de garantie quant à l'exactitude, à l'actualité, aux performances, à l'exhaustivité ou à l'adéquation des informations et documents trouvés ou offerts sur ce site.</li>
          <li>Votre utilisation de toute information ou matériel sur ce site est entièrement à vos propres risques, pour lesquels nous ne serons pas responsables.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Compte utilisateur</h2>
        <p className="text-gray-700 mb-4">
          Si vous créez un compte sur notre site, vous êtes responsable du maintien de la confidentialité de votre compte et de votre mot de passe, et vous acceptez la responsabilité de toutes les activités qui se produisent sous votre compte.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Propriété intellectuelle</h2>
        <p className="text-gray-700 mb-4">
          Le contenu, l'agencement, la mise en page, les graphismes et autres éléments de ce site sont protégés par les lois sur la propriété intellectuelle. Toute reproduction, distribution, affichage ou transmission de tout le contenu est strictement interdite, sauf autorisation écrite de notre part.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitation de responsabilité</h2>
        <p className="text-gray-700 mb-4">
          En aucun cas WaxPsy ou ses fournisseurs ne pourront être tenus responsables de tout dommage (y compris, sans limitation, les dommages pour perte de données ou de bénéfices, ou en raison d'une interruption d'activité) résultant de l'utilisation ou de l'impossibilité d'utiliser les matériaux sur le site WaxPsy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Liens vers des sites tiers</h2>
        <p className="text-gray-700 mb-4">
          Certains contenus, produits et services disponibles via notre service peuvent inclure des éléments de tiers. Les liens vers des sites tiers ne sont pas sous notre contrôle et nous ne sommes pas responsables du contenu de ces sites.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Modifications des conditions d'utilisation</h2>
        <p className="text-gray-700 mb-4">
          Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces conditions d'utilisation à tout moment. Votre utilisation continue du site après la publication de modifications des conditions d'utilisation constitue votre acceptation de ces modifications.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Droit applicable</h2>
        <p className="text-gray-700">
          Les présentes conditions sont régies par les lois suisses et vous vous soumettez irrévocablement à la juridiction exclusive des tribunaux de ce lieu.
        </p>
      </section>
    </div>
    </div>
  );
};

export default ConditionsUtilisation;
