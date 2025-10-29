import {
  PhoneIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  HeartIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import Footer from "./footer";

const UrgenceSOS = () => {
  // Données réelles des urgences au Sénégal
  const ressourcesSOS = {
    numerosUrgence: [
      { nom: "SAMU National", numero: "1515" },
      { nom: "Police Secours", numero: "17" },
      { nom: "Pompiers", numero: "18" },
      { nom: "SOS Médecins", numero: "33 889 15 15" },
      { nom: "Division Santé Mentale", numero: "33 869 42 92" },
    ],
    centresCrise: [
      {
        nom: "Hôpital Psychiatrique de Thiaroye",
        adresse: "Thiaroye, banlieue de Dakar",
        telephone: "33 834 08 81",
        horaires: "Urgences 24h/24, 7j/7",
      },
      {
        nom: "Service Psychiatrie CHNU Fann",
        adresse: "Avenue Cheikh Anta Diop, Fann",
        telephone: "33 869 18 18",
        horaires: "Lundi - Vendredi: 8h - 17h",
      },
      {
        nom: "Centre Dalal Xel Thiès",
        adresse: "Route de Saint-Louis, Km 4, Thiès",
        telephone: "33 951 61 69",
        horaires: "Lundi - Samedi: 8h - 18h",
      },
      {
        nom: "Centre Dalal Xel Fatick",
        adresse: "Route nationale 1, Fatick",
        telephone: "33 949 21 57",
        horaires: "Lundi - Samedi: 8h - 18h",
      },
      {
        nom: "Hôpital Principal de Dakar",
        adresse: "1, Avenue Nelson Mandela, Plateau",
        telephone: "33 839 50 50",
        horaires: "Urgences 24h/24",
      },
    ],
    protocolesCrise: [
      "Assurez la sécurité immédiate de la personne",
      "Restez calme et rassurant",
      "Appelez les services d'urgence",
      "Ne laissez pas la personne seule",
      "Écoutez sans juger",
    ],
    signesCrise: [
      "Pensées suicidaires exprimées",
      "Comportement autodestructeur",
      "Isolement social soudain",
      "Changements d'humeur extrêmes",
      "Consommation excessive de substances",
    ],
  };

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber.replace(/\s+/g, "")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bannière d'urgence épurée */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3">
          <ExclamationTriangleIcon className="h-7 w-7 animate-pulse" />
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            URGENCE - AIDE IMMÉDIATE DISPONIBLE
          </h1>
        </div>
      </div>

      {/* En-tête simplifié */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 border-l-4 border-red-500">
          <div className="flex items-start gap-4">
            <div className="bg-red-50 p-3 rounded-xl">
              <ShieldExclamationIcon className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Vous avez besoin d'aide immédiate ?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Si vous ou un proche êtes en situation de détresse ou de danger
                immédiat, contactez immédiatement les services d'urgence. Vous
                n'êtes pas seul(e), de l'aide est disponible 24h/24.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteneur principal avec espacement amélioré */}
      <div className="container mx-auto px-4 pb-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Numéros d'urgence - Design épuré */}
          <section className="lg:sticky lg:top-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <PhoneIcon className="h-6 w-6 text-red-600" />
                Numéros d'urgence
              </h2>
              <p className="text-gray-500 text-sm">Disponibles 24h/24, 7j/7</p>
            </div>

            <div className="space-y-3">
              {ressourcesSOS.numerosUrgence.map((urgence, index) => (
                <button
                  key={index}
                  onClick={() => handleCall(urgence.numero)}
                  className="w-full group"
                >
                  <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 hover:border-red-200 transition-all duration-200">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="bg-red-50 p-2.5 rounded-lg group-hover:bg-red-100 transition-colors flex-shrink-0">
                          <PhoneIcon className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="text-left min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {urgence.nom}
                          </p>
                          <p className="text-xs text-gray-500">Gratuit</p>
                        </div>
                      </div>
                      <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-base whitespace-nowrap flex-shrink-0">
                        {urgence.numero}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Centres spécialisés - Design moderne */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <UserGroupIcon className="h-6 w-6 text-teal-700" />
                Centres de crise
              </h2>
              <p className="text-gray-500 text-sm">
                Accompagnement professionnel
              </p>
            </div>

            <div className="space-y-4">
              {ressourcesSOS.centresCrise.map((centre, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-teal-200 transition-all duration-200"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-teal-50 p-2 rounded-lg flex-shrink-0">
                        <HeartIcon className="h-5 w-5 text-teal-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm mb-1">
                          {centre.nom}
                        </h3>
                        <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">
                          Santé mentale
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3 text-sm">
                      <div className="flex items-start gap-2 text-gray-600">
                        <svg
                          className="h-4 w-4 text-teal-700 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-xs">{centre.adresse}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <PhoneIcon className="h-4 w-4 text-teal-700 flex-shrink-0" />
                        <span className="text-xs">{centre.telephone}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <svg
                          className="h-4 w-4 text-teal-700 flex-shrink-0"
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
                        <span className="text-xs">{centre.horaires}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCall(centre.telephone)}
                      className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm"
                    >
                      <PhoneIcon className="h-4 w-4" />
                      <span>Appeler</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Protocole et signes - Design épuré */}
      <div className="bg-white border-y border-gray-200 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Signes de crise */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-red-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-red-100 p-2 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-700" />
                </div>
                <h2 className="text-xl font-bold text-red-900">
                  Signes d'une crise
                </h2>
              </div>
              <ul className="space-y-3">
                {ressourcesSOS.signesCrise.map((signe, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-red-200 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                      <ExclamationTriangleIcon className="h-4 w-4 text-red-700" />
                    </div>
                    <span className="text-gray-800 pt-0.5">{signe}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Protocole de crise */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-amber-700" />
                </div>
                <h2 className="text-xl font-bold text-amber-900">
                  Que faire en cas de crise ?
                </h2>
              </div>
              <ul className="space-y-3">
                {ressourcesSOS.protocolesCrise.map((etape, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="bg-amber-200 text-amber-900 font-bold rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm">
                      {i + 1}
                    </span>
                    <span className="text-gray-800 pt-0.5">{etape}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section "Besoin de parler?" - NON MODIFIÉE */}
      <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
        <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold ">
              <ChatBubbleLeftRightIcon className="h-8 w-8 inline-block mr-2" />
              BESOIN DE PARLER ?
            </h2>
            <p className="text-[#015635]">
              Vous n'êtes pas seul(e). Des professionnels sont là pour vous
              écouter.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <PhoneIcon className="h-6 w-6 text-[#015635]" />
              </div>
              <h3 className="font-bold text-[#014129] mb-2">Lignes d'écoute</h3>
              <p className="text-sm text-gray-600">
                Des écoutants formés sont disponibles 24h/24 pour vous écouter.
              </p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserGroupIcon className="h-6 w-6 text-[#015635]" />
              </div>
              <h3 className="font-bold text-[#014129] mb-2">
                Groupes de soutien
              </h3>
              <p className="text-sm text-gray-600">
                Rencontrez d'autres personnes qui vivent des situations
                similaires.
              </p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <HeartIcon className="h-6 w-6 text-[#015635]" />
              </div>
              <h3 className="font-bold text-[#014129] mb-2">Accompagnement</h3>
              <p className="text-sm text-gray-600">
                Un suivi personnalisé pour vous aider à traverser cette épreuve.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              N'hésitez pas à contacter un professionnel de santé si vous avez
              des questions ou des inquiétudes.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-[#015635] hover:bg-[#015635] text-white font-bold py-2 px-6 rounded-full inline-flex items-center transition-colors duration-200"
            >
              <ChevronUpIcon className="h-4 w-4 mr-2" />
              Voir les numéros d'urgence
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default UrgenceSOS;
