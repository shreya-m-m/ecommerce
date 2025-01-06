import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../customer/pages/homePage/HomePage'
import Cart from '../customer/components/cart/Cart'
import Footer from '../customer/components/footer/Footer'
import Navigation from '../customer/components/navigation/Navigation'
import Product from '../customer/components/product/Product'
import ProductDetails from '../customer/components/productDetails/ProductDetails'
import Wishlist from '../customer/components/cart/Wishlist'
import Checkout from '../customer/components/checkout/Checkout'
import OrderSummary from '../customer/components/checkout/OrderSummary'
import Order from '../customer/components/Order/Order'
import OrderDetails from '../customer/components/Order/OrderDetails'
import PaymentSuccess from '../customer/components/Payment/PaymentSuccess'
import AccountDetails from '../Admin/components/AccountDetails'
import AboutUs from '../About'
import HomeSetionCard from '../customer/components/homeSectionCard/HomeSectionCard'
import { women_dress } from '../Data/clothing/women_dress'
import Store from '../Store'
const CustomerRouter = () => {
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <Routes>
                <Route path='/login' element={<HomePage />}></Route>
                <Route path='/register' element={<HomePage />}></Route>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/about' element={<AboutUs />}></Route>
                <Route path="/store"
                    element={
                      <Store />
                    } ></Route>
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='/wishlist' element={<Wishlist />}></Route>
                <Route path='/users/profile' element={<AccountDetails />}></Route>
                <Route path='/:lavelOne/:lavelTwo/:lavelThree' element={<Product />} />
                <Route path='/product/:productId' element={<ProductDetails />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/account/order' element={<Order />} />
                {/* <Route path='/account/order/:orderId' element={<OrderDetails />} /> */}
                <Route path='/payment/:orderId' element={<PaymentSuccess />} />


                {/*<Checkout />*/}
                {/*<Order /> */}
                {/*<OrderDetails />*/}
            </Routes>
            <div className='mt-80'>
                <Footer />
            </div>
        </div>


    )
}
export default CustomerRouter
