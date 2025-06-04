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
import ProtectedRoute from './components/ProtectedRoute'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ToastContainer,Bounce } from 'react-toastify'
import View from './components/View'

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Header />}
      {/* Your Routes */}

      <Routes >
        <Route path='hom' element={
          <ProtectedRoute>
            <Homes />
          </ProtectedRoute>
        } />
        <Route path='/' element={<Login />} />
        <Route path='wish' element={
          <ProtectedRoute>
            <Wish />
          </ProtectedRoute>
        } />
        <Route path='cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />

        <Route path='allprod' element={
          <ProtectedRoute>
            <Allprod  key={location.key} />
          </ProtectedRoute>
        } />
        <Route path='getprod' element={
          <ProtectedRoute>
            <Getprod />
          </ProtectedRoute>
        } />

            <Route path='view/:pidd' element={
          <ProtectedRoute>
            <View />
          </ProtectedRoute>
        } />


        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
