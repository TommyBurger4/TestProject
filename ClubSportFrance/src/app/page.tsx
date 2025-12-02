/**
 * Page d'accueil de ClubSportFrance
 *
 * Page temporaire qui redirigera vers /map (carte interactive)
 * TODO: Creer une vraie landing page avec presentation du site
 */

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <main className="flex flex-col items-center gap-8 text-center" style={{ maxWidth: '800px', width: '100%' }}>
        <h1 className="text-5xl font-bold text-text">
          🏃‍♂️ ClubSportFrance
        </h1>
        <p className="text-xl text-text-secondary" style={{ lineHeight: '1.8', width: '100%', maxWidth: '600px' }}>
          Decouvrez tous les clubs sportifs de France sur une carte interactive.
          Trouvez facilement un club pres de chez vous !
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/map"
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Explorer la carte
          </Link>
          <Link
            href="/search"
            className="rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Rechercher un club
          </Link>
        </div>
        <p className="mt-8 text-sm text-text-secondary">
          🚧 Site en cours de developpement - Phase 1/15 completee
        </p>
      </main>
    </div>
  );
}
