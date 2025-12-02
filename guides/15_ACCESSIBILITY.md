# ♿ ACCESSIBILITE WCAG 2.1 (WEB)

> **Guide complet d'accessibilite web selon les normes WCAG 2.1**

---

## 🎯 Objectif

Rendre le site web accessible a TOUS les utilisateurs, y compris ceux en situation de handicap (visuel, moteur, auditif, cognitif).

**WCAG 2.1** (Web Content Accessibility Guidelines) niveau AA est le standard international pour l'accessibilite web.

---

## 🌐 Accessibilite Web (Next.js + React)

### Principes Fondamentaux

L'accessibilite web repose sur :
1. **HTML semantique** (utiliser les bonnes balises)
2. **ARIA attributes** (pour enrichir la semantique)
3. **Contrastes conformes** (≥ 4.5:1 pour texte)
4. **Navigation au clavier** (Tab, Enter, Escape, fleches)
5. **Lecteurs d'ecran** (NVDA, JAWS, VoiceOver, TalkBack)

```tsx
// ❌ MAUVAIS - Div non semantique
<div onClick={handleLogin}>
  <span>Se connecter</span>
</div>

// ✅ BON - Button semantique avec aria-label
<button
  type="button"
  aria-label="Connexion a votre compte"
  onClick={handleLogin}
  className="btn-primary"
>
  Se connecter
</button>
```

---

## 🔤 HTML Semantique

### Utiliser les Bonnes Balises

**Toujours preferer HTML semantique aux divs generiques :**

```tsx
// ❌ MAUVAIS
<div className="title">Mon Titre</div>
<div onClick={handleClick}>Cliquer ici</div>
<div className="nav">
  <div className="link">Accueil</div>
</div>

// ✅ BON
<h1>Mon Titre</h1>
<button type="button" onClick={handleClick}>Cliquer ici</button>
<nav>
  <Link href="/">Accueil</Link>
</nav>
```

**Balises semantiques principales :**
- `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`, `<section>`, `<article>`
- `<h1>` a `<h6>` (hierarchie stricte)
- `<button>`, `<a>`, `<input>`, `<label>`, `<form>`
- `<ul>`, `<ol>`, `<li>` pour listes
- `<table>`, `<thead>`, `<tbody>`, `<th>`, `<tr>`, `<td>` pour tableaux

---

## 🎨 ARIA Attributes

### Roles ARIA

```tsx
// Roles landmarks (navigation structure)
<div role="banner">Header</div>         // Equivalent a <header>
<div role="navigation">Menu</div>       // Equivalent a <nav>
<div role="main">Contenu</div>          // Equivalent a <main>
<div role="complementary">Aside</div>   // Equivalent a <aside>
<div role="contentinfo">Footer</div>    // Equivalent a <footer>

// Roles widgets
<div role="button">Cliquer</div>       // Equivalent a <button>
<div role="checkbox">Checkbox</div>    // Equivalent a <input type="checkbox">
<div role="dialog">Modale</div>        // Modale / Dialog
<div role="alert">Alerte</div>         // Message important

// Roles document
<div role="article">Article</div>      // Equivalent a <article>
<div role="list">Liste</div>           // Equivalent a <ul> ou <ol>
<div role="listitem">Item</div>        // Equivalent a <li>
```

**IMPORTANT** : Preferer HTML semantique. ARIA sert uniquement quand HTML ne suffit pas.

---

### aria-label

Texte lu par le lecteur d'ecran (remplace le contenu visuel).

```tsx
// ❌ MAUVAIS - Icone sans label
<button onClick={handleClose}>
  <XIcon />
</button>

// ✅ BON - Icone avec aria-label
<button onClick={handleClose} aria-label="Fermer">
  <XIcon />
</button>

// ✅ ENCORE MIEUX - aria-labelledby pour reutiliser texte existant
<button onClick={handleClose} aria-labelledby="close-text">
  <XIcon />
  <span id="close-text" className="sr-only">Fermer</span>
</button>
```

**Regles** :
- Court et descriptif
- En francais
- Pas de "bouton" dans le label (role le dit deja)
- Eviter si le texte est deja visible

---

### aria-describedby

Information supplementaire sur l'element (equivalent a accessibilityHint).

