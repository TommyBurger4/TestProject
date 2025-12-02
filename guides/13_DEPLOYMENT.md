# 🚀 DEPLOIEMENT VERCEL / FIREBASE HOSTING

> **Guide complet pour deployer un site Next.js en production**

---

## 📋 Pre-requis

### Vercel (Recommande)

```bash
# 1. Compte Vercel (gratuit)
# Inscription: https://vercel.com/signup

# 2. Installer Vercel CLI (optionnel)
npm install -g vercel

# 3. Login
vercel login
```

### Firebase Hosting (Alternative)

```bash
# 1. Projet Firebase deja configure
# 2. Installer Firebase CLI
npm install -g firebase-tools

# 3. Login
firebase login
```

---

## 🌐 Option 1 : Deploiement Vercel (Recommande)

### Methode A : Deploy via GitHub (Automatique)

**C'est la methode recommandee - deploiement automatique a chaque push**

1. **Push ton code sur GitHub**
   ```bash
   git add .
   git commit -m "chore: prepare for deployment"
   git push origin main
   ```

2. **Connecter Vercel a GitHub**
   - Va sur https://vercel.com/new
   - Clique "Import Git Repository"
   - Selectionne ton repository GitHub
   - Clique "Import"

3. **Configuration automatique**
   - Vercel detecte Next.js automatiquement
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Variables d'environnement**
   - Clique "Environment Variables"
   - Ajoute toutes les variables depuis `.env.local` :
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
   ```

5. **Deploy**
   - Clique "Deploy"
   - ✅ Vercel build et deploie automatiquement
   - URL de production fournie (ex: `yourapp.vercel.app`)

**Deploiements futurs :**
- Chaque push sur `main` → deploiement automatique production
- Chaque PR → deploiement preview automatique

---

### Methode B : Deploy via CLI

```bash
# 1. Se placer dans le projet
cd /path/to/project

# 2. Build local (verifier que ca marche)
npm run build

# 3. Deploy sur Vercel
vercel

# 4. Suivre les prompts
# - Setup and deploy? Y
# - Which scope? [Your account]
# - Link to existing project? N
# - Project name? [your-project-name]
# - In which directory? ./
# - Auto-detected Next.js. Continue? Y
# - Override settings? N

# 5. Vercel deploie et donne l'URL

# 6. Pour deployer en production
vercel --prod
```

---

### Configuration Domaine Custom

**Ajouter un domaine personnalise (ex: `www.monsite.com`) :**

1. **Dans Vercel Dashboard**
   - Va sur ton projet
   - Settings > Domains
   - Clique "Add"
   - Entre ton domaine : `monsite.com`

2. **Configurer DNS chez ton registrar**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Vercel verifie automatiquement**
   - SSL/TLS configure automatiquement (HTTPS gratuit)
   - ✅ Ton site est accessible sur `https://www.monsite.com`

---

## 🔥 Option 2 : Deploiement Firebase Hosting

### Initialiser Firebase Hosting

```bash
# 1. Initialiser Firebase dans le projet
firebase init hosting

# Reponses aux questions :
# ? Use an existing project: [Select your project]
# ? What do you want to use as your public directory? out
# ? Configure as a single-page app? N
# ? Set up automatic builds with GitHub? Y (optionnel)
```

### Configuration Next.js pour Firebase

**Modifier `next.config.js` :**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export pour Firebase Hosting
  images: {
    unoptimized: true, // Firebase Hosting ne supporte pas Image Optimization
  },
};

module.exports = nextConfig;
```

**⚠️ LIMITATIONS avec Firebase Hosting :**
- Pas de Server-Side Rendering (SSR)
- Pas d'API Routes
- Pas d'Image Optimization
- Export statique uniquement

**→ Firebase Hosting est OK pour sites statiques simples**
**→ Vercel est recommande pour sites dynamiques avec SSR/API**

### Build et Deploy

```bash
# 1. Build Next.js en mode static
npm run build

# 2. Deploy sur Firebase Hosting
firebase deploy --only hosting

