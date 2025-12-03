'use client';

/**
 * Page /map - Carte interactive des clubs sportifs
 *
 * Ecran principal accessible a tous (avec ou sans connexion)
 * Affiche une carte Leaflet avec tous les clubs sportifs de France
 */

import React from 'react';
import Link from 'next/link';
import { MapView } from '@/components/MapView';
import { useAuth } from '@/contexts/AuthContext';

// Mock data - clubs sportifs (a remplacer par vraie data Firestore plus tard)
const MOCK_CLUBS = [
  {
    id: '1',
    name: 'Tennis Club de Paris',
    sport: 'Tennis',
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    id: '2',
    name: 'FC Marseille',
    sport: 'Football',
    lat: 43.2965,
    lng: 5.3698,
  },
  {
    id: '3',
    name: 'Lyon Basketball',
    sport: 'Basketball',
    lat: 45.764,
    lng: 4.8357,
  },
  {
    id: '4',
    name: 'Toulouse Natation',
    sport: 'Natation',
    lat: 43.6047,
    lng: 1.4442,
  },
  {
    id: '5',
    name: 'Nice Volley',
    sport: 'Volleyball',
    lat: 43.7102,
    lng: 7.262,
  },
];

export default function MapPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🏃‍♂️</span>
          <h1 className="text-xl font-bold text-gray-900">ClubSportFrance</h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/search"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Rechercher
          </Link>

          {user ? (
            <Link
              href="/profile"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
            >
              Mon profil
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
            >
              Se connecter
            </Link>
          )}
        </div>
      </header>

      {/* Carte */}
      <main className="flex-1 relative">
        <MapView clubs={MOCK_CLUBS} />

        {/* Legende */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <h2 className="font-bold text-gray-900 mb-2">🗺️ Carte des clubs</h2>
          <p className="text-sm text-gray-600 mb-3">
            Explorez {MOCK_CLUBS.length} clubs sportifs en France
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
            <span>Clubs sportifs</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-600"></span>
            <span>Votre position</span>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="absolute bottom-6 left-4 bg-white rounded-lg shadow-lg p-4">
          <p className="text-2xl font-bold text-primary">{MOCK_CLUBS.length}</p>
          <p className="text-sm text-gray-600">Clubs disponibles</p>
        </div>
      </main>
    </div>
  );
}
