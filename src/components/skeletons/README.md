# 📚 Guide des Skeletons WaxPsy

Ce dossier contient tous les composants skeleton personnalisés pour chaque type de page du projet WaxPsy.

## 🎯 Mapping Skeleton → Page

### **1. CardSkeletonGrid**
**Utilisé pour :** Pages avec grilles de cartes
- ✅ `Troubles.tsx` - Grille de troubles mentaux
- Structure : Grille 3 colonnes avec image + texte + bouton

### **2. ProfileSkeletonList**
**Utilisé pour :** Listes de profils professionnels
- ✅ `ProfessionalsList.tsx` - Liste des psychologues/psychiatres
- Structure : Liste avec photo ronde + infos + badges

### **3. TemoignageSkeletonGrid**
**Utilisé pour :** Grilles de témoignages
- ✅ `Temoignages.tsx` - Témoignages utilisateurs
- ✅ `Homepage.tsx` - Section témoignages
- Structure : Cards avec avatar + titre + contenu + actions

### **4. ArticleDetailSkeleton**
**Utilisé pour :** Pages de détail avec contenu long
- ✅ `Articles.tsx` - Détail d'un article
- ✅ `Histoire.tsx` - Détail d'une histoire
- Structure : Breadcrumb + titre + image + métadonnées + contenu long + tags

### **5. GlossaireSkeleton**
**Utilisé pour :** Page glossaire
- ✅ `Glossaire.tsx` - Liste de termes avec définitions
- Structure : En-tête + card intro + barre recherche + liste termes

### **6. QuizListSkeleton**
**Utilisé pour :** Liste des quiz disponibles
- ✅ `QuizPage.tsx` - Page d'accueil des quiz
- Structure : Grille de cards quiz avec icône + description + bouton

### **7. QuizQuestionSkeleton**
**Utilisé pour :** Question de quiz en cours
- ✅ `QuizPage.tsx` - Pendant qu'on répond au quiz
- Structure : Barre progression + question + 4 options + bouton

### **8. CalendrierSkeleton**
**Utilisé pour :** Calendrier d'événements
- ✅ `CalendrierEvenements.tsx` - Liste des événements
- Structure : Grille avec images + badges + dates + lieu

### **9. FormSkeleton**
**Utilisé pour :** Formulaires
- ✅ `ShareExperience.tsx` - Formulaire de témoignage
- ✅ Autres formulaires futurs
- Structure : Titre + champs + textarea + bouton submit

---

## 🔧 Comment utiliser un skeleton

### Exemple 1 : Page avec grille de cartes
```tsx
import { CardSkeletonGrid } from './skeletons';

if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
      <Header />
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <CardSkeletonGrid count={6} />
        </div>
      </main>
    </div>
  );
}
```

### Exemple 2 : Page de détail
```tsx
import { ArticleDetailSkeleton } from './skeletons';

if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
      <Header />
      <main className="pt-24 p-8">
        <ArticleDetailSkeleton />
      </main>
    </div>
  );
}
```

---

## 📊 Tableau Récapitulatif

| Skeleton | Pages | Structure | Count param |
|----------|-------|-----------|-------------|
| **CardSkeletonGrid** | Troubles | Grille 3 cols | ✅ Oui (6) |
| **ProfileSkeletonList** | Professionals | Liste verticale | ✅ Oui (4-6) |
| **TemoignageSkeletonGrid** | Temoignages, Homepage | Grille 3 cols | ✅ Oui (3-6) |
| **ArticleDetailSkeleton** | Articles, Histoire | Page complète | ❌ Non |
| **GlossaireSkeleton** | Glossaire | Liste termes | ❌ Non |
| **QuizListSkeleton** | QuizPage (accueil) | Grille 3 cols | ❌ Non |
| **QuizQuestionSkeleton** | QuizPage (question) | Formulaire quiz | ❌ Non |
| **CalendrierSkeleton** | Calendrier | Grille événements | ❌ Non |
| **FormSkeleton** | ShareExperience | Formulaire | ❌ Non |

---

## ✅ Pages Déjà Implémentées

- [x] Troubles.tsx → CardSkeletonGrid
- [x] ProfessionalsList.tsx → ProfileSkeletonList
- [x] Temoignages.tsx → TemoignageSkeletonGrid
- [x] Articles.tsx → ArticleDetailSkeleton
- [x] Histoire.tsx → ArticleDetailSkeleton
- [x] Glossaire.tsx → GlossaireSkeleton
- [x] QuizPage.tsx → QuizListSkeleton
- [x] CalendrierEvenements.tsx → CalendrierSkeleton

## 📝 Pages Sans Skeleton (pas de loading)

- Homepage.tsx (pas de loading state)
- ShareExperience.tsx (formulaire simple, pas de fetch)
- Contact.tsx (formulaire simple)
- APropos.tsx (contenu statique)
- Profil.tsx (géré par auth)
- Admin.tsx (géré par auth)
- MentionsLegales.tsx (contenu statique)
- Confidentialite.tsx (contenu statique)
- ConditionsUtilisation.tsx (contenu statique)
- Urgence-SOS.tsx (contenu statique)

---

## 🎨 Personnalisation

Tous les skeletons utilisent `react-loading-skeleton` avec les couleurs par défaut.
Pour personnaliser globalement, ajouter dans `index.css` :

```css
.react-loading-skeleton {
  --base-color: #e0e0e0;
  --highlight-color: #f5f5f5;
}
```

---

**Créé le :** 19 Octobre 2025  
**Dernière mise à jour :** 19 Octobre 2025
