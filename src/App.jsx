import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homes from './Pages/Homes'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './Pages/Login'
import Wish from './Pages/Wish'
import Cart from './Pages/Cart'
import View from './Pages/View'
import Scroll from './Pages/Scroll'
import Allprod from './components/Allprod'
import Getprod from './components/Getprod'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='hom' element={<Homes />} />
        <Route path='/' element={<Login />} />
        <Route path='wish' element={<Wish />} />
        <Route path='cart' element={<Cart />} />
        <Route path='view' element={<View/>} />
        <Route path='allprod' element={<Allprod/>} />
        <Route path='getprod' element={<Getprod/>} />




      </Routes>
      <Footer />
    </>
  )
}

export default App
