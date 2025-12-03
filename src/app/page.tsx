/**
 * Page d'accueil de ClubSportFrance
 *
 * Redirige directement vers /map (carte interactive)
 */

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/map');
}
