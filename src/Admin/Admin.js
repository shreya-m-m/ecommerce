import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Dashboard from './components/Dashboard';
import CreateProductForm from './components/CreateProductForm';
import ProductTable from './components/ProductTable';
import OrdersTable from './components/OrdersTable';
import CustomerTable from './components/CustomerTable';
import AdminDashboard from './components/AdminDashboard';
import AccountDetails from './components/AccountDetails';
import AboutUs from '../About';

// Menu items for the sidebar
const menu = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <InventoryIcon /> },
  { name: "Customers", path: "/admin/customers", icon: <PeopleIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <ShoppingCartIcon /> },
  { name: "Add Products", path: "/admin/product", icon: <AddBoxIcon /> },
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  // Sidebar content
  const drawer = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: '#F2F3F4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '& .MuiListItemButton-root': {
          '&:hover': {
            backgroundColor: '#fff',
          },
        },
      }}
    >
      <List>
        {menu.map((item) => (
          <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem disablePadding onClick={() => navigate('/admin/account')}>
          <ListItemButton>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {/* Navbar */}
      <div className="w-full fixed top-0">
        <ResponsiveAppBar />
      
      </div>
      

      <div 
 style={{ display: 'flex', marginTop: '70px', marginBottom: '20px'}}>
        {/* Sidebar */}
        <div style={{ width: '250px', minWidth: '250px', borderRight: '1px solid #ddd' }}>
          {drawer}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px', marginLeft: '6px' }}>
          {/* Routing for Admin Pages */}
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/product" element={<CreateProductForm />} />
            <Route path="/products" element={<ProductTable />} />
            <Route path="/orders" element={<OrdersTable />} />
            <Route path="/customers" element={<CustomerTable />} />
            <Route path="/account" element={<AccountDetails />} />
            <Route path="/about" element={<AboutUs />} /> {/* Ensure AboutUs is part of routes */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
