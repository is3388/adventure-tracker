import { createContext, useEffect, useReducer, useCallback } from 'react';

// use context api and useReducer
const CitiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

// reducer must be a pure function not async function
function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  ); // destructure state
  /*const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({}) */

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log(data);
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        dispatch({ type: 'rejected', payload: 'Error fetching data...' });
      }
    }
    fetchCities();
  }, []);
  // useCallback to turn this function into memoized function to prevent rerendering for City component
  const getCity = useCallback(async function getCity(id) { // id from component UI / URL is a string
    if (Number(id) === currentCity.id) return;
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch {
      dispatch({ type: 'rejected', payload: 'Error fetching the city...' });
    }
  },[currentCity.id])

  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      // sync the UI state with the remote state as adding a new entry to remote state
      //setCities((cities) => [...cities, data])
      dispatch({ type: 'city/created', payload: data });
    } catch {
      dispatch({ type: 'rejected', payload: 'Error creating the city...' });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      // sync the UI state with the remote state as adding a new entry to remote state
      if (res) dispatch({ type: 'city/deleted', payload: id });
    } catch {
      dispatch({ type: 'rejected', payload: 'Error deleting the city...' });
    }
  }
  // not passing dispatch together with all the state as one of the value for component to update the state
  // because we deal with async data, so we'd rather using dispatch inside event handler function and then pass to the context
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
