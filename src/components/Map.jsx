import styles from './Map.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams() // query string and update query string globally
  const nagivate = useNavigate() // programmatic navigate to other page instead of using Link or NavLink
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
 
  return <div className={styles.mapContainer} onClick={() => nagivate('form')}>
    <h1>
      Map
    </h1>
    <h2>
      Position: {lat}, {lng}
    </h2>
    <button className='btn' onClick={() => setSearchParams({lat: 30, lng: 60})}>Change Position</button>
  </div>
}