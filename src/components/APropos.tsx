import React from 'react';
import { Link } from 'react-router-dom';

const APropos: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="/black-logo.png" alt="WaxPsy Logo" className="h-12" />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-green-700 hover:text-green-900 transition-colors">Accueil</Link>
            <Link to="/troubles" className="text-green-700 hover:text-green-900 transition-colors">Troubles</Link>
            <Link to="/articles" className="text-green-700 hover:text-green-900 transition-colors">Articles</Link>
            <Link to="/temoignages" className="text-green-700 hover:text-green-900 transition-colors">Témoignages</Link>
            <Link to="/glossaire" className="text-green-700 hover:text-green-900 transition-colors">Glossaire</Link>
            <Link to="/apropos" className="font-semibold text-green-800 border-b-2 border-green-700">À propos</Link>
            <Link to="/contact" className="text-green-700 hover:text-green-900 transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">À propos de WaxPsy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre plateforme de référence pour une meilleure compréhension et prise en charge de la santé mentale au Sénégal
          </p>
        </div>
      </section>

      {/* Notre Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center
           gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Notre mission"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Chez WaxPsy, nous croyons que la santé mentale est un droit fondamental. Notre mission est de briser les tabous entourant les troubles mentaux au Sénégal en fournissant des informations fiables, accessibles et adaptées à notre contexte culturel.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Nous nous engageons à créer une communauté bienveillante où chacun peut trouver du soutien, des ressources et des professionnels qualifiés pour l'accompagner dans son parcours de bien-être mental.
              </p>
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <p className="text-green-800 italic">
                  "La santé mentale n'est pas une destination, mais un processus. C'est la façon dont vous conduisez, pas la destination."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Confiance</h3>
              <p className="text-gray-600">Nous fournissons des informations vérifiées par des professionnels de santé mentale pour vous accompagner en toute confiance.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Communauté</h3>
              <p className="text-gray-600">Nous construisons une communauté solidaire où chacun peut partager son expérience et trouver du soutien.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Innovation</h3>
              <p className="text-gray-600">Nous utilisons la technologie pour rendre l'information et les soins de santé mentale plus accessibles à tous.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Une équipe passionnée et engagée pour votre bien-être mental</p>
            <div className="w-20 h-1 bg-green-600 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Aïssatou Diop",
                role: "Psychiatre",
                bio: "Spécialiste des troubles de l'humeur avec plus de 15 ans d'expérience.",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              },
              {
                name: "Mouhamed Ndiaye",
                role: "Psychologue clinicien",
                bio: "Expert en thérapies cognitives et comportementales (TCC).",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              },
              {
                name: "Aminata Sow",
                role: "Conseillère en santé mentale",
                bio: "Spécialiste du soutien aux personnes en détresse psychologique.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Rejoignez notre communauté</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Inscrivez-vous dès maintenant pour accéder à toutes nos ressources et faire partie d'une communauté bienveillante.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/inscription" 
              className="bg-white text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors"
            >
              S'inscrire
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src="/white-logo.png" alt="WaxPsy Logo" className="h-12 mb-4" />
              <p className="text-gray-400">Votre plateforme de référence pour une meilleure compréhension et prise en charge de la santé mentale au Sénégal.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link></li>
                <li><Link to="/troubles" className="text-gray-400 hover:text-white transition-colors">Troubles</Link></li>
                <li><Link to="/articles" className="text-gray-400 hover:text-white transition-colors">Articles</Link></li>
                <li><Link to="/temoignages" className="text-gray-400 hover:text-white transition-colors">Témoignages</Link></li>
                <li><Link to="/glossaire" className="text-gray-400 hover:text-white transition-colors">Glossaire</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Ressources</h3>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/professionals" className="text-gray-400 hover:text-white transition-colors">Trouver un professionnel</Link></li>
                <li><Link to="/urgences" className="text-gray-400 hover:text-white transition-colors">Urgences</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Dakar, Sénégal
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@waxpsy.sn
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +221 33 123 45 67
                </li>
              </ul>
              <div className="flex space-x-4 mt-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a 
                    key={social} 
                    href={`https://${social}.com/waxpsy`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} WaxPsy. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default APropos;
