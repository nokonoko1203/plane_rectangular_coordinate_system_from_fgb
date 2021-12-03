import { geojson } from 'flatgeobuf';
import maplibregl from 'maplibre-gl';
import { point, polygon } from '@turf/helpers';
import booleanIntersects from '@turf/boolean-intersects';

let marker: maplibregl.Marker;
let popup: maplibregl.Popup;

export const addMvtLayer = (map: maplibregl.Map, url: string) => {
  map.addSource('boundary', {
    type: 'vector',
    tiles: [url],
    minzoom: 11,
    maxzoom: 18,
  });

  map.addLayer({
    id: 'boundary_1',
    type: 'fill',
    source: 'boundary',
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'fill-color': '#0000ff',
      'fill-opacity': 0.4,
    },
    filter: ['all', ['==', 'system_number', '1']],
    'source-layer': 'add_system_number',
  });

  map.addLayer({
    id: 'boundary_2',
    type: 'fill',
    source: 'boundary',
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'fill-color': '#1e90ff',
      'fill-opacity': 0.4,
    },
    filter: ['all', ['==', 'system_number', '2']],
    'source-layer': 'add_system_number',
  });

  map.addLayer({
    id: 'boundary_3',
    type: 'fill',
    source: 'boundary',
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'fill-color': '#87cefa',
      'fill-opacity': 0.4,
    },
    filter: ['all', ['==', 'system_number', '3']],
    'source-layer': 'add_system_number',
  });

  map.addLayer({
    id: 'boundary_4',
    type: 'fill',
    source: 'boundary',
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'fill-color': '#afeeee',
      'fill-opacity': 0.4,
    },
    filter: ['all', ['==', 'system_number', '4']],
    'source-layer': 'add_system_number',
  });

  map.addLayer({
    id: 'boundary_5',
    type: 'fill',
    source: 'boundary',
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'fill-color': '#008080',
      'fill-opacity': 0.4,
    },
    filter: ['all', ['==', 'system_number', '5']],
    'source-layer': 'add_system_number',
  });

  map.addLayer({
    id: 'boundary_6',
    type: 'fill',
    source: 'boundary',
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'fill-color': '#008000',
      'fill-opacity': 0.4,
    },
    filter: ['all', ['==', 'system_number', '6']],
    'source-layer': 'add_system_number',
  });

  map.addLayer({
    id: 'boundary_7',
    type: 'fill',
    source: 'boundary',
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'fill-color': '#00fa9a',
      'fill-opacity': 0.4,
    },
    filter: ['all', ['==', 'system_number', '7']],
    'source-layer': 'add_system_number',
  });

  map.addLayer({
    id: 'boundary_8',
    type: 'fill',
    source: 'boundary',
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'fill-color': '#808000',
      'fill-opacity': 0.4,
    },
    filter: ['all', ['==', 'system_number', '8']],
    'source-layer': 'add_system_number',
  });

  map.addLayer({
    id: 'boundary_9',
    type: 'fill',
    source: 'boundary',
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'fill-color': '#ffff00',
      'fill-opacity': 0.4,
    },
    filter: ['all', ['==', 'system_number', '9']],
    'source-layer': 'add_system_number',
  });

  map.addLayer({
    id: 'boundary_10',
    type: 'fill',
    source: 'boundary',
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'fill-color': '#ff8c00',
      'fill-opacity': 0.4,
    },
    filter: ['all', ['==', 'system_number', '10']],
    'source-layer': 'add_system_number',
  });

  map.addLayer({
    id: 'boundary_11',
    type: 'fill',
    source: 'boundary',
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'fill-color': '#8b0000',
      'fill-opacity': 0.4,
    },
    filter: ['all', ['==', 'system_number', '11']],
    'source-layer': 'add_system_number',
  });

  map.addLayer({
    id: 'boundary_12',
    type: 'fill',
    source: 'boundary',
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'fill-color': '#ff00ff',
      'fill-opacity': 0.4,
    },
    filter: ['all', ['==', 'system_number', '12']],
    'source-layer': 'add_system_number',
  });

  map.addLayer({
    id: 'boundary_13',
    type: 'fill',
    source: 'boundary',
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'fill-color': '#8a2be2',
      'fill-opacity': 0.4,
    },
    filter: ['all', ['==', 'system_number', '13']],
    'source-layer': 'add_system_number',
  });

  map.addLayer({
    id: 'boundary_outline',
    type: 'line',
    source: 'boundary',
    minzoom: 0,
    maxzoom: 22,
    paint: {
      'line-color': '#000',
      'line-width': 1,
    },
    'source-layer': 'add_system_number',
  });
};

export const addMarker = async (
  fgbUrl: string,
  e: maplibregl.MapMouseEvent & {
    features?: maplibregl.MapboxGeoJSONFeature[];
  } & maplibregl.EventData,
  map: maplibregl.Map
) => {
  if (marker) marker.remove();

  const townAreaName = await getTownName(fgbUrl, e.lngLat);
  const systemNumber = await getSystemNumber(fgbUrl, e.lngLat);

  popup = new maplibregl.Popup({ offset: 25 })
    .setLngLat(e.lngLat)
    .setHTML(`<h1>住所：${townAreaName}<h1><h1>座標系：${systemNumber}<h1>`)
    .addTo(map);
  marker = new maplibregl.Marker().setLngLat(e.lngLat).addTo(map);
};

function getParams(lngLat: maplibregl.LngLat) {
  const { lng, lat } = lngLat;

  const target = point([lng, lat]);
  const buffer = 0.00000000001;
  const rect = { minX: lng - buffer, maxX: lng + buffer, minY: lat - buffer, maxY: lat + buffer };
  return { target, rect };
}

const getTownName = async (fgbUrl: string, lngLat: maplibregl.LngLat) => {
  const { target, rect } = getParams(lngLat);

  // @ts-ignore
  for await (const feature of geojson.deserialize(fgbUrl, rect)) {
    const prop = feature.properties;
    const pref = prop['PREF_NAME'] ? prop['PREF_NAME'] : '';
    const gst = prop['GST_NAME'] ? prop['GST_NAME'] : '';
    const css = prop['CSS_NAME'] ? prop['CSS_NAME'] : '';
    const s = prop['S_NAME'] ? prop['S_NAME'] : '';
    const townAreaName = pref + gst + css + s;

    const geom = polygon(feature.geometry.coordinates);

    const intersects = booleanIntersects(target, geom);

    if (intersects) return townAreaName;
  }
  return 'データが存在しません';
};

const getSystemNumber = async (fgbUrl: string, lngLat: maplibregl.LngLat) => {
  const { target, rect } = getParams(lngLat);

  // @ts-ignore
  for await (const feature of geojson.deserialize(fgbUrl, rect)) {
    const prop = feature.properties;

    const systemNumber = prop['system_number'] ? prop['system_number'] : '';

    const geom = polygon(feature.geometry.coordinates);

    const intersects = booleanIntersects(target, geom);

    if (intersects) return systemNumber;
  }
  return 'データが存在しません';
};
