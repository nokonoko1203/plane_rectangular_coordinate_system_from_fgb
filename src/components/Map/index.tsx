import React, { useEffect, useRef } from 'react';

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import initialStyle from '@/assets/initial_style.json';
import { initialViewState } from '@/components/Map/initialViewState';
import { addMarker, addMvtLayer } from '@/utils/util';

let map: maplibregl.Map;

const useInitializeMap = (mapContainer: React.MutableRefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    if (!map) {
      if (!mapContainer.current) return;

      map = new maplibregl.Map({
        container: mapContainer.current,
        style: JSON.parse(JSON.stringify(initialStyle)),
        center: [initialViewState.longitude, initialViewState.latitude],
        zoom: initialViewState.zoom,
        bearing: initialViewState.bearing,
        pitch: initialViewState.pitch,
        interactive: true,
      });
    }

    map.addControl(new maplibregl.NavigationControl());

    map.on('load', () => {
      const mvtUrl = process.env.NEXT_PUBLIC_MVT_URL;
      if (!mvtUrl) return;
      addMvtLayer(map, mvtUrl);
    });
  }, []);
};

const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useInitializeMap(mapContainer);

  const townFgbUrl = process.env.NEXT_PUBLIC_TOWN_FGB_URL;

  useEffect(() => {
    map.on('click', (e) => {
      if (!townFgbUrl) return;
      addMarker(townFgbUrl, e, map);
    });
  }, []);

  return (
    <>
      <div className="h-full w-full" ref={mapContainer} />
    </>
  );
};

export default Map;
