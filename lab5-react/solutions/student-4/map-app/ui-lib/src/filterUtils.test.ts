import { filterMarkers } from './filterUtils'

import type { Marker } from './Map/MapComponent'

const mockMarkers: Marker[] = [
  { id: '1', type: 'water', position: [1, 1], title: 'Вода' },
  { id: '2', type: 'heating', position: [2, 2], title: 'Тепло' },
  { id: '3', type: 'electricity', position: [3, 3], title: 'Свет' },
]

describe('filterMarkers', () => {
  test('возвращает все метки при фильтре all', () => {
    const result = filterMarkers(mockMarkers, 'all')

    expect(result).toHaveLength(3)
  })

  test('фильтрует по типу water', () => {
    const result = filterMarkers(mockMarkers, 'water')

    expect(result).toHaveLength(1)
    expect(result[0].type).toBe('water')
  })

  test('возвращает пустой массив, если нет совпадений', () => {
    const result = filterMarkers(mockMarkers, 'park')

    expect(result).toHaveLength(0)
  })
})