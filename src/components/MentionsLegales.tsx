import React from "react";
import {
  Scale,
  Shield,
  FileText,
  Lock,
  ArrowUpRight,
  Users,
  Mail,
  Server,
  ShieldCheck,
} from "lucide-react";
import Header from "./Header";

const MentionsLegales: React.FC = () => {
  const developpeurs = [
    {
      nom: "Ndeye Binta BADIANE",
      telephone: "+221 78 016 64 06",
      email: "binetabadiane6@gmail.com",
    },
    {
      nom: "Safiétou DIANGAR",
      telephone: "774833965",
      email: "safietoudiangarecfpt@gmail.com",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
          <Header />
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* En-tête avec dégradé */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-800 p-8 text-white">
          <div className="flex items-center space-x-4">
            <Scale className="h-10 w-10 text-teal-100" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Mentions Légales
              </h1>
              <p className="text-teal-100 mt-2">
                Informations légales et conditions d'utilisation du site
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Section Éditeur */}
          <section className="mb-12 group">
            <div className="flex items-start mb-4">
              <div className="bg-teal-100 p-3 rounded-lg mr-4 group-hover:bg-teal-200 transition-colors">
                <Users className="h-6 w-6 text-teal-700" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  1. Éditeurs du site
                  <ArrowUpRight className="ml-2 h-5 w-5 text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <div className="mt-4 space-y-4 text-gray-700">
                  <p>Le site WaxPsy est un projet développé par :</p>
                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    {developpeurs.map((dev, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                      >
                        <h3 className="font-semibold text-lg text-teal-800">
                          {dev.nom}
                        </h3>
                        <div className="mt-2 space-y-1 text-sm">
                          <p className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-teal-600" />
                            <a
                              href={`mailto:${dev.email}`}
                              className="text-teal-600 hover:underline"
                            >
                              {dev.email}
                            </a>
                          </p>
                          <p className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2 text-teal-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            <a
                              href={`tel:${dev.telephone.replace(/\s+/g, "")}`}
                              className="text-gray-700"
                            >
                              {dev.telephone}
                            </a>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section Hébergement */}
          <section className="mb-12 group">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors">
                <Server className="h-6 w-6 text-blue-700" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  2. Hébergement
                  <ArrowUpRight className="ml-2 h-5 w-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <div className="mt-4 space-y-3 text-gray-700">
                  <p>
                    Actuellement en phase de développement, le site sera
                    prochainement hébergé sur Netlify.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-blue-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h.01a1 1 0 100-2H10V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          Les informations concernant l'hébergeur seront mises à
                          jour dès le déploiement en production.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section Propriété intellectuelle */}
          <section className="mb-12 group">
            <div className="flex items-start mb-4">
              <div className="bg-purple-100 p-3 rounded-lg mr-4 group-hover:bg-purple-200 transition-colors">
                <ShieldCheck className="h-6 w-6 text-purple-700" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  3. Propriété intellectuelle
                  <ArrowUpRight className="ml-2 h-5 w-5 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <div className="mt-4 space-y-4 text-gray-700">
                  <p>© 2025 WaxPsy - Tous droits réservés</p>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-purple-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h.01a1 1 0 100-2H10V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-purple-700">
                          Toute reproduction, distribution, modification ou
                          utilisation du contenu de ce site, en tout ou en
                          partie, sans autorisation écrite préalable est
                          strictement interdite.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Les marques, logos et contenus présents sur ce site sont la
                    propriété de leurs détenteurs respectifs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section Conditions d'utilisation */}
          <section className="mb-12 group">
            <div className="flex items-start mb-4">
              <div className="bg-amber-100 p-3 rounded-lg mr-4 group-hover:bg-amber-200 transition-colors">
                <FileText className="h-6 w-6 text-amber-700" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  4. Conditions d'utilisation
                  <ArrowUpRight className="ml-2 h-5 w-5 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <div className="mt-4 space-y-4 text-gray-700">
                  <p>
                    En utilisant ce site, vous acceptez les conditions
                    d'utilisation suivantes :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Le site est destiné à un usage informatif concernant la
                      santé mentale
                    </li>
                    <li>
                      Les utilisateurs peuvent publier des témoignages et des
                      avis
                    </li>
                    <li>
                      Les contenus inappropriés ou offensants seront supprimés
                    </li>
                    <li>
                      Les données personnelles sont traitées conformément à
                      notre politique de confidentialité
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section Responsabilité */}
          <section className="group">
            <div className="flex items-start">
              <div className="bg-red-100 p-3 rounded-lg mr-4 group-hover:bg-red-200 transition-colors">
                <Shield className="h-6 w-6 text-red-700" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  5. Responsabilité
                  <ArrowUpRight className="ml-2 h-5 w-5 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <div className="mt-4 space-y-4 text-gray-700">
                  <p>
                    Les informations fournies sur ce site sont à titre
                    informatif uniquement et ne constituent pas un avis médical
                    professionnel.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h.01a1 1 0 100-2H10V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          En cas de problème de santé mentale, veuillez
                          consulter un professionnel de santé qualifié.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Dernière mise à jour : Octobre 2025
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-12 group">
            <div>
              <div>
                <div>
                  <div>
                    <p className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-2"></span>
                      <span>[Nom de la société ou de l'association]</span>
                    </p>
                    <p className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-2"></span>
                      <span>
                        [Forme juridique] au capital de [montant du capital]
                      </span>
                    </p>
                    <p className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-2"></span>
                      <span>Siège social : [adresse complète]</span>
                    </p>
                    <p className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-2"></span>
                      <span>Téléphone : [numéro de téléphone]</span>
                    </p>
                    <p className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-2"></span>
                      <span>
                        Email :{" "}
                        <a
                          href="mailto:contact@waxpsy.ch"
                          className="text-teal-600 hover:underline"
                        >
                          contact@waxpsy.ch
                        </a>
                      </span>
                    </p>
                    <p className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-2"></span>
                      <span>
                        Directeur de la publication : [Nom du directeur]
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 group">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors">
                <Shield className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  2. Hébergement
                  <ArrowUpRight className="ml-2 h-5 w-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <div className="mt-4 space-y-3 text-gray-700">
                  <p>Le site est hébergé par :</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="font-medium text-gray-800">
                      [Nom de l'hébergeur]
                    </p>
                    <p className="text-gray-600">[Adresse de l'hébergeur]</p>
                    <p className="text-gray-600">
                      Téléphone : [numéro de téléphone]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 group">
            <div className="flex items-start mb-4">
              <div className="bg-purple-100 p-3 rounded-lg mr-4 group-hover:bg-purple-200 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  3. Propriété intellectuelle
                  <ArrowUpRight className="ml-2 h-5 w-5 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <div className="mt-4 space-y-3 text-gray-700 bg-gray-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <p className="italic text-gray-600">
                    "La propriété intellectuelle est la seule forme de propriété
                    qui ne s'use pas quand on s'en sert."
                    <span className="block text-sm text-gray-500 mt-1">
                      - Auguste Detoeuf
                    </span>
                  </p>
                  <p className="mt-4">
                    L'ensemble des éléments constituant le site WaxPsy (textes,
                    images, vidéos, logos, etc.) est la propriété exclusive de
                    WaxPsy ou de ses partenaires. Toute reproduction,
                    représentation, utilisation ou adaptation, sous quelque
                    forme que ce soit, de tout ou partie des éléments du site
                    sans l'accord préalable et écrit de WaxPsy est strictement
                    interdite et constituerait un acte de contrefaçon sanctionné
                    par les articles L.335-2 et suivants du Code de la propriété
                    intellectuelle.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 group">
            <div className="flex items-start mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg mr-4 group-hover:bg-indigo-200 transition-colors">
                <Lock className="h-6 w-6 text-indigo-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  4. Protection des données personnelles
                  <ArrowUpRight className="ml-2 h-5 w-5 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <div className="mt-4 space-y-4 text-gray-700">
                  <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
                    <p className="font-medium text-indigo-800 mb-2">
                      Vos droits RGPD
                    </p>
                    <p className="text-gray-700">
                      Conformément à la loi "Informatique et Libertés" du 6
                      janvier 1978 modifiée et au Règlement Général sur la
                      Protection des Données (RGPD), vous disposez des droits
                      suivants :
                    </p>
                    <ul className="mt-3 space-y-2">
                      {[
                        "Droit d'accès à vos données personnelles",
                        "Droit de rectification des données inexactes",
                        "Droit à l'effacement de vos données",
                        "Droit à la limitation du traitement",
                        "Droit à la portabilité des données",
                        "Droit d'opposition au traitement",
                      ].map((right, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 mr-2"></span>
                          <span>{right}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded border border-indigo-100">
                      <p className="text-sm text-gray-600">
                        Pour exercer ces droits, veuillez nous contacter à
                        l'adresse :
                        <a
                          href="mailto:contact@waxpsy.ch"
                          className="text-indigo-600 hover:underline font-medium"
                        >
                          contact@waxpsy.ch
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 group">
            <div className="flex items-start mb-4">
              <div className="bg-amber-100 p-3 rounded-lg mr-4 group-hover:bg-amber-200 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  5. Politique relative aux cookies
                  <ArrowUpRight className="ml-2 h-5 w-5 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-400">
                    <p className="text-gray-700">
                      Le site WaxPsy utilise des cookies pour améliorer votre
                      expérience utilisateur. Ces cookies nous aident à :
                    </p>
                    <ul className="mt-3 space-y-2">
                      {[
                        "Mémoriser vos préférences et paramètres",
                        "Analyser le trafic et les performances",
                        "Personnaliser le contenu et les publicités",
                        "Faciliter le partage sur les réseaux sociaux",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 mr-2"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded border border-amber-100">
                      <p className="text-sm text-gray-600">
                        En continuant à naviguer sur notre site, vous acceptez
                        notre utilisation des cookies conformément à notre
                        <a
                          href="/confidentialite"
                          className="text-amber-700 hover:underline font-medium ml-1"
                        >
                          Politique de confidentialité
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Contact
            </h2>
            <p className="text-gray-700">
              Pour toute question concernant les présentes mentions légales,
              vous pouvez nous contacter à l'adresse suivante :
              contact@waxpsy.ch
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
