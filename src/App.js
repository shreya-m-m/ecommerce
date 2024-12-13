
import './App.css';
import Navigation from './customer/components/navigation/Navigation';
import HomePage from './customer/pages/homePage/HomePage';
import Footer from './customer/components/footer/Footer';
import Product from './customer/components/product/Product';
import ProductDetails from './customer/components/productDetails/ProductDetails';
import Cart from './customer/components/cart/Cart';
import Checkout from './customer/components/checkout/Checkout';
import Order from './customer/components/Order/Order';
import OrderDetails from './customer/components/Order/OrderDetails';
import { Route, Routes } from 'react-router-dom';
import CustomerRouter from './Routers/CustomerRouter';
import AdminRouter from './Routers/AdminRouter';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<CustomerRouter />} > </Route>
        <Route path='/admin/*' element={<AdminRouter />} > 
        </Route>
      </Routes>
      <div>
       
        <div>
         
        </div>
    
      </div>
      
    </div>
  );
}

export default App;
