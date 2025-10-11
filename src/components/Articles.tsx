import React from 'react';

const Articles: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const partialText = `Le trouble déficitaire de l'attention avec ou sans hyperactivité (TDAH) est un trouble neurodéveloppemental qui se manifeste par des difficultés d'attention, d'hyperactivité et d'impulsivité. Dans les contextes sénégalais, les symptômes du TDAH sont souvent mal compris et attribués à un manque de discipline ou à des facteurs culturels. Les troubles de l'attention peuvent avoir un impact significatif sur la vie scolaire et professionnelle des enfants et des adultes.`;

  const fullText = `Le trouble déficitaire de l'attention avec ou sans hyperactivité (TDAH) est un trouble neurodéveloppemental qui se manifeste par des difficultés d'attention, d'hyperactivité et d'impulsivité. Dans les contextes sénégalais, les symptômes du TDAH sont souvent mal compris et attribués à un manque de discipline ou à des facteurs culturels. Les troubles de l'attention peuvent avoir un impact significatif sur la vie scolaire et professionnelle des enfants et des adultes.

Les symptômes du TDAH peuvent être gérés avec des traitements appropriés, y compris des médicaments et des thérapies comportementales. Le diagnostic du TDAH nécessite une évaluation complète par un professionnel de la santé mentale. Les familles et les écoles jouent un rôle important dans le soutien des enfants atteints de TDAH. L'éducation sur le TDAH est essentielle pour réduire la stigmatisation et encourager les personnes à chercher de l'aide.

Les troubles de l'attention peuvent être gérés avec des stratégies d'adaptation et un soutien approprié. Le TDAH est un trouble neurodéveloppemental qui affecte la capacité à se concentrer et à contrôler les impulsions. Les symptômes du TDAH peuvent varier en intensité et se manifester différemment chez les enfants et les adultes. Le diagnostic du TDAH nécessite une évaluation complète par un professionnel de la santé mentale. Les familles et les écoles jouent un rôle important dans le soutien des enfants atteints de TDAH. L'éducation sur le TDAH est essentielle pour réduire la stigmatisation et encourager les personnes à chercher de l'aide.

Au Sénégal, l'accès aux services de santé mentale reste limité, mais des initiatives comme WaxPsy visent à sensibiliser et à fournir des ressources. Il est crucial de reconnaître le TDAH comme un trouble médical plutôt qu'un défaut de caractère pour favoriser un meilleur soutien communautaire.`;

  return (
    <div className="min-h-screen page-bg">
      {/* Header */}
      <header className="troubles-header p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <img src="/black-logo.png" alt="WaxPsy Logo" className="h-10 mr-4" />
        </div>
        <nav className="hidden md:flex space-x-4 text-sm">
          <a href="/" className="text-green-700 hover:text-green-900">Accueil</a>
          <a href="/troubles" className="text-green-700 hover:text-green-900">Troubles</a>
          <a href="/articles" className="text-green-700 hover:text-green-900">Articles</a>
          <a href="/temoignages" className="text-green-700 hover:text-green-900">Témoignages</a>
          <a href="/professionals" className="text-green-700 hover:text-green-900">Professionnels</a>
          <a href="/glossaire" className="text-green-700 hover:text-green-900">Glossaire</a>
          <a href="/apropos" className="text-green-700 hover:text-green-900">A propos</a>
          <a href="/contact" className="text-green-700 hover:text-green-900">Contact</a>
          <a href="/profil" className="text-green-700 hover:text-green-900">Profil</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb/Sub-nav */}
          <nav className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
            <span className="font-medium">Lire :</span>
            <a href="/articles" className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">Article</a>
            <a href="/histoire" className="text-gray-500 hover:text-green-700">Histoire</a>
          </nav>

          {/* Article Title */}
          <h1 className="text-3xl font-bold mb-6 troubles-title text-center">TDAH: Quand la tête dans les nuages</h1>

          {/* Article Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              {isExpanded ? fullText : partialText}
            </p>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-green-600 hover:underline font-semibold"
            >
              {isExpanded ? 'Voir moins' : 'Voir plus'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Articles;
