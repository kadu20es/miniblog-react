import React, { useState, useEffect } from 'react'
import './Formulario.css'
import { useAuthentication } from '../../hooks/useAuthentication'

const Formulario = () => {
    const [ displayName, setDisplayName ] = useState("")
    const [ secondName, setSecondName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ passwordConfirm, setPasswordConfirm ] = useState("")
    const [ error, setError ] = useState("")

    const { createUser, error: authError, loading } = useAuthentication()


    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")

        const user = {
            displayName,
            email,
            password
        }

        if (passwordConfirm !== password) {
            setError("As senhas precisam ser iguais")
            return
        }

        const res = await createUser(user)

        console.log(res)

    }

    useEffect(() => {
        //if (authError) setError(authError)
        authError ? setError(authError) : setError("")
        console.log(error)
    }, [authError])

    return (
        <div className='register'>
            <h1>cadastre-se para postar</h1>
            <p>Crie seu perfil e compartilhe suas histórias</p>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input
                        type="text"
                        name="displayName"
                        required
                        placeholder="Seu nome"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </label>

                <label>
                    <span>Sobrenome</span>
                    <input
                        type="text"
                        name="secondName"
                        required
                        placeholder="Seu sobrenome"
                        value={secondName}
                        onChange={(e) => setSecondName(e.target.value)}
                    />
                </label>

                <label>
                    <span>Email:</span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    <span>Senha:</span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Crie uma senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <label>
                    <span>Repita a senha:</span>
                    <input
                        type="password"
                        name="passwordConfirm"
                        required
                        placeholder="Repita sua senha"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </label>
                {!loading && <button className='btn'>Cadastrar</button>}
                {loading && <button className='btn' disabled>Aguarde...</button>}
                {error && <p className='error'>{error}</p>}
            </form>

        </div>
    )
}

export default Formulario