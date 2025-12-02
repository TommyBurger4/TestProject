'use client';

/**
 * Composant MapView - Carte interactive Google Maps
 *
 * Affiche une carte Google Maps avec :
 * - Geolocalisation utilisateur
 * - Markers de clubs sportifs
 * - Bouton recentrage
 * - Accessible sans authentification
 */

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapViewProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  onMapLoad?: (map: google.maps.Map) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  center = { lat: 48.8566, lng: 2.3522 }, // Paris par defaut
  zoom = 6,
  onMapLoad,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);

  // Charger Google Maps API
  useEffect(() => {
    const initMap = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
          throw new Error('Google Maps API key manquante. Ajoutez NEXT_PUBLIC_GOOGLE_MAPS_API_KEY dans .env.local');
        }

        const loader = new Loader({
          apiKey,
          version: 'weekly',
          libraries: ['places', 'geometry'],
        });

        await loader.load();

        if (mapRef.current) {
          // Creer la carte
          const map = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
          });

          mapInstanceRef.current = map;

          // Callback quand la carte est prete
          if (onMapLoad) {
            onMapLoad(map);
          }

          setLoading(false);

          // Demander geolocalisation
          requestUserLocation(map);
        }
      } catch (err) {
        console.error('Erreur lors du chargement de Google Maps:', err);
        setError('Impossible de charger la carte. Verifiez votre connexion.');
        setLoading(false);
      }
    };

    initMap();
  }, []);

  // Demander geolocalisation utilisateur
  const requestUserLocation = (map: google.maps.Map) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setUserLocation(userPos);

          // Creer marker position utilisateur
          const marker = new google.maps.Marker({
            position: userPos,
            map,
            title: 'Ma position',
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2,
            },
          });

          userMarkerRef.current = marker;

          // Centrer la carte sur l'utilisateur
          map.setCenter(userPos);
          map.setZoom(12);
        },
        (error) => {
          console.warn('Geolocalisation refusee:', error);
          // Ne pas afficher d'erreur, juste rester sur Paris
        }
      );
    }
  };

  // Recentrer sur l'utilisateur
  const handleCenterOnUser = () => {
    if (userLocation && mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(userLocation);
      mapInstanceRef.current.setZoom(12);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Erreur</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {/* Carte Google Maps */}
      <div ref={mapRef} className="h-full w-full" />

      {/* Bouton recentrer sur utilisateur */}
      {userLocation && (
        <button
          onClick={handleCenterOnUser}
          className="absolute bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition-colors flex items-center justify-center text-2xl"
          aria-label="Recentrer sur ma position"
        >
          📍
        </button>
      )}

      {/* Message permission */}
      {!userLocation && !loading && (
        <div className="absolute top-0 left-0 right-0 bg-info text-white py-3 px-4 text-center text-sm">
          Activez la localisation pour voir les clubs a proximite
        </div>
      )}
    </div>
  );
};
