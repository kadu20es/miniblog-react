import React from 'react'
import { NavLink } from 'react-router-dom'

import { useAuthentication } from '../hooks/useAuthentication'
import { useAuthValue } from '../context/authContext'

import LogoutIcon from '../assets/images/log-out.png'

import './Navbar.css'

const Navbar = () => {
    const { user } = useAuthValue() // <---- início do controle de exibição de itens para usuários logados
    const { logout } = useAuthentication()

  return (
    <nav className="navbar">
        <NavLink to='/' className={({isActive}) => (isActive ? 'brand' : 'brand')}>
            Mini <span>FORM</span>
        </NavLink>

        <ul className="links_list">
            <li>
                <NavLink to='/'>
                    Home
                </NavLink>
            </li>

            {/* só é exibido para usuários que não estão logados */}
            {!user &&

                <>
                    <li>
                        <NavLink to='/cadastrar' className={({ isActive }) => (isActive ? 'active' : '')}>
                            Cadastrar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/login' className={({ isActive }) => (isActive ? 'active' : '')}>
                            Entrar
                        </NavLink>
                    </li>
                </>
            }

            {/* só é exibido para usuários logados */}
            {user &&

                <>
                    <li>
                        <NavLink to='/posts/create' className={({ isActive }) => (isActive ? 'active' : '')}>
                            Novo post
                        </NavLink>
                    </li>
                    {/*}<li>
                        <NavLink to='/cadastrarProduto' className={({ isActive }) => (isActive ? 'active' : '')}>
                            Cadastrar produto
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/cadastrarCategoria' className={({ isActive }) => (isActive ? 'active' : '')}>
                            Cadastrar categoria
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/cadastrarAny' className={({ isActive }) => (isActive ? 'active' : '')}>
                            Cadastrar any
                        </NavLink>
                    </li> */}

                    <li>
                        <NavLink to='/dashboard' className={({ isActive }) => (isActive ? 'active' : '')}>
                            Dashboard
                        </NavLink>
                    </li>
                </>

            }




            <li>
                <NavLink to='/sobre'>
                    Sobre
                </NavLink>
            </li>

            {user &&

                <li>
                    <NavLink to='' className={({ isActive }) => (isActive ? '' : '')}>
                        <img src={LogoutIcon} alt="sair" className='icon' onClick={logout}/>
                    </NavLink>
                </li>
            }
        </ul>
    </nav>
  )
}

export default Navbar