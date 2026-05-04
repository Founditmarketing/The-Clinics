import React, { useEffect, useRef, useState } from 'react';
import maplibregl, { Map as MapLibreMap, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export interface MappedLocation {
  key: string;
  name: string;
  coords: { lat: number; lng: number };
}

interface LocationsMapProps {
  locations: MappedLocation[];
  activeKey?: string;
  onPick?: (key: string) => void;
  /** Initial center fallback (used before flyTo on the active marker). */
  center?: [number, number];
  /** Initial zoom fallback. */
  zoom?: number;
}

const RASTER_STYLE = {
  version: 8 as const,
  sources: {
    'carto-light': {
      type: 'raster' as const,
      tiles: [
        'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors © CARTO',
    },
  },
  layers: [
    { id: 'background', type: 'background' as const, paint: { 'background-color': '#ede6d6' } },
    { id: 'carto-light', type: 'raster' as const, source: 'carto-light' },
  ],
};

const LocationsMap: React.FC<LocationsMapProps> = ({
  locations,
  activeKey,
  onPick,
  center = [-92.4693, 31.3146],
  zoom = 11,
}) => {
  const mapRef = useRef<MapLibreMap | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [ready, setReady] = useState(false);

  // Initialize map
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: RASTER_STYLE as any,
      center: center as [number, number],
      zoom,
      minZoom: 5,
      maxZoom: 14,
      attributionControl: { compact: true },
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.on('load', () => setReady(true));
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resize on container changes
  useEffect(() => {
    if (!ready || !mapRef.current || !wrapRef.current) return;
    const map = mapRef.current;
    map.resize();
    const ro = new ResizeObserver(() => map.resize());
    ro.observe(wrapRef.current);
    const onOrient = () => window.setTimeout(() => map.resize(), 380);
    window.addEventListener('orientationchange', onOrient);
    return () => {
      ro.disconnect();
      window.removeEventListener('orientationchange', onOrient);
    };
  }, [ready]);

  // Markers
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    locations.forEach((loc) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = `map-pin ${activeKey === loc.key ? 'is-active' : ''}`;
      el.setAttribute('aria-label', `${loc.name} clinic`);
      el.innerHTML = `
        <span class="map-pin-dot"></span>
        <span class="map-pin-label">${loc.name}</span>
      `;
      el.addEventListener('click', () => onPick && onPick(loc.key));
      const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([loc.coords.lng, loc.coords.lat])
        .addTo(mapRef.current!);
      markersRef.current.push(marker);
    });
  }, [ready, locations, activeKey, onPick]);

  // Fly to active
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const active = locations.find((l) => l.key === activeKey) || locations[0];
    if (!active) return;
    mapRef.current.flyTo({
      center: [active.coords.lng, active.coords.lat],
      zoom: locations.length === 1 ? 12 : 8.6,
      duration: 1100,
      essential: true,
    });
  }, [ready, activeKey, locations]);

  return (
    <div
      ref={wrapRef}
      className="locations-map"
      aria-label="Interactive map of theCLINICS"
    >
      <div ref={containerRef} className="map-canvas" />
      <style>{`
        .locations-map {
          position: relative;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.55);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.65), var(--glass-shadow);
          height: clamp(300px, 42vw, 480px);
          min-height: 280px;
          background: rgba(255,255,255,0.35);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .map-canvas { width: 100%; height: 100%; position: relative; z-index: 0; }
        .map-pin { background: none; border: none; padding: 0; cursor: pointer; display: inline-flex; flex-direction: column; align-items: center; gap: 0.25rem; transform: translateY(-2px); }
        .map-pin-dot { width: 14px; height: 14px; border-radius: 999px; background: var(--terracotta); box-shadow: 0 0 0 4px rgba(193,53,42,0.18), 0 8px 18px -6px rgba(193,53,42,0.45); transition: 220ms ease; }
        .map-pin.is-active .map-pin-dot { background: var(--terracotta-deep); box-shadow: 0 0 0 6px rgba(193,53,42,0.24), 0 0 0 12px rgba(193,53,42,0.10), 0 10px 24px -6px rgba(193,53,42,0.45); transform: scale(1.15); }
        .map-pin-label { font-family: "JetBrains Mono", monospace; font-size: 0.7rem; letter-spacing: 0.16em; padding: 0.2rem 0.55rem; border-radius: 999px; background: rgba(255,255,255,0.88); backdrop-filter: blur(8px); color: var(--forest-deep); border: 1px solid rgba(255,255,255,0.55); max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .map-pin.is-active .map-pin-label { background: var(--forest); color: var(--bone); border-color: var(--forest); }
        @media (max-width: 720px) {
          .locations-map { height: max(220px, min(44vh, 360px)); min-height: 220px; border-radius: 20px; }
          .map-pin-label { font-size: 0.56rem; letter-spacing: 0.1em; padding: 0.15rem 0.42rem; max-width: 100px; }
        }
      `}</style>
    </div>
  );
};

export default LocationsMap;
