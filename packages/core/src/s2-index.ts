import { LatLng } from './venue-service'

export type S2Level =
  | 4
  | 6
  | 8
  | 10
  | 12

export interface S2Cell {
  cellId: string
  level: S2Level
  center: LatLng
}

export interface S2DiscoveryOptions {
  center: LatLng
  radiusMiles: number
  minLevel?: S2Level
  maxLevel?: S2Level
}

interface S2Geometry {
  S2: {
    latLngToKey: (lat: number, lng: number, level: number) => string
    keyToId: (key: string) => string
    idToKey: (id: string) => string
    keyToLatLng: (key: string) => { lat: number; lng: number }
  }
}

function getS2(): S2Geometry | null {
  try {
    const mod = require('s2-geometry')
    return mod
  } catch {
    return null
  }
}

export function latLngToS2CellId(lat: number, lng: number, level: S2Level = 10): string | null {
  const s2 = getS2()
  if (!s2) return null
  const key = s2.S2.latLngToKey(lat, lng, level)
  return s2.S2.keyToId(key)
}

export function getCoveringCells(center: LatLng, radiusMiles: number): S2Cell[] {
  const level = radiusMiles > 500 ? 4 : radiusMiles > 100 ? 6 : radiusMiles > 30 ? 8 : 10
  const s2 = getS2()
  if (!s2) return []

  const cellId = latLngToS2CellId(center.latitude, center.longitude, level as S2Level)
  if (!cellId) return []

  const key = s2.S2.idToKey(cellId)
  const ll = s2.S2.keyToLatLng(key)

  return [{
    cellId,
    level: level as S2Level,
    center: { latitude: ll.lat, longitude: ll.lng },
  }]
}

export function expandRadius(currentRadiusMiles: number): number {
  const increments = [50, 100, 250, 500, 1000]
  for (const inc of increments) {
    if (inc > currentRadiusMiles) return inc
  }
  return 1000
}
