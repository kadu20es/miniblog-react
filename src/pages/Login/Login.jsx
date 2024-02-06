import React from 'react'
import { useState, useEffect } from 'react'

import './Login.css'
import { useAuthentication } from '../../hooks/useAuthentication'

const Login = () => {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    const { login, error: authError, loading } = useAuthentication()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const user = {
            email,
            password
        }

        const res = await login(user)

        console.log(res)
    }


    useEffect(() => {
        authError ? setError(authError) : setError("")
    }, [authError])

    return (
        <div className="login">
            <h1>Entrar</h1>
            <p>Faça o login para poder utilizar o Mini Blog</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Usuário:</span>
                    <input
                        type="text"
                        name='email'
                        required
                        placeholder='Digite seu email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    <span>Senha:</span>
                    <input
                        type='password'
                        name='password'
                        required
                        placeholder='Digite sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                {!email && !password && <button disabled>Entrar</button>}
                {loading && <button className='btn' disabled>Aguarde...</button>}
                {!loading && <button className='btn'>Entrar</button>}
                {error && <p className='error'>{error}</p>}


            </form>
        </div>
  )
}

export default Login