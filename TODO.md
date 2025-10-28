# Migration vers API Backend - Suppression de db.json

## Composants à modifier

### ✅ ProfessionalsList.tsx

- [x] Remplacer fetch("/db.json") par API_BASE_URL/professionnels
- [x] Supprimer le fallback db.json
- [x] Ajouter import API_BASE_URL
- [x] Corriger les types TypeScript

### ✅ Login.tsx

- [x] Créer fonction d'authentification dans api.ts
- [x] Remplacer vérification db.json par appel API
- [x] Gérer authentification utilisateurs/administrateurs/professionnels

### 🔄 QuizPage.tsx

- [ ] Remplacer fallback db.json par endpoint /quizzes
- [ ] Supprimer chargement depuis db.json

### 🔄 Histoire.tsx

- [ ] Remplacer fetch("/db.json") par /histoires/:id
- [ ] Gérer erreur si endpoint n'existe pas

### 🔄 Glossaire.tsx

- [ ] Remplacer fetch('db.json') par /glossaire
- [ ] Supprimer chargement local

### 🔄 dashbordprofessionnal.tsx

- [ ] Remplacer chargement db.json par endpoints API existants
- [ ] Utiliser /professionnels/:id et /rendezVous

### 🔄 dahsbordAdmin.tsx

- [ ] Supprimer fallback db.json
- [ ] S'assurer que tous endpoints fonctionnent

### 🔄 Articles.tsx

- [ ] Remplacer fetch("/db.json") par /articles/:id et /troubles
- [ ] Gérer données liées

## Endpoints à créer dans le backend (si nécessaire)

- [ ] POST /auth/login - Authentification
- [ ] GET /quizzes - Liste des quiz
- [ ] GET /histoires/:id - Détail histoire
- [ ] GET /glossaire - Termes du glossaire
- [ ] GET /articles/:id - Détail article
- [ ] GET /troubles - Liste des troubles

## Tests

- [ ] Tester chaque composant après modification
- [ ] Vérifier authentification
- [ ] Vérifier chargement des données
- [ ] Supprimer db.json
