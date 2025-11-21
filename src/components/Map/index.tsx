import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  latitude: number;
  longitude: number;
  name: string;
}


const Map = ({ latitude, longitude, name }: MapProps) => {
  const position: [number, number] = [latitude, longitude];

  return (
    <MapContainer  {...({ center: position, zoom: 15, style: { height: "280px", width: "100%" } } as any)}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
