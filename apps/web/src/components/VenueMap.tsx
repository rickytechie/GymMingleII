'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MAP_CONFIG } from '@gymmingle/core'
import type { LifestyleVenue, RegionConfig, VenueCategory } from '@gymmingle/core'
import { filterXSS } from 'xss'

const XSS_OPTIONS = { stripIgnoreTag: true, stripIgnoreTagBody: ['script', 'style'] }
function sanitize(text: string): string {
  return filterXSS(text, XSS_OPTIONS)
}

const CATEGORY_COLORS: Record<VenueCategory, string> = {
  Fitness: '#CCFF00',
  Dining: '#FF6B35',
  Nightlife: '#A855F7',
  Wellness: '#38BDF8',
  Outdoor: '#4ADE80',
  Arts: '#FB923C',
  Music: '#F472B6',
  Skatepark: '#FBBF24',
  Bathhouse: '#818CF8',
  StripClub: '#F87171',
}

const CATEGORY_SYMBOLS: Record<VenueCategory, string> = {
  Fitness: '&#9925;',
  Dining: '&#127860;',
  Nightlife: '&#127916;',
  Wellness: '&#10048;',
  Outdoor: '&#9968;',
  Arts: '&#127912;',
  Music: '&#9835;',
  Skatepark: '&#9974;',
  Bathhouse: '&#128166;',
  StripClub: '&#127881;',
}

function makeSquareIcon(category: VenueCategory, highlight: boolean): L.DivIcon {
  const color = CATEGORY_COLORS[category] ?? '#CCFF00'
  const symbol = CATEGORY_SYMBOLS[category] ?? '&#9733;'
  const border = highlight ? '#FF6B35' : '#0f0f0f'
  const bg = highlight ? color : color + 'AA'
  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
      <rect x="0" y="0" width="28" height="28" rx="2" fill="${bg}" stroke="${border}" stroke-width="2"/>
      <text x="14" y="19" text-anchor="middle" font-size="16" font-weight="900" fill="#0f0f0f">${symbol}</text>
    </svg>`,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  })
}

interface VenueMapProps {
  venues: LifestyleVenue[]
  region: RegionConfig
  onVenueSelect?: (venue: LifestyleVenue) => void
}

export function VenueMap({ venues, region, onVenueSelect }: VenueMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const layersControlRef = useRef<L.Control.Layers | null>(null)

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

    // Remove existing layer groups and layers control
    map.eachLayer((layer) => {
      if (layer instanceof L.LayerGroup) map.removeLayer(layer)
    })
    if (layersControlRef.current) {
      map.removeControl(layersControlRef.current)
      layersControlRef.current = null
    }

    // Group venues by category
    const grouped = new Map<VenueCategory, LifestyleVenue[]>()
    for (const venue of venues) {
      const cat = venue.category ?? 'Fitness'
      if (!grouped.has(cat)) grouped.set(cat, [])
      grouped.get(cat)!.push(venue)
    }

    const overlayMaps: Record<string, L.LayerGroup> = {}

    grouped.forEach((catVenues, category) => {
      const group = L.layerGroup()

      for (const venue of catVenues) {
        if (!venue.location) continue

        const highlight = venue.vibeScore >= 70
        const marker = L.marker([venue.location.latitude, venue.location.longitude], {
          icon: makeSquareIcon(category, highlight),
        })

        const tags = venue.lifestyleTags.map((t) =>
          `<span class="venuemap-tag">${sanitize(t)}</span>`
        ).join('')

        marker.bindPopup(`
          <div class="venuemap-popup">
            <span class="venuemap-popup-cat" style="background:${CATEGORY_COLORS[category]};color:#0f0f0f">${category}</span>
            <h3 class="venuemap-popup-title">${sanitize(venue.name)}</h3>
            ${venue.address ? `<p class="venuemap-popup-addr">${sanitize(venue.address)}</p>` : ''}
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

        marker.addTo(group)
      }

      group.addTo(map)
      overlayMaps[category] = group
    })

    layersControlRef.current = L.control.layers({}, overlayMaps, {
      position: 'topright',
      collapsed: true,
      sortLayers: true,
    }).addTo(map)

    return () => {
      map.eachLayer((layer) => {
        if (layer instanceof L.LayerGroup) map.removeLayer(layer)
      })
      if (layersControlRef.current) {
        map.removeControl(layersControlRef.current)
        layersControlRef.current = null
      }
    }
  }, [venues, onVenueSelect])

  return <div ref={mapContainerRef} className="h-full w-full" />
}

export default VenueMap
