import { useState, useEffect } from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // controla a autenticação do usuário

// hooks
import { useAuthentication } from './hooks/useAuthentication';

// pages
import Home from './pages/home/Home';
import About from './pages/about/About';

// context
import { AuthProvider } from './context/AuthContext';

// components
import './App.css'
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/createPost/CreatePost';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  const [user, setUser] = useState(undefined) // sem usuário na sessão inicial
  const {auth} = useAuthentication()

  // atribui ao usuário o valor comparado com undefined
  // se for undefined, está carregamento de alguma maneira
  // então faz um return para que não exiba nada que não deve
  const loadingUser = user === undefined

  /* monitora o estado do usuário (logado/deslogado) */
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if (loadingUser) {
    return <p>Caregando...</p>
  }

  return (
    <div className="App">
     <AuthProvider value={{user}}>
      <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
              <Route path="/about" element={<About />}/>

              {/* se o usuário não estiver autenticado, envia para a página de login, se estiver, home*/}
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
     </AuthProvider>
    </div>

  )
}

export default App
