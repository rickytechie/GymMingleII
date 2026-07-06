'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { LifestyleVenue, RegionConfig } from '@gymmingle/core'

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
  <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#CCFF00" stroke="#0f0f0f" stroke-width="2"/>
  <circle cx="12" cy="12" r="5" fill="#0f0f0f"/>
</svg>`

const ICON_HIGHLIGHT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
  <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#FF6B35" stroke="#0f0f0f" stroke-width="2"/>
  <circle cx="12" cy="12" r="5" fill="#0f0f0f"/>
</svg>`

const markerIcon = L.icon({
  iconUrl: `data:image/svg+xml,${encodeURIComponent(ICON_SVG)}`,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
})

const markerIconHighlight = L.icon({
  iconUrl: `data:image/svg+xml,${encodeURIComponent(ICON_HIGHLIGHT_SVG)}`,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
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
        zoom: 13,
        zoomControl: false,
        attributionControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
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
          <h3 class="venuemap-popup-title">${venue.name}</h3>
          ${venue.address ? `<p class="venuemap-popup-addr">${venue.address}</p>` : ''}
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
