'use client';

/**
 * Page de reinitialisation mot de passe
 *
 * Permet d'envoyer un email de reinitialisation de mot de passe
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Input, Card } from '@/components/ui';
import { isValidEmail } from '@/services/auth/authService';

export default function ForgotPasswordPage() {
  const { resetPassword, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    setSuccess(false);
    clearError();

    // Validation
    if (!email) {
      setLocalError('Veuillez entrer votre adresse email');
      return;
    }

    if (!isValidEmail(email)) {
      setLocalError('Adresse email invalide');
      return;
    }

    setLoading(true);

    const result = await resetPassword(email);

    if (result.success) {
      setSuccess(true);
      setEmail('');
    } else {
      setLocalError(result.error || 'Erreur lors de l\'envoi de l\'email');
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
          <h2 className="text-xl font-semibold text-gray-900 mt-4 whitespace-nowrap">Mot de passe oublie</h2>
          <p className="text-gray-600 mt-2 whitespace-normal">
            Entrez votre email pour recevoir un lien de reinitialisation
          </p>
        </div>

        <Card>
          {/* Succes */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600 whitespace-normal">
                ✓ Email envoye ! Verifiez votre boite de reception.
              </p>
            </div>
          )}

          {/* Erreur */}
          {displayError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 whitespace-normal">{displayError}</p>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleResetPassword} className="space-y-4">
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

            <Button type="submit" fullWidth loading={loading}>
              Envoyer le lien de reinitialisation
            </Button>
          </form>

          {/* Lien retour connexion */}
          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-primary hover:underline">
              ← Retour a la connexion
            </Link>
          </div>
        </Card>

        {/* Lien retour carte */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Retour a la carte
          </Link>
        </div>
      </div>
    </div>
  );
}
