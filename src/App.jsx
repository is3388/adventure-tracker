import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Navigate same as redirect
import { lazy, Suspense } from 'react' // buit-in component that allow components to be wait for something to hanppen
/*import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout'; 
import Login from './pages/Login';*/
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage'
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

// use lazy loading to split the code into separate chunks by tools like webpack or vite at page level (route level)
// for improving the JS bundle file size for deployment in PROD
// load the component as we need
const Homepage = lazy(() => import('./pages/Homepage'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Login = lazy(() => import('./pages/Login'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

// create nested routes for cities, countries and form and URL: /app/cities, /app/countries, /app/form
// create a default route for /app or / by putting index property
// Suspense fallback prop is to show the spinner while the supsensed components is loading
function App() {
   return (
    <AuthProvider>
    <CitiesProvider>
    <BrowserRouter>
    <Suspense fallback={<SpinnerFullPage />}>
      <Routes>      
          {/*<Route path='/' element={<Homepage />} />
          <Navigate to='cities' same as redirect
          and replace for the go back */}
          <Route index element={<Homepage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='login' element={<Login />} />
          <Route path='app' element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to='cities' replace />} />
            <Route path='cities' element={<CityList />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='countries' element={<CountryList />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />        
          {/* * means none of the above path match*/}          
      </Routes>
      </Suspense>
    </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
