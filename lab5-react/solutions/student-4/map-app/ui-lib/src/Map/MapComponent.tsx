import { useMemo, useState, useEffect } from 'react'

import { YMaps, Map, Placemark } from '@iminside/react-yandex-maps'

import { filterMarkers } from '../filterUtils'

export type LatLng = number[] // кортеж из двух чисел фиксированной длины(ровно 2 элемента типа number)

export type Marker = {
    id: string
    type: string
    position: LatLng
    title: string
}

export interface MapProps {
    startPosition: LatLng // стартовая позиция центра карты
    markers: Marker[]
    width?: string | number // чтобы можно было менять значения ширины и высоты
    height?: string | number 
    zoom?: number // необязательный зум при старте
    onFilter?: (filtered: Marker[]) => void
}

export function MapComponent(props: MapProps){
  const{
    startPosition,
    markers,
    width = '100%',
    height = '400px',
    zoom = 10,
    onFilter,
  } = props // здесь происходит деструктуризация пропса. Если в пропсе нету такого, то примутся значения по умолчанию
    
  const [filter, setFilter] = useState<string>('all')

  // здесь собирается объект defaultState чтобы он реже менялся
  const defaultState = useMemo(() => ({
    center: startPosition as number[],
    zoom
  }), [startPosition, zoom])

  const filteredMarkers = useMemo(
    () => filterMarkers(markers, filter),
    [filter, markers]
  )
    
  useEffect(() => {
    if (onFilter) onFilter(filteredMarkers)
  }, [filteredMarkers, onFilter])

  return (
    <div style={{width, height }}>
      <div style={{ marginBottom: '10px', textAlign: 'center' }}>
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={()=> setFilter('water')}>Водоснабжение </button>
        <button onClick={()=> setFilter('heating')}>Отопление </button>
        <button onClick={()=> setFilter('electricity')}>Электричество </button>
      </div>
      <YMaps>
        <Map defaultState={defaultState} width="100%" height="100%">
          {filteredMarkers.map((m) => {
            let color = 'red'

            if(m.type === 'water') color = 'blue'
            else if(m.type === 'heating') color = 'orange'
            else if(m.type === 'electricity') color = 'yellow'

            return ( 
              <Placemark
                key = {m.id}
                geometry={m.position}
                properties={{ hintContent: m.title}}
                modules={['geoObject.addon.hint', 'geoObject.addon.balloon']}
                options={{iconColor: color,}}
              />
            )
          })}
        </Map>
      </YMaps>
    </div>
  )
}
