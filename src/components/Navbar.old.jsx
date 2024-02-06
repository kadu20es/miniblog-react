import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
        <NavLink to="/" className='brand'>
            Mini <span>Form</span>
        </NavLink>

        <ul className='links_list'>
            <li>
                <NavLink to="/">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/cadastrar">
                    Cadastrar
                </NavLink>
            </li>
            <li>
                <NavLink to="/cadastrarProduto">
                    Cadastrar Produto
                </NavLink>
            </li>
            <li>
                <NavLink to="/cadastrarCategoria">
                    Cadastrar Categoria
                </NavLink>
            </li>
            <li>
                <NavLink to="/cadasrtrarAny">
                    Cadastrar Any
                </NavLink>
            </li>
            <li>
                <NavLink to="/sobre">
                    Sobre
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar