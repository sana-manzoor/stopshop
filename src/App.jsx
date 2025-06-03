import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homes from './Pages/Homes'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './Pages/Login'
import Wish from './Pages/Wish'
import Cart from './Pages/Cart'
import Allprod from './components/Allprod'
import Getprod from './components/Getprod'
import Viewprod from './components/Viewprod'
import ProtectedRoute from './components/ProtectedRoute'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function App() {
   const location = useLocation();

  return (
    <>
    {location.pathname !== '/' && <Header />}
      {/* Your Routes */}
      
      <Routes>
        <Route path='hom'  element={
          <ProtectedRoute>
            <Homes/>
            </ProtectedRoute>
          } />
        <Route path='/' element={<Login />} />
        <Route path='wish'  element={
            <ProtectedRoute>
            <Wish/>
            </ProtectedRoute>
          } />
        <Route path='cart' element={
            <ProtectedRoute>
            <Cart/>
            </ProtectedRoute>
          } />
        
        <Route path='allprod'  element={
            <ProtectedRoute>
            <Allprod/>
            </ProtectedRoute>
          } />
        <Route path='getprod'  element={
            <ProtectedRoute>
            <Getprod/>
            </ProtectedRoute>
          } />
        <Route path='viewprod'  element={
            <ProtectedRoute>
            <Viewprod/>
            </ProtectedRoute>
          } />

           <Route path="*" element={<Navigate to="/" />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
