import './main.css';
import React from 'react';
import ReactDOM from "react-dom/client"

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

import { ThemeProvider } from "@material-tailwind/react";

import Home from './components/common/Home'
import HostelPage from './components/hostels/HostelPage';
import FlatPage from './components/flats/FlatPage';
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Prediction from './components/common/Prediction'
import BasicPage from "./components/common/BasicPage"
import HostelsListing from './components/hostels/HostelsListing';
import FlatsListing from './components/flats/FlatsListing';
import NotFoundPage from './components/common/404';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Wishlist from './components/common/Wishlist';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<BasicPage />}>
    <Route index element={<Home />} />
    <Route path="/prediction" element={<Prediction />} />

    <Route path="/hostels" element={<HostelsListing />} />
    <Route path="/hostels/:id" element={<HostelPage />} />
    <Route path="/flats" element={<FlatsListing />} />
    <Route path="/flats/:id" element={<FlatPage />} />

    <Route path="/login" element={<Login />} />
    <Route path="/login/forgot-password" element={<ForgotPassword />} />
    <Route path="/signup" element={<Signup />} />

    <Route path="/user/reset-password" element={<ResetPassword />} />
    <Route path="/user/wishlist" element={<Wishlist />} />

    <Route path="*" element={<NotFoundPage />} />
  </Route>
))

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
