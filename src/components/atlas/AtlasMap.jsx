import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const IMAGERY =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

const EMBER = "#e8834a";

function Camera({ camera }) {
  const map = useMap();
  useEffect(() => {
    if (!camera || !camera.key) return;
    map.flyTo([camera.lat, camera.lng], camera.zoom, {
      duration: camera.duration ?? 2.3,
      easeLinearity: 0.22,
      noMoveStart: false,
    });
  }, [camera?.key]);
  return null;
}

export default function AtlasMap({ places, selected, camera, onSelect }) {
  return (
    <MapContainer
      center={[57.45, -153.3]}
      zoom={7.2}
      zoomControl={false}
      attributionControl={false}
      className="absolute inset-0 z-0 h-full w-full"
      maxZoom={17}
      minZoom={5}
    >
      <TileLayer url={IMAGERY} maxZoom={17} />
      <Camera camera={camera} />

      {places.map((p) => {
        const active = selected?.id === p.id;
        return (
          <CircleMarker
            key={p.id}
            center={[p.lat, p.lng]}
            radius={active ? 6.5 : 3.6}
            pathOptions={{
              color: EMBER,
              weight: active ? 2 : 1,
              opacity: active ? 1 : 0.75,
              fillColor: EMBER,
              fillOpacity: active ? 0.95 : 0.45,
            }}
            eventHandlers={{ click: () => onSelect(p) }}
          >
            <Tooltip direction="top" offset={[0, -7]} className="atlas-tip" opacity={1}>
              {p.alutiiq}
              {p.english ? ` · ${p.english}` : ""}
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
