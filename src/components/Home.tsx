import React from "react";

const Home: React.FC = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* --- HEADER --- */}
      <header className="bg-green-900 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">WaxPsy</h1>
        <nav className="space-x-6">
          <a href="#apropos" className="hover:text-green-300">
            À propos
          </a>
          <a href="#temoignages" className="hover:text-green-300">
            Témoignages
          </a>
          <a href="#aide" className="hover:text-green-300">
            Aide
          </a>
        </nav>
      </header>

      {/* --- HERO --- */}
      <section
        className="bg-cover bg-center text-white flex flex-col items-center justify-center h-[80vh]"
        style={{
          backgroundImage: "url('/images/hero.jpg')", // Remplace par ton image
        }}
      >
        <div className="bg-black/60 p-8 rounded-2xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            COMPRENDRE LA SANTÉ MENTALE
          </h2>
          <p className="text-lg mb-6">
            Les émotions, la santé, l’équilibre… Parlons-en 💚
          </p>
          <a
            href="#apropos"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold"
          >
            En savoir plus
          </a>
        </div>
      </section>

      {/* --- À PROPOS --- */}
      <section id="apropos" className="text-center py-16 px-8 bg-white">
        <h3 className="text-3xl font-bold text-green-800 mb-4">
          C’est quoi WaxPsy ?
        </h3>
        <div className="flex flex-col items-center">
          <img
            src="/images/ruban-vert.png"
            alt="Ruban vert"
            className="w-16 mb-4"
          />
          <p className="max-w-3xl mx-auto text-gray-600">
            WaxPsy est une plateforme de sensibilisation à la santé mentale au
            Sénégal. Elle vise à informer, écouter et orienter toute personne
            traversant des difficultés psychologiques.
          </p>
          <a
            href="#decouvrir"
            className="mt-6 inline-block text-green-700 font-semibold underline"
          >
            En savoir davantage
          </a>
        </div>
      </section>

      {/* --- DÉCOUVRIR --- */}
      <section id="decouvrir" className="bg-green-50 py-16 px-8 text-center">
        <h3 className="text-2xl font-semibold text-green-800 mb-6">Découvrez</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { img: "/images/video1.jpg", title: "Témoignage de Awa" },
            { img: "/images/video2.jpg", title: "Entretien avec un psy" },
            { img: "/images/video3.jpg", title: "Conseils bien-être" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-4 w-72 hover:shadow-xl transition"
            >
              <img
                src={item.img}
                alt={item.title}
                className="rounded-md mb-2 w-full"
              />
              <p className="font-semibold text-gray-700">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- COMPRENDRE --- */}
      <section className="bg-green-700 text-white py-16 text-center">
        <h3 className="text-2xl font-semibold mb-4">Pour mieux comprendre</h3>
        <p className="max-w-2xl mx-auto text-green-100">
          Explorez nos ressources éducatives pour reconnaître les signes,
          comprendre les troubles et mieux accompagner vos proches.
        </p>
      </section>

      {/* --- TÉMOIGNAGES --- */}
      <section id="temoignages" className="bg-white py-16 px-8 text-center">
        <h3 className="text-2xl font-semibold text-green-800 mb-6">
          Quelques Témoignages
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              text: "« Grâce à WaxPsy, j’ai compris que demander de l’aide est un signe de force. »",
              author: "Mariama",
            },
            {
              text: "« Les vidéos et articles m’ont beaucoup aidé à parler de mes émotions. »",
              author: "Cheikh",
            },
          ].map((t, index) => (
            <div
              key={index}
              className="bg-green-100 rounded-xl p-6 max-w-sm shadow hover:shadow-lg transition"
            >
              <p>{t.text}</p>
              <span className="block mt-3 font-bold text-green-700">
                — {t.author}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* --- AIDE IMMÉDIATE --- */}
      <section id="aide" className="bg-green-50 py-16 text-center">
        <h3 className="text-2xl font-semibold text-green-800 mb-6">
          Besoin d’aide immédiate ?
        </h3>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          <div className="bg-white shadow p-6 rounded-xl max-w-sm">
            <p>Contactez un professionnel ou un proche de confiance.</p>
          </div>
          <div className="bg-red-600 text-white p-6 rounded-full w-40 h-40 flex items-center justify-center text-2xl font-bold">
            SOS
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-green-900 text-white py-6 text-center">
        <p className="mb-2">&copy; 2025 WaxPsy – Tous droits réservés</p>
        <p className="text-sm text-green-200">
          Sensibiliser, comprendre, accompagner.
        </p>
      </footer>
    </div>
  );
};

export default Home;
