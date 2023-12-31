import styles from './Map.module.css';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useState, useEffect } from 'react';
import { useCities } from '../hooks/useCities';
import { useGeolocation } from '../hooks/useGeolocation';
import { useUrlPosition } from '../hooks/useUrlPosition';

import Button from './Button';

const flagemojiToPNG = (flag) => {
  // Convert flag emoji to corresponding country code
  const countryCode = [...flag]
    .map((char) =>
      String.fromCharCode(char.codePointAt() - 127397).toLowerCase()
    )
    .join("");

  // Return an image element with the country's flag
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

export default function Map() {
  //const [searchParams] = useSearchParams(); // query string and update query string globally move to useUrlPosition
  //const navigate = useNavigate(); // programmatic navigate to other page instead of using Link or NavLink
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    position: geolocationPosition,
    isLoading: isLoadingPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition()
  //const mapLat = searchParams.get('lat'); move to custom hook useUrlPosition
  //const mapLng = searchParams.get('lng');

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png' 
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
            <span>{city.emoji ? flagemojiToPNG(city.emoji) : ""}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// custom component that shows the position of the city selected on the map
function ChangeCenter({ position }) {
  //if (!position[0] || !position[1]) return null;

  const map = useMap(); // react-leaflet's hook to get the current instance of the map that's currently displayed
  //map.closePopup();
  map.setView(position);
  return null; // since this is component needs to return some jsx
}

// custom component that the form shows when click on anywhere on the map
function DetectClick() {
  const navigate = useNavigate();
  // custom hook from leaflet
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
