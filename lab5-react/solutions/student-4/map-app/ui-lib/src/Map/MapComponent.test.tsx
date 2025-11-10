import { render, screen, fireEvent } from '@testing-library/react'

import { MapComponent } from './MapComponent'

import type { Marker } from './MapComponent'

const markers: Marker[] = [
  { id: '1', type: 'water', position: [1, 1], title: 'Вода' },
  { id: '2', type: 'heating', position: [2, 2], title: 'Тепло' },
  { id: '3', type: 'electricity', position: [3, 3], title: 'Свет' },
  { id: '4', type: 'other',       position: [4, 4], title: 'Другое' },
]

test('MapComponent отображает метки', () => {
  render(<MapComponent startPosition={[1, 1]} markers={markers} />)
  const placemarks = screen.getAllByTestId('placemark')

  expect(placemarks).toHaveLength(4)
})

test('Начальный рендер вызывает карту со всеми метками', () => {
  const onFilter = jest.fn()

  render(<MapComponent startPosition={[0, 0]} markers={markers} onFilter={onFilter} />)
  // отрисованы все placemark
  expect(screen.getAllByTestId('placemark')).toHaveLength(4)
  // effect вызвал onFilter один раз с 4 метками
  expect(onFilter).toHaveBeenCalledTimes(1)
  expect(onFilter.mock.calls[0][0]).toHaveLength(4)
})

test('Кнопки фильтров меняют визуал маркера и триггерят onFilter', () => {
  const onFilter = jest.fn()

  render(<MapComponent startPosition={[0, 0]} markers={markers} onFilter={onFilter} />)

  fireEvent.click(screen.getByText('Водоснабжение'))
  expect(screen.getAllByTestId('placemark')).toHaveLength(1)
  // второй вызов onFilter после клика
  expect(onFilter).toHaveBeenCalledTimes(2)
  expect(onFilter.mock.calls[1][0][0].type).toBe('water')

  fireEvent.click(screen.getByText('Отопление'))
  expect(screen.getAllByTestId('placemark')).toHaveLength(1)
  expect(onFilter).toHaveBeenCalledTimes(3)
  expect(onFilter.mock.calls[2][0][0].type).toBe('heating')

  fireEvent.click(screen.getByText('Все'))
  expect(screen.getAllByTestId('placemark')).toHaveLength(4)
  expect(onFilter).toHaveBeenCalledTimes(4)

  fireEvent.click(screen.getByText('Электричество'))
  expect(screen.getAllByTestId('placemark')).toHaveLength(1)
  expect(onFilter).toHaveBeenCalledTimes(5)
  expect(onFilter.mock.calls[4][0][0].type).toBe('electricity')
})

test('Цвета меток корректно отображаются', () => {
  render(<MapComponent startPosition={[0, 0]} markers={markers} />)

  const colors = screen
    .getAllByTestId('placemark')
    .map(el => el.getAttribute('data-icon-color'))

  expect(colors).toContain('blue')    // water
  expect(colors).toContain('orange')  // heating
  expect(colors).toContain('yellow')  // electricity
  expect(colors).toContain('red')     // default (other)
})