```tsx
<button
  type="submit"
  aria-label="Envoyer le message"
  aria-describedby="send-hint"
>
  Envoyer
</button>
<span id="send-hint" className="sr-only">
  Votre message sera envoye a tous les participants du groupe
</span>
```

**Quand utiliser** :
- Action non evidente
- Consequence importante
- Instructions complementaires

---

### aria-live (Annonces Dynamiques)

Annoncer les changements dynamiques aux lecteurs d'ecran.

**Roles disponibles** :

```typescript
type AccessibilityRole =
  | 'none'
  | 'button'
  | 'link'
  | 'search'
  | 'image'
  | 'keyboardkey'
  | 'text'
  | 'adjustable'
  | 'imagebutton'
  | 'header'
  | 'summary'
  | 'alert'
  | 'checkbox'
  | 'combobox'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'scrollbar'
  | 'spinbutton'
  | 'switch'
  | 'tab'
  | 'tablist'
  | 'timer'
  | 'toolbar';
```

**Exemples** :

```typescript
// Bouton
<TouchableOpacity accessibilityRole="button">
  <Text>Valider</Text>
</TouchableOpacity>

// Lien
<TouchableOpacity accessibilityRole="link">
  <Text>Voir plus</Text>
</TouchableOpacity>

// Checkbox
<TouchableOpacity accessibilityRole="checkbox" accessibilityState={{ checked: isChecked }}>
  <Text>{isChecked ? '☑' : '☐'} J'accepte les CGU</Text>
</TouchableOpacity>
```

---

### `accessibilityState`

Etat actuel du composant.

```typescript
interface AccessibilityState {
  disabled?: boolean;
  selected?: boolean;
  checked?: boolean | 'mixed';
  busy?: boolean;
  expanded?: boolean;
}
```

**Exemples** :

```typescript
// Bouton desactive
<TouchableOpacity
  disabled={isLoading}
  accessibilityState={{ disabled: isLoading }}
>
  <Text>Soumettre</Text>
</TouchableOpacity>

// Tab selectionnee
<TouchableOpacity
  accessibilityRole="tab"
  accessibilityState={{ selected: activeTab === 'home' }}
>
  <Text>Accueil</Text>
</TouchableOpacity>

// Checkbox tristate
<TouchableOpacity
  accessibilityRole="checkbox"
  accessibilityState={{ checked: selectedAll ? true : selectedSome ? 'mixed' : false }}
>
  <Text>Tout selectionner</Text>
</TouchableOpacity>
```

---

### `accessibilityValue`

Valeur actuelle pour composants ajustables (slider, progressbar).

```typescript
<Slider
  value={volume}
  onValueChange={setVolume}
  accessibilityLabel="Volume"
  accessibilityRole="adjustable"
  accessibilityValue={{
    min: 0,
    max: 100,
    now: volume,
    text: `${volume} pourcent`
  }}
/>
```

---

## 🎨 Contraste des Couleurs

### Ratios Minimum WCAG 2.1 AA

- **Texte normal** : Ratio 4.5:1 minimum
- **Texte large** (18pt+ ou 14pt+ gras) : Ratio 3:1 minimum
- **Composants UI** (boutons, icones) : Ratio 3:1 minimum

### Outils de Verification

```bash
# Contrast Checker en ligne
https://webaim.org/resources/contrastchecker/

# Figma Plugin
Stark - Accessibility Tools
```

### Exemple Theme Accessible

```typescript
// theme/colors.ts

export const colors = {
  // ✅ Contraste 7:1 (AAA)
  primary: '#0066CC',
  onPrimary: '#FFFFFF',

  // ✅ Contraste 4.6:1 (AA)
  secondary: '#6C757D',
  onSecondary: '#FFFFFF',

  // ✅ Contraste 12:1 (AAA)
  textPrimary: '#1A1A1A',
  background: '#FFFFFF',

  // ✅ Contraste 4.5:1 (AA)
  textSecondary: '#666666',

  // ❌ Contraste 2.1:1 (INSUFFISANT)
  // textDisabled: '#CCCCCC', // NE PAS UTILISER

  // ✅ Contraste 4.5:1 (AA)
  textDisabled: '#767676',
};
```

---

## ⌨️ Navigation Clavier et Focus

### Focus Visible

**Regle** : Tout element interactif doit avoir un indicateur de focus visible.

```typescript
import { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ title, onPress }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={[
        styles.button,
        isFocused && styles.buttonFocused  // Bordure visible
      ]}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: '#0066CC',
  },
  buttonFocused: {
    borderWidth: 3,
    borderColor: '#FFD700',  // Bordure jaune visible
  },
});
```

---

### Ordre de Navigation

**Regle** : L'ordre de navigation au clavier doit suivre l'ordre visuel.

```typescript
<View>
  {/* Tab 1 */}
  <TextInput
    placeholder="Email"
    accessibilityLabel="Email"
  />

  {/* Tab 2 */}
  <TextInput
    placeholder="Mot de passe"
    accessibilityLabel="Mot de passe"
    secureTextEntry
  />

  {/* Tab 3 */}
  <TouchableOpacity accessibilityRole="button">
    <Text>Se connecter</Text>
  </TouchableOpacity>
</View>
```

---

## 📏 Taille des Cibles Tactiles

### Regles WCAG 2.1

- **Taille minimum** : 44x44 points (iOS) / 48x48 dp (Android)
- **Espacement minimum** : 8 points entre cibles

### Implementation

```typescript
const styles = StyleSheet.create({
  button: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    // ✅ Respecte taille minimum
  },

  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    // ✅ Icone 24x24 dans zone tactile 44x44
  },
});
```

---

## 🔊 Lecteurs d'Ecran

### VoiceOver (iOS) et TalkBack (Android)

**Test Manuel** :

**iOS** :
- Reglages > Accessibilite > VoiceOver > Activer
- Geste 1 doigt droite : Element suivant
- Geste 1 doigt gauche : Element precedent
- Double-tap : Activer

**Android** :
- Parametres > Accessibilite > TalkBack > Activer
- Swipe droite : Element suivant
- Swipe gauche : Element precedent
- Double-tap : Activer

---

### Annonces Dynamiques

```typescript
import { AccessibilityInfo } from 'react-native';

// Annoncer un message au lecteur d'ecran
const announceMessage = (message: string) => {
  AccessibilityInfo.announceForAccessibility(message);
};

// Exemple : Apres ajout panier
const handleAddToCart = () => {
  addItemToCart(item);
  announceMessage('Article ajoute au panier');
};

// Exemple : Erreur formulaire
const handleSubmit = () => {
  if (errors.length > 0) {
    announceMessage(`${errors.length} erreurs detectees`);
  }
};
```

---

## 🖼️ Images et Icones

### Images Decoratives

```typescript
// Image purement decorative (pas d'info importante)
<Image
  source={decorativePattern}
  accessible={false}  // Ignore par lecteur d'ecran
/>
```

---

### Images Informatives

```typescript
// Image avec information importante
<Image
  source={productImage}
  accessible={true}
  accessibilityLabel="Photo du produit : iPhone 15 Pro noir"
/>
```

---

### Icones

```typescript
// Icone seule (bouton)
<TouchableOpacity
  accessibilityLabel="Rechercher"
  accessibilityRole="button"
>
  <Icon name="search" size={24} />
</TouchableOpacity>

// Icone + texte
<View accessible={true} accessibilityLabel="Profil utilisateur">
  <Icon name="user" size={20} />
  <Text>Profil</Text>
</View>
```

---

## 📝 Formulaires Accessibles

### Labels et Instructions

```typescript
<View>
  {/* Label visible + accessibilityLabel */}
  <Text style={styles.label}>Adresse email</Text>
  <TextInput
    accessibilityLabel="Adresse email"
    accessibilityHint="Saisissez votre email pour recevoir les notifications"
    placeholder="exemple@email.com"
    keyboardType="email-address"
    autoComplete="email"
  />
</View>
```

---

### Gestion des Erreurs

