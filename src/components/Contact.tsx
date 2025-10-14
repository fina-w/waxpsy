import { useState } from 'react';
import { FaPhone, FaEnvelope, FaPaperPlane, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Footer from './footer';
import { Header } from './Header';

// Définition du schéma de validation avec Zod
const contactFormSchema = z.object({
  name: z.string()
    .min(2, { message: 'Le nom doit contenir au moins 2 caractères' })
    .max(50, { message: 'Le nom ne doit pas dépasser 50 caractères' }),
  email: z.string()
    .email({ message: 'Veuillez entrer une adresse email valide' }),
  subject: z.string()
    .min(5, { message: 'Le sujet doit contenir au moins 5 caractères' })
    .max(100, { message: 'Le sujet ne doit pas dépasser 100 caractères' }),
  message: z.string()
    .min(10, { message: 'Le message doit contenir au moins 10 caractères' })
    .max(1000, { message: 'Le message ne doit pas dépasser 1000 caractères' })
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting } 
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);
  
  // Liens des réseaux sociaux
  const socialLinks = {
    facebook: 'https://www.facebook.com/waxpsy',
    instagram: 'https://www.instagram.com/waxpsy',
    twitter: 'https://twitter.com/waxpsy',
    linkedin: 'https://www.linkedin.com/company/waxpsy'
  };

  const onSubmit = async () => {
    try {
      // Simulation d'envoi de formulaire
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus({
        success: true,
        message: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
      });
      
      // Réinitialisation du formulaire
      reset();
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.';
      setSubmitStatus({
        success: false,
        message: errorMessage
      });
    } finally {
      // Effacer le message après 5 secondes
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-white via-white to-blue-50">

      {/* En-tête avec image de fond */}
      <div className="relative h-100 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("public/contact_us.jpg")',
            backgroundBlendMode: 'lighten',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-blue-800 opacity-80"></div>
          <Header />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Contactez-nous</h1>
          <p className="text-xl text-white max-w-2xl">
            Nous sommes là pour répondre à vos questions et vous accompagner dans votre parcours de bien-être mental.
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-serif font-semibold text-green-800 mb-6">Envoyez-nous un message</h2>
            
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Votre nom *
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full px-4 py-2 border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                    placeholder="Votre nom complet"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Votre email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-2 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                    placeholder="votre@email.com"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Sujet *
                </label>
                <input
                  id="subject"
                  type="text"
                  className={`w-full px-4 py-2 border ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                  placeholder="Objet de votre message"
                  {...register('subject')}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Votre message *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={`w-full px-4 py-2 border ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                  placeholder="Décrivez-nous votre demande..."
                  {...register('message')}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#015635] text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-white" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
          
          {/* Informations de contact */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-serif font-semibold text-green-800 mb-6">Nos coordonnées</h2>
              
              <div className="space-y-6">
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full text-blue-600">
                    <FaPhone className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Téléphone</h3>
                    <p className="mt-1 text-gray-600">
                      +33 1 23 45 67 89<br />
                      Lundi - Vendredi, 9h - 18h
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full text-purple-600">
                    <FaEnvelope className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">
                      waxpsy@sn.com<br />
                      Réponse sous 24-48h
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4 ">Suivez-nous</h3>
                <div className="flex space-x-4  items-center justify-center">
                  <a 
                    href={socialLinks.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition"
                    aria-label="Facebook de WaxPsy"
                  >
                    <FaFacebook className="h-6 w-6" />
                  </a>
                  <a 
                    href={socialLinks.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-pink-600 transition"
                    aria-label="Instagram de WaxPsy"
                  >
                    <FaInstagram className="h-6 w-6" />
                  </a>
                  <a 
                    href={socialLinks.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition"
                    aria-label="Twitter de WaxPsy"
                  >
                    <FaTwitter className="h-6 w-6" />
                  </a>
                  <a 
                    href={socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-700 transition"
                    aria-label="LinkedIn de WaxPsy"
                  >
                    <FaLinkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-red-600 rounded-xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-serif font-semibold mb-4">Besoin d'aide immédiate ?</h2>
              <p className="mb-6">
                Si vous ou un proche avez besoin d'une aide urgente, contactez immédiatement les services d'urgence ou un professionnel de santé.
              </p>
              <div className="space-y-3">
                <a href="tel:15" className="flex items-center text-lg font-medium hover:underline">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  SAMU : 15
                </a>
                <a href="tel:3114" className="flex items-center text-lg font-medium hover:underline">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  Urgences psychiatriques : 31 14
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
