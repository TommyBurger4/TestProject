'use client';

/**
 * Page /map - Carte interactive des clubs sportifs
 *
 * Ecran principal accessible a tous (avec ou sans connexion)
 * Affiche une carte Leaflet avec tous les clubs sportifs de France
 */

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useAuth } from '@/contexts/AuthContext';

// Charger MapView uniquement cote client (pas de SSR)
const MapView = dynamic(() => import('@/components/MapView').then(mod => ({ default: mod.MapView })), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        <p className="text-gray-600">Chargement de la carte...</p>
      </div>
    </div>
  ),
});

// Fonction pour generer des coordonnees aleatoires en France
const generateRandomCoordinates = () => {
  const lat = 42 + Math.random() * 9; // 42 to 51 (latitude France)
  const lng = -5 + Math.random() * 13; // -5 to 8 (longitude France)
  return { lat, lng };
};

// Sports disponibles
const SPORTS = [
  'Football', 'Tennis', 'Basketball', 'Natation', 'Volleyball',
  'Rugby', 'Handball', 'Cyclisme', 'Athletisme', 'Escalade',
  'Boxe', 'Judo', 'Equitation', 'Golf', 'Ski'
];

// Villes francaises
const CITIES = [
  'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg',
  'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre',
  'Saint-Etienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nimes',
  'Villeurbanne', 'Clermont-Ferrand', 'Aix-en-Provence', 'Brest', 'Limoges',
  'Tours', 'Amiens', 'Perpignan', 'Metz', 'Besancon', 'Orleans',
  'Mulhouse', 'Rouen', 'Caen', 'Nancy', 'Argenteuil'
];

// Prefixes de clubs
const CLUB_PREFIXES = [
  'Club', 'Association', 'Union', 'Cercle', 'Stade',
  'Olympique', 'AS', 'FC', 'RC'
];

// Fonction pour generer N clubs aleatoires
const generateMockClubs = (count: number) => {
  const clubs = [];
  for (let i = 1; i <= count; i++) {
    const sport = SPORTS[Math.floor(Math.random() * SPORTS.length)];
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const prefix = CLUB_PREFIXES[Math.floor(Math.random() * CLUB_PREFIXES.length)];
    const coords = generateRandomCoordinates();

    clubs.push({
      id: `club-${i}`,
      name: `${prefix} ${sport} ${city}`,
      sport,
      lat: coords.lat,
      lng: coords.lng,
    });
  }
  return clubs;
};

// Generer 200 clubs aleatoires
const MOCK_CLUBS = generateMockClubs(200);

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
              href="/dashboard"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
            >
              Mon Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
            >
              Espace Club
            </Link>
          )}
        </div>
      </header>

      {/* Carte */}
      <main className="flex-1 relative">
        <MapView clubs={MOCK_CLUBS} />

        {/* Legende */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-[1000]">
          <h2 className="font-bold text-gray-900 mb-2">🗺️ Carte des clubs</h2>
          <p className="text-sm text-gray-600 mb-3">
            Explorez {MOCK_CLUBS.length} clubs sportifs en France
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex gap-1">
                <span className="inline-block w-5 h-5 rounded-full bg-red-500 border-2 border-white shadow flex items-center justify-center text-xs">⚽</span>
                <span className="inline-block w-5 h-5 rounded-full bg-red-500 border-2 border-white shadow flex items-center justify-center text-xs">🎾</span>
              </div>
              <span>Clubs sportifs</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="inline-block w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow flex items-center justify-center text-xs">📍</span>
              <span>Votre position</span>
            </div>
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
