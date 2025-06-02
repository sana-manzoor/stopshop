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
import Allprod from './components/Allprod'
import Getprod from './components/Getprod'
import Viewprod from './components/Viewprod'

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
        <Route path='viewprod' element={<Viewprod/>} />


      </Routes>
      <Footer />
    </>
  )
}

export default App
