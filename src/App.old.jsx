import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import About from './pages/About/About'
import Home from './pages/Home/Home'
import Formulario from './pages/Register/Formulario'

import './App.css'
import Formulario2 from './pages/Register/Formulario2'
import Formulario3 from './pages/Register/Formulario3'
import Formulario4 from './pages/Register/Formulario4'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cadastrar" element={<Formulario />}/>
          <Route path="/cadastrarProduto" element={<Formulario2 />}/>
          <Route path="/cadastrarCategoria" element={<Formulario3 />}/>
          <Route path="/cadasrtrarAny" element={<Formulario4 />}/>
          <Route path="/sobre" element={<About />}/>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App