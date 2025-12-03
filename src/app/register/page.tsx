'use client';

/**
 * Page d'inscription - Espace Club
 *
 * Permet aux clubs de creer un compte pour gerer leur fiche
 * - Inscription Email/Password (role='club' automatique)
 * - Inscription Google
 * - Inscription Apple
 * - Validation formulaire
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Input, Card } from '@/components/ui';
import { isValidEmail, validatePassword, passwordsMatch } from '@/services/auth/authService';

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginGoogle, loginApple, error, clearError } = useAuth();

  const [clubName, setClubName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  // Inscription Email/Password
  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    // Validation
    if (!clubName || !email || !password || !confirmPassword) {
      setLocalError('Veuillez remplir tous les champs');
      return;
    }

    if (!isValidEmail(email)) {
      setLocalError('Adresse email invalide');
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setLocalError(passwordValidation.error || 'Mot de passe invalide');
      return;
    }

    if (!passwordsMatch(password, confirmPassword)) {
      setLocalError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);

    // Inscription avec role='club' automatique
    const result = await register(email, password, clubName, 'club');

    if (result.success) {
      // Redirection vers dashboard
      router.push('/dashboard');
    } else {
      setLocalError(result.error || 'Erreur lors de l\'inscription');
    }

    setLoading(false);
  };

  // Inscription Google
  const handleGoogleRegister = async () => {
    setLocalError('');
    clearError();
    setLoading(true);

    const result = await loginGoogle('club');

    if (result.success) {
      router.push('/dashboard');
    } else {
      setLocalError(result.error || 'Erreur d\'inscription Google');
    }

    setLoading(false);
  };

  // Inscription Apple
  const handleAppleRegister = async () => {
    setLocalError('');
    clearError();
    setLoading(true);

    const result = await loginApple('club');

    if (result.success) {
      router.push('/dashboard');
    } else {
      setLocalError(result.error || 'Erreur d\'inscription Apple');
    }

    setLoading(false);
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md min-w-[400px]">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl">🏃‍♂️</span>
            <h1 className="text-2xl font-bold text-gray-900 whitespace-nowrap">ClubSportFrance</h1>
          </Link>
          <h2 className="text-xl font-semibold text-gray-900 mt-4 whitespace-nowrap">Inscrire mon club</h2>
          <p className="text-gray-600 mt-2 whitespace-normal">Creez un compte pour gerer votre club</p>
        </div>

        <Card>
          {/* Erreur */}
          {displayError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 whitespace-normal">{displayError}</p>
            </div>
          )}

          {/* Formulaire inscription */}
          <form onSubmit={handleEmailRegister} className="space-y-4">
            <Input
              type="text"
              label="Nom du club"
              placeholder="Ex: FC Paris, Tennis Club Lyon..."
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              required
              fullWidth
              autoComplete="organization"
              helperText="Ce nom sera affiche sur votre fiche club"
            />

            <Input
              type="email"
              label="Email"
              placeholder="contact@monclub.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              autoComplete="email"
            />

            <Input
              type="password"
              label="Mot de passe"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              autoComplete="new-password"
              helperText="Minimum 6 caracteres"
            />

            <Input
              type="password"
              label="Confirmer le mot de passe"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              autoComplete="new-password"
            />

            <Button type="submit" fullWidth loading={loading}>
              Creer mon compte club
            </Button>
          </form>

          {/* Separateur */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">ou</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Inscription sociale */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={handleGoogleRegister}
              disabled={loading}
            >
              <span className="flex items-center justify-center gap-2">
                <span>🔷</span>
                Continuer avec Google
              </span>
            </Button>

            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={handleAppleRegister}
              disabled={loading}
            >
              <span className="flex items-center justify-center gap-2">
                <span>🍎</span>
                Continuer avec Apple
              </span>
            </Button>
          </div>

          {/* Lien connexion */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 whitespace-normal">
              Vous avez deja un compte ?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline whitespace-nowrap">
                Se connecter
              </Link>
            </p>
          </div>
        </Card>

        {/* Lien retour */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Retour a la carte
          </Link>
        </div>
      </div>
    </div>
  );
}
