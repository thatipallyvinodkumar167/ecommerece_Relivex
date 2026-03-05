import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/Theme';
import Layout from './admin/api/components/Layout/Layout';
import Dashboard from './admin/pages/Dashboard/Dashboard';
import Products from './admin/pages/Products/Products';
import Categories from './admin/pages/Categories/Categories';
import Vendors from './admin/pages/Vendors/Vendors';
import AdminOrders from './admin/pages/Orders/Orders';
import Customers from './admin/pages/Customers/Customers';
import CustomerDetails from './admin/pages/Customers/CustomerDetails';
import Inventory from './admin/pages/Inventory/Inventory';
import Payments from './admin/pages/Payments/Payments';
import Coupons from './admin/pages/Coupons/Coupons';
import Reports from './admin/pages/Reports/Reports';
import Reviews from './admin/pages/Reviews/Reviews';
import Notifications from './admin/pages/Notifications/Notifications';
import Settings from './admin/pages/Settings/Settings';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { NotificationProvider } from './admin/context/NotificationContext';
import ProtectedRoute from './admin/routes/ProtectedRoute';

// User Pages
import UserLayout from './user/components/Layout/UserLayout';
import Home from './user/pages/Home';
import Cart from './user/pages/Cart';
import Checkout from './user/pages/Checkout';
import UserOrders from './user/pages/Orders';
import Profile from './user/pages/Profile';
import UserRegister from './user/pages/Auth/UserRegister';
import Login from './admin/pages/Auth/Login'; // Shared Login
import Register from './admin/pages/Auth/Register'; // Admin Register
import Unauthorized from './admin/pages/Auth/Unauthorized';

// Vendor Pages
import VendorLayout from './vendor/components/VendorLayout';
import VendorDashboard from './vendor/pages/VendorDashboard';
import VendorProducts from './vendor/pages/VendorProducts';
import VendorOrders from './vendor/pages/VendorOrders';
import VendorReviews from './vendor/pages/VendorReviews';
import VendorEarnings from './vendor/pages/VendorEarnings';
import VendorProfile from './vendor/pages/VendorProfile';
import VendorLogin from './vendor/pages/VendorLogin';
import VendorRegister from './vendor/pages/VendorRegister';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <NotificationProvider>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<UserRegister />} />
                  <Route path="/admin/register" element={<Register />} />
                  <Route path="/vendor/login" element={<VendorLogin />} />
                  <Route path="/vendor/register" element={<VendorRegister />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />

                  {/* Vendor Routes */}
                  <Route element={<ProtectedRoute allowedRoles={['Vendor']} />}>
                    <Route path="/vendor" element={<VendorLayout />}>
                      <Route index element={<Navigate to="/vendor/dashboard" replace />} />
                      <Route path="dashboard" element={<VendorDashboard />} />
                      <Route path="products" element={<VendorProducts />} />
                      <Route path="orders" element={<VendorOrders />} />
                      <Route path="reviews" element={<VendorReviews />} />
                      <Route path="earnings" element={<VendorEarnings />} />
                      <Route path="profile" element={<VendorProfile />} />
                    </Route>
                  </Route>

                  {/* User Routes */}
                  <Route path="/" element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="orders" element={<UserOrders />} />
                    <Route path="profile" element={<Profile />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
                    <Route path="/admin" element={<Layout />}>
                      <Route index element={<Navigate to="/admin/dashboard" replace />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="products" element={<Products />} />
                      <Route path="categories" element={<Categories />} />
                      <Route path="vendors" element={<Vendors />} />
                      <Route path="orders" element={<AdminOrders />} />
                      <Route path="customers" element={<Customers />} />
                      <Route path="customers/:id" element={<CustomerDetails />} />
                      <Route path="inventory" element={<Inventory />} />
                      <Route path="payments" element={<Payments />} />
                      <Route path="coupons" element={<Coupons />} />
                      <Route path="reviews" element={<Reviews />} />
                      <Route path="reports" element={<Reports />} />
                      <Route path="notifications" element={<Notifications />} />
                      <Route path="settings" element={<Settings />} />
                    </Route>
                  </Route>

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              </NotificationProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
