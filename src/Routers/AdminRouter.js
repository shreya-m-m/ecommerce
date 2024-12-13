import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../Admin/Admin'
import ProductTable from '../Admin/components/ProductTable'
import AdminDashboard from '../Admin/components/AdminDashboard'
import CreateProductForm from '../Admin/components/CreateProductForm'
import OrdersTable from '../Admin/components/OrdersTable'
import CustomerTable from '../Admin/components/CustomerTable'
import AccountDetails from '../Admin/components/AccountDetails'


const AdminRouter = () => {
    return (
        <div>

            <Routes>
                <Route path='/*' element={<Admin />}></Route>
                {/* <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/product" element={<CreateProductForm />} />
                <Route path="/products" element={<ProductTable />} />
                <Route path="/orders" element={<OrdersTable />} />
                <Route path="/customers" element={<CustomerTable />} />
                <Route path="/account" element={<AccountDetails />} /> */}
            </Routes>

        </div>


    )
}
export default AdminRouter