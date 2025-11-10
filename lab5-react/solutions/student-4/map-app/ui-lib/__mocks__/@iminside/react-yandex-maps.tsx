import type { ReactNode } from 'react'

export const YMaps = ({ children }: { children?: ReactNode }) => <div>{children}</div>

export const Map = ({ children }: { children?: ReactNode }) => (
  <div data-testid="map">{children}</div>
)

interface PlacemarkProps {
  geometry: number[]
  options?: { iconColor?: string }
}

export const Placemark = ({ geometry, options }: PlacemarkProps) => (
  <div
    data-testid="placemark"
    data-geometry={geometry.join(',')}
    data-icon-color={options?.iconColor ?? 'none'}
  />
)
