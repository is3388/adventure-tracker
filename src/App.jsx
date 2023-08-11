import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';

// create nested routes for cities, countries and form and URL: /app/cities, /app/countries, /app/form
// create a default route for /app or / by putting index property

function App() {
  return (
    <BrowserRouter>
      <Routes>      
          {/*<Route path='/' element={<Homepage />} />*/}
          <Route index element={<Homepage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='login' element={<Login />} />
          <Route path='app' element={<AppLayout />}>
            <Route index element={<p>List of cities</p>} />
            <Route path='cities' element={<p>List of cities</p>} />
            <Route path='countries' element={<p>List of countries</p>} />
            <Route path='form' element={<p>Form</p>} />
          </Route>
          <Route path='*' element={<PageNotFound />} />        
          {/* * means none of the above path match*/}          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
