'use client';

/**
 * Composant MapView - Carte interactive avec Leaflet
 *
 * Affiche une carte Leaflet (OpenStreetMap) avec :
 * - Centree sur la France par defaut
 * - Geolocalisation utilisateur
 * - Markers de clubs sportifs
 * - Bouton recentrage
 * - Gratuit et sans cle API
 */

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css';

// Fix pour les icones Leaflet avec Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  clubs?: Array<{
    id: string;
    name: string;
    sport: string;
    lat: number;
    lng: number;
  }>;
}

// Composant pour recentrer la carte
function RecenterButton({ center }: { center: [number, number] }) {
  const map = useMap();

  const handleRecenter = () => {
    map.setView(center, 12);
  };

  return (
    <button
      onClick={handleRecenter}
      className="absolute bottom-6 right-6 z-[1000] h-14 w-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition-colors flex items-center justify-center text-2xl"
      aria-label="Recentrer sur ma position"
    >
      📍
    </button>
  );
}

// Composant pour gerer la geolocalisation
function UserLocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setPosition(userPos);
          map.setView(userPos, 12);
        },
        (error) => {
          console.warn('Geolocalisation refusee:', error);
        }
      );
    }
  }, [map]);

  // Icone personnalisee pour l'utilisateur (pin bleu avec emoji)
  const userIcon = new L.DivIcon({
    html: `
      <div class="custom-marker-pin user-marker">
        <div class="pin-emoji">📍</div>
      </div>
    `,
    className: 'custom-emoji-marker',
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });

  return position ? (
    <>
      <Marker position={position} icon={userIcon}>
        <Popup>
          <strong>Vous etes ici</strong>
        </Popup>
      </Marker>
      <RecenterButton center={position} />
    </>
  ) : null;
}

export const MapView: React.FC<MapViewProps> = ({
  center = [46.603354, 1.888334], // Centre de la France
  zoom = 6,
  clubs = [],
}) => {
  // Fonction pour obtenir l'emoji selon le sport
  const getSportEmoji = (sport: string): string => {
    const sportEmojis: { [key: string]: string } = {
      'Football': '⚽',
      'Tennis': '🎾',
      'Basketball': '🏀',
      'Natation': '🏊',
      'Volleyball': '🏐',
      'Rugby': '🏉',
      'Handball': '🤾',
      'Cyclisme': '🚴',
      'Athletisme': '🏃',
      'Escalade': '🧗',
      'Boxe': '🥊',
      'Judo': '🥋',
      'Equitation': '🏇',
      'Golf': '⛳',
      'Ski': '⛷️',
    };
    return sportEmojis[sport] || '🏅'; // 🏅 par defaut
  };

  // Fonction pour creer un marker avec emoji dans un pin
  const createEmojiIcon = (sport: string) => {
    const emoji = getSportEmoji(sport);
    return new L.DivIcon({
      html: `
        <div class="custom-marker-pin">
          <div class="pin-emoji">${emoji}</div>
        </div>
      `,
      className: 'custom-emoji-marker',
      iconSize: [40, 50],
      iconAnchor: [20, 50],
      popupAnchor: [0, -50],
    });
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full"
        style={{ height: '100%', width: '100%' }}
      >
        {/* Tuiles OpenStreetMap (gratuit) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker position utilisateur + bouton recentrage */}
        <UserLocationMarker />

        {/* Markers des clubs avec emojis et clustering */}
        <MarkerClusterGroup
          chunkedLoading
          showCoverageOnHover={false}
          spiderfyOnMaxZoom={true}
          iconCreateFunction={(cluster) => {
            const count = cluster.getChildCount();
            let size = 'small';
            if (count >= 100) size = 'large';
            else if (count >= 50) size = 'medium';

            return L.divIcon({
              html: `<div class="cluster-icon cluster-${size}"><span>${count}</span></div>`,
              className: 'custom-cluster-icon',
              iconSize: L.point(40, 40),
            });
          }}
        >
          {clubs.map((club) => (
            <Marker
              key={club.id}
              position={[club.lat, club.lng]}
              icon={createEmojiIcon(club.sport)}
            >
              <Popup>
                <div className="text-center">
                  <div className="text-3xl mb-2">{getSportEmoji(club.sport)}</div>
                  <strong className="text-lg">{club.name}</strong>
                  <p className="text-gray-600 text-sm mt-1">{club.sport}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};
