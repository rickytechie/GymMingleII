'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MAP_CONFIG } from '@gymmingle/core'
import type { LifestyleVenue, RegionConfig } from '@gymmingle/core'

function esc(text: string): string {
  const d = document.createElement('div')
  d.textContent = text
  return d.innerHTML
}

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="0" y="0" width="24" height="24" rx="0" fill="#CCFF00" stroke="#0f0f0f" stroke-width="2"/>
  <text x="12" y="16" text-anchor="middle" font-size="14" font-weight="900" fill="#0f0f0f">⚡</text>
</svg>`

const ICON_HIGHLIGHT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="0" y="0" width="24" height="24" rx="0" fill="#FF6B35" stroke="#0f0f0f" stroke-width="2"/>
  <text x="12" y="16" text-anchor="middle" font-size="14" font-weight="900" fill="#0f0f0f">⚡</text>
</svg>`

const markerIcon = L.icon({
  iconUrl: `data:image/svg+xml,${encodeURIComponent(ICON_SVG)}`,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
})

const markerIconHighlight = L.icon({
  iconUrl: `data:image/svg+xml,${encodeURIComponent(ICON_HIGHLIGHT_SVG)}`,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
})

interface VenueMapProps {
  venues: LifestyleVenue[]
  region: RegionConfig
  onVenueSelect?: (venue: LifestyleVenue) => void
}

export function VenueMap({ venues, region, onVenueSelect }: VenueMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [region.center.latitude, region.center.longitude],
        zoom: MAP_CONFIG.defaultZoom,
        zoomControl: false,
        attributionControl: true,
      })

      L.tileLayer(MAP_CONFIG.tileUrl, {
        attribution: MAP_CONFIG.attribution,
        maxZoom: MAP_CONFIG.maxZoom,
      }).addTo(map)

      L.control.zoom({ position: 'bottomright' }).addTo(map)

      mapRef.current = map
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [region])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const markers = venues.map((venue) => {
      if (!venue.location) return null

      const marker = L.marker([venue.location.latitude, venue.location.longitude], {
        icon: venue.vibeScore >= 70 ? markerIconHighlight : markerIcon,
      })

      const tags = venue.lifestyleTags.map((t) =>
        `<span class="venuemap-tag">${t}</span>`
      ).join('')

      marker.bindPopup(`
        <div class="venuemap-popup">
          <h3 class="venuemap-popup-title">${esc(venue.name)}</h3>
          ${venue.address ? `<p class="venuemap-popup-addr">${esc(venue.address)}</p>` : ''}
          <div class="venuemap-popup-tags">${tags}</div>
          <div class="venuemap-popup-footer">
            <span class="venuemap-vibe">Vibe ${venue.vibeScore}</span>
            ${venue.distance != null ? `<span class="venuemap-dist">${(venue.distance / 1000).toFixed(1)} km</span>` : ''}
          </div>
        </div>
      `)

      marker.on('click', () => {
        onVenueSelect?.(venue)
      })

      marker.addTo(map)
      return marker
    }).filter(Boolean) as L.Marker[]

    return () => {
      markers.forEach((m) => m.remove())
    }
  }, [venues, onVenueSelect])

  return <div ref={mapContainerRef} className="h-full w-full" />
}

export default VenueMap
