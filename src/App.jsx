import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Navigate same as redirect

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { CitiesProvider } from './contexts/CitiesContext';

// create nested routes for cities, countries and form and URL: /app/cities, /app/countries, /app/form
// create a default route for /app or / by putting index property
function App() {
  

  return (
    <CitiesProvider>
    <BrowserRouter>
      <Routes>      
          {/*<Route path='/' element={<Homepage />} />
          <Navigate to='cities' same as redirect
          and replace for the go back */}
          <Route index element={<Homepage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='login' element={<Login />} />
          <Route path='app' element={<AppLayout />}>
            <Route index element={<Navigate to='cities' replace />} />
            <Route path='cities' element={<CityList />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='countries' element={<CountryList />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />        
          {/* * means none of the above path match*/}          
      </Routes>
    </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
