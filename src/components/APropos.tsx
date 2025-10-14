import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer';
import Header from './Header';

const APropos: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
      {/* Header */}
          <Header />

      {/* Hero Section */}
      <section className=" py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">À propos de WaxPsy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre plateforme de référence pour une meilleure compréhension et prise en charge de la santé mentale au Sénégal
          </p>
        </div>
      </section>

      {/* Notre Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center
           gap-12">
            <div className="pl-30 md:w-1/2">
              <img 
                src="public/raise_awairness.jpg" 
                alt="Notre mission"
                className="rounded-lg shadow-xl w-120 h-100 "
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
      <section className="py-16">
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
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Une équipe passionnée et engagée pour votre bien-être mental</p>
            <div className="w-20 h-1 bg-green-600 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Safiétou DIANGAR",
                role: "Développeuse Full Stack",
                bio: "Passionnée par la création d'expériences numériques qui améliorent la vie des gens. Spécialisée dans le développement d'applications web réactives et accessibles.",
                image: "public/safietoudiangar.jpg",
                skills: ["React", "Flutter", "Laravel", "UI/UX"]
              },
              {
                name: "Ndeye Binta BADIANE",
                role: "Développeuse Full Stack",
                bio: "Développeuse passionnée par les solutions technologiques innovantes. Expérimentée dans la création d'applications web complètes, du front-end au back-end.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                skills: ["JavaScript", "Python", "Django", "React"]
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-green-300 font-medium">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, i) => (
                      <span key={i} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Notre Approche */}
          <div className="mt-16 bg-green-50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Approche</h2>
              <div className="w-20 h-1 bg-green-600 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Innovation",
                  description: "Nous utilisons les dernières technologies pour créer des solutions innovantes en santé mentale."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: "Communauté",
                  description: "Nous croyons en la force de la communauté pour briser les tabous autour de la santé mentale."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Expertise",
                  description: "Notre équipe combine expertise technique et connaissance approfondie des enjeux de santé mentale."
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#015635]  text-white">
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
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-opacity-10 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default APropos;
