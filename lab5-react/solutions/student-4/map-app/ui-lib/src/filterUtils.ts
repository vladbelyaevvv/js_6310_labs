import type { Marker } from './Map/MapComponent'

export function filterMarkers(markers: Marker[], filter: string): Marker[] {
  if(filter === 'all') return markers

  return markers.filter((m) => m.type === filter)
}