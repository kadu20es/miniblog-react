import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import CreatePost from './pages/CreatePost/CreatePost'
import DashBoard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'

import './App.css'
import About from './pages/About/About'
import Formulario from './pages/Register/Formulario'
import Formulario2 from './pages/Register/Formulario2'
import Formulario3 from './pages/Register/Formulario3'
import Formulario4 from './pages/Register/Formulario4'
import Search from './pages/Search/Search'
import Post from './pages/Post/Post'



const App = () => {

  const [ user, setUser ] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if (loadingUser) return <p>Carregando...</p>


  return (
   <AuthProvider value={{ user }}>
     <BrowserRouter>
        <Navbar />
            <div className="container">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/cadastrar' element={<Formulario />} />
                    <Route path='/cadastrarProduto' element={!user ? <Login /> : <Navigate to="/Formulario2" />} />
                    <Route path='/cadastrarCategoria' element={!user ? <Login /> : <Navigate to="/Formulario3" />} />
                    <Route path='/cadastrarAny' element={!user ? <Login /> : <Navigate to="/Formulario4" />} />
                    <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/" />} />
                    <Route path='/dashboard' element={user ? <DashBoard /> : <Navigate to="/" /> } />
                    <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/posts/:id' element={<Post />} />
                    <Route path='/sobre' element={<About />} />
                </Routes>
            </div>
        <Footer />
    </BrowserRouter>
   </AuthProvider>
  )
}

export default App