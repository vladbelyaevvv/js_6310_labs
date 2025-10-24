import { render, screen } from '@testing-library/react'

import { Card } from './Card'

describe('math', () => {
  test('plus', () => {
    expect(2 + 2).toEqual(4)
  })

  test('renders children', () => {
    render(<Card>Click me</Card>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})