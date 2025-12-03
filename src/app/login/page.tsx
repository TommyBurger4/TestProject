'use client';

/**
 * Page de connexion - Espace Club
 *
 * Permet aux clubs de se connecter pour acceder a leur dashboard
 * - Connexion Email/Password
 * - Connexion Google
 * - Connexion Apple
 * - Lien vers inscription et mot de passe oublie
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Input, Card } from '@/components/ui';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginGoogle, loginApple, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  // Connexion Email/Password
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    // Validation
    if (!email || !password) {
      setLocalError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      // Redirection vers dashboard
      router.push('/dashboard');
    } else {
      setLocalError(result.error || 'Erreur de connexion');
    }

    setLoading(false);
  };

  // Connexion Google
  const handleGoogleLogin = async () => {
    setLocalError('');
    clearError();
    setLoading(true);

    const result = await loginGoogle('club');

    if (result.success) {
      router.push('/dashboard');
    } else {
      setLocalError(result.error || 'Erreur de connexion Google');
    }

    setLoading(false);
  };

  // Connexion Apple
  const handleAppleLogin = async () => {
    setLocalError('');
    clearError();
    setLoading(true);

    const result = await loginApple('club');

    if (result.success) {
      router.push('/dashboard');
    } else {
      setLocalError(result.error || 'Erreur de connexion Apple');
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
          <h2 className="text-xl font-semibold text-gray-900 mt-4 whitespace-nowrap">Espace Club</h2>
          <p className="text-gray-600 mt-2 whitespace-normal">Connectez-vous pour gerer votre club</p>
        </div>

        <Card>
          {/* Erreur */}
          {displayError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 whitespace-normal">{displayError}</p>
            </div>
          )}

          {/* Formulaire Email/Password */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="votre@email.com"
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
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Mot de passe oublie ?
              </Link>
            </div>

            <Button type="submit" fullWidth loading={loading}>
              Se connecter
            </Button>
          </form>

          {/* Separateur */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">ou</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Connexion sociale */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={handleGoogleLogin}
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
              onClick={handleAppleLogin}
              disabled={loading}
            >
              <span className="flex items-center justify-center gap-2">
                <span>🍎</span>
                Continuer avec Apple
              </span>
            </Button>
          </div>

          {/* Lien inscription */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 whitespace-normal">
              Pas encore de compte ?{' '}
              <Link href="/register" className="text-primary font-semibold hover:underline whitespace-nowrap">
                Inscrire mon club
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