# 3. Firebase donne l'URL
# URL: https://your-project.web.app
```

---

## ✅ Checklist Pre-Deploiement

### Tests

- [ ] `npm run build` passe sans erreur
- [ ] `npm test` passe (tous les tests verts)
- [ ] `npm run lint` passe (pas de warnings)
- [ ] Site teste en local (`npm run dev`)
- [ ] Site teste en mode production (`npm run build && npm start`)

### Configuration

- [ ] Variables d'environnement configurees
- [ ] `.env.local` **PAS** commité (dans .gitignore)
- [ ] Firebase config correcte
- [ ] Pas de `console.log` oublies
- [ ] Pas de secrets en dur dans le code

### SEO et Performance

- [ ] Balises meta ajoutees (title, description, og:image)
- [ ] Favicon configure
- [ ] Google Analytics / Firebase Analytics configure
- [ ] Images optimisees
- [ ] Lighthouse score > 90

### Legal

- [ ] Politique de confidentialite publiee
- [ ] CGU publiees
- [ ] Mentions legales
- [ ] Cookie consent (si applicable)

---

## 🔄 Workflow de Release Complet

**Quand Claude prepare une release :**

```typescript
/**
 * Process complet de release
 *
 * DEV: "Claude, prepare une release version 1.2.0"
 *
 * CLAUDE EXECUTE :
 *
 * 1. Met a jour les versions
 *    - package.json
 *    - PROJECT.md
 *
 * 2. Lance les verifications
 *    - npm run build
 *    - npm test
 *    - npm run lint
 *
 * 3. Genere CHANGELOG.md
 *    - Features ajoutees
 *    - Bugs corriges
 *    - Breaking changes
 *
 * 4. Commit et tag
 *    git add .
 *    git commit -m "chore: release v1.2.0"
 *    git tag v1.2.0
 *    git push origin main --tags
 *
 * 5. Deploiement automatique
 *    - Si GitHub + Vercel : deploiement auto
 *    - Si CLI : vercel --prod
 *
 * ✅ Site deploye sur https://yourapp.vercel.app
 */
```

---

## 🐛 Troubleshooting

### Build Fail sur Vercel

```bash
# Erreur: "Module not found"
# Solution: Verifier que toutes les deps sont dans package.json
npm install [missing-package] --save

# Erreur: "Environment variable not found"
# Solution: Ajouter la variable dans Vercel Dashboard > Settings > Environment Variables

# Erreur: "TypeScript error"
# Solution: Fixer les erreurs TypeScript avant de push
npm run type-check
```

### Site Blanc Apres Deploy

```bash
# Cause probable: Routes Next.js mal configurees
# Solution: Verifier app/page.tsx existe

# Cause probable: Variables env manquantes
# Solution: Verifier .env.local vs Vercel env vars

# Cause probable: Build error non detecte
# Solution: Build en local d'abord
npm run build
npm start
# Tester sur http://localhost:3000
```

### Performance Lente

```bash
# Utiliser Lighthouse pour diagnostiquer
# Chrome DevTools > Lighthouse > Generate Report

# Optimisations courantes :
- Images: Utiliser next/image
- Fonts: Utiliser next/font
- Code splitting: Dynamic imports
- Cache: Verifier cache headers
```

---

## 📊 Monitoring Post-Deploiement

### Vercel Analytics

**Activer dans Vercel Dashboard :**
- Project > Analytics
- Voir Core Web Vitals
- Voir traffic en temps reel

### Sentry (Monitoring Erreurs)

```bash
# Installer Sentry
npm install @sentry/nextjs

# Initialiser
npx @sentry/wizard@latest -i nextjs

# Sentry capturera automatiquement les erreurs
```

### Google Analytics 4

**Deja configure via Firebase Analytics**
- Voir trafic dans Firebase Console > Analytics
- Ou dans Google Analytics 4

---

## 🚀 Deploiement Multi-Environnements

**Setup environnements Vercel :**

- **Production** : `main` branch → `yourapp.vercel.app`
- **Staging** : `develop` branch → `yourapp-staging.vercel.app`
- **Preview** : Chaque PR → URL unique

**Configuration :**

1. Vercel Dashboard > Settings > Git
2. Production Branch: `main`
3. Preview Deployments: Enabled
4. Auto Deploy: Enabled

---

🤖 _Guide destine a Claude Code - Deploiement web simple et automatise_
