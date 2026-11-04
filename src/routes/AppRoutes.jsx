
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";

import Home from "../pages/Home.jsx";
import Shop from "../pages/Shop.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Cart from "../pages/Cart.jsx";
import Contact from "../pages/Contact.jsx";
import Checkout from "../pages/Checkout.jsx";
import OrderSuccess from "../pages/OrderSuccess.jsx";
import MyOrders from "../pages/MyOrders.jsx";
import MyProfile from "../pages/MyProfile.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Categories from "../pages/Categories.jsx";

import ProtectedRoute from "../components/common/ProtectedRoute.jsx";

function AppRoutes() {
  return (
    <>
     <Navbar />
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/all" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/contact" element={<Contact />} />

      {/* Authentication Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Pages */}
      <Route path="/cart" element={
        <ProtectedRoute><Cart /></ProtectedRoute>
      } />

      <Route path="/checkout" element={
        <ProtectedRoute><Checkout /></ProtectedRoute>
      } />

      <Route path="/my-orders" element={
        <ProtectedRoute><MyOrders /></ProtectedRoute>
      } />

      <Route path="/my-profile" element={
        <ProtectedRoute><MyProfile /></ProtectedRoute>
      } />

      <Route path="/order-success" element={
        <ProtectedRoute><OrderSuccess /></ProtectedRoute>
      } />

      <Route path="/categories" element={<Categories />} />
    </Routes>
      <Footer />
    </>
  );
}

export default AppRoutes;