```typescript
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const handleBlur = () => {
  if (!isValidEmail(email)) {
    const errorMsg = 'Email invalide. Veuillez saisir une adresse valide.';
    setError(errorMsg);
    // Annoncer l'erreur au lecteur d'ecran
    AccessibilityInfo.announceForAccessibility(errorMsg);
  }
};

<View>
  <TextInput
    value={email}
    onChangeText={setEmail}
    onBlur={handleBlur}
    accessibilityLabel="Adresse email"
    // Indiquer erreur dans l'etat
    accessibilityState={{ disabled: false }}
    accessibilityInvalid={!!error}
  />

  {error && (
    <Text
      style={styles.error}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      {error}
    </Text>
  )}
</View>
```

---

## ⏱️ Timeouts et Animations

### Timeouts Accessibles

```typescript
// ❌ MAUVAIS : Timeout trop court
const NOTIFICATION_TIMEOUT = 2000; // 2 secondes

// ✅ BON : Timeout suffisant
const NOTIFICATION_TIMEOUT = 10000; // 10 secondes minimum

// ✅ MEILLEUR : Option de pause
const [isPaused, setIsPaused] = useState(false);

<View>
  <Text>Message important</Text>
  <TouchableOpacity
    onPress={() => setIsPaused(!isPaused)}
    accessibilityLabel={isPaused ? 'Reprendre' : 'Mettre en pause'}
  >
    <Text>{isPaused ? '▶' : '⏸'}</Text>
  </TouchableOpacity>
</View>
```

---

### Animations Reduites

```typescript
import { AccessibilityInfo } from 'react-native';

const [reduceMotion, setReduceMotion] = useState(false);

useEffect(() => {
  // Detecter preference "Reduire les animations"
  AccessibilityInfo.isReduceMotionEnabled().then(enabled => {
    setReduceMotion(enabled);
  });
}, []);

<Animated.View
  style={{
    transform: [{
      translateX: reduceMotion
        ? 0  // Pas d'animation
        : animatedValue  // Animation normale
    }]
  }}
>
  <Text>Contenu</Text>
</Animated.View>
```

---

## 🧪 Tests d'Accessibilite

### react-native-accessibility-test

```bash
npm install --save-dev @react-native-community/eslint-plugin-a11y
```

**Configuration ESLint** :

```json
{
  "extends": [
    "plugin:@react-native-community/all"
  ],
  "rules": {
    "@react-native-community/no-inline-styles": "warn"
  }
}
```

---

### Tests Automatises

```typescript
// __tests__/accessibility/Button.a11y.test.tsx
import { render } from '@testing-library/react-native';
import { Button } from '@components/ui/Button';

describe('Button Accessibility', () => {
  it('should have accessible label', () => {
    const { getByLabelText } = render(
      <Button title="Submit" onPress={() => {}} />
    );

    expect(getByLabelText('Submit')).toBeTruthy();
  });

  it('should have button role', () => {
    const { getByRole } = render(
      <Button title="Submit" onPress={() => {}} />
    );

    expect(getByRole('button')).toBeTruthy();
  });

  it('should announce disabled state', () => {
    const { getByRole } = render(
      <Button title="Submit" onPress={() => {}} disabled />
    );

    const button = getByRole('button');
    expect(button.props.accessibilityState.disabled).toBe(true);
  });
});
```

---

## ✅ Checklist Accessibilite

### Avant de Merger

- [ ] Tous les boutons/liens ont `accessibilityLabel`
- [ ] Tous les boutons ont `accessibilityRole="button"`
- [ ] Images informatives ont `accessibilityLabel`
- [ ] Images decoratives ont `accessible={false}`
- [ ] Contraste texte ≥ 4.5:1 (AA)
- [ ] Contraste UI ≥ 3:1 (AA)
- [ ] Tailles tactiles ≥ 44x44 points
- [ ] Focus visible sur elements interactifs
- [ ] Erreurs formulaires annoncees
- [ ] Teste avec VoiceOver (iOS)
- [ ] Teste avec TalkBack (Android)
- [ ] Animations respectent `reduceMotion`
- [ ] Timeouts ≥ 10 secondes ou pausables

---

## 📚 Ressources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Native Accessibility Docs](https://reactnative.dev/docs/accessibility)
- [Apple Human Interface Guidelines - Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [Material Design - Accessibility](https://m3.material.io/foundations/accessible-design)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

🤖 _Guide destine a Claude Code - Accessibilite WCAG 2.1 pour React Native_

**Derniere mise a jour** : 30/10/2025
