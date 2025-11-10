import { useState, useMemo } from 'react'

import { MapComponent, type Marker } from '@my-app/ui-library'

export default function App() {
  const [filtered, setFiltered] = useState<Marker[]>([])

  const markers = useMemo<Marker[]>(() => [
    { id: '1', type: 'water', position: [55.829247, 49.117583], title: 'Прорыв трубы' },
    { id: '2', type: 'heating', position: [55.797405, 49.151389], title: 'Нет отопления' },
    { id: '3', type: 'electricity', position: [55.817513, 49.125063], title: 'Проблемы с электроснабжением' },
  ], [])

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1>Карта с метками</h1>
      <p>Показано меток: {filtered.length}</p>

      <MapComponent
        startPosition={[55.820980, 49.136112]}
        markers={markers}
        zoom={10}
        height="420px"
        onFilter={setFiltered}
      />
    </div>
  )
}
