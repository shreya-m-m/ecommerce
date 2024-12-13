import React from 'react';
import { Grid } from '@mui/material';
import Achivement from './Achivement';
import MonthlyOverview from './MonthlyOverview';
import WeeklyOverview from './WeeklyOverview';
import TotalEarning from './TotalEarning';
import DepositWithdraw from './DepositWithdraw';
import SalesByCountries from './SalesByCountries';

import { Route, Routes, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import CreateProductForm from './CreateProductForm';
import ProductTable from './ProductTable';
import OrdersTable from './OrdersTable';
import CustomerTable from './CustomerTable';
import AccountDetails from './AccountDetails';

const AdminDashboard = () => {

  return (
    <div style={{ backgroundColor: '#F2F3F4', marginRight:'10px', marginLeft:'10px'}}>
        {/* Grid Layout for Widgets */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} className="shadow-lg">
            <Achivement />
          </Grid>
          <Grid item xs={12} md={7} className="shadow-lg">
            <MonthlyOverview />
          </Grid>
          <Grid item xs={12} md={6} className="shadow-lg">
            <WeeklyOverview />
          </Grid>
          <Grid item xs={12} md={6} className="shadow-lg">
            <TotalEarning />
          </Grid>
          <Grid item xs={12} md={6} className="shadow-lg">
            <DepositWithdraw />
          </Grid>
          <Grid item xs={12} md={6} className="shadow-lg">
            <SalesByCountries />
          </Grid>
        </Grid>
   
    </div>
  );
};

export default AdminDashboard;
