import { useAuthentication } from '../../hooks/useAuthentication';
import styles from './Register.module.css';

import { useState, useEffect } from 'react';

const Register = () => {

  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")


  // dados vem do hook useAuthentication
  const {createUser, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password
    }

    if (password != confirmPassword){
      setError("As senhas precisam ser iguais")
      return
    }

    const res = await createUser(user);
    console.log(user)
  }

  // monitora se o authError mudou
  useEffect(() => {
    if (authError) {
      // substitui o erro do componente do formulário
      // pelo erro retornoado pelo firebase através do hook
      // useAuthentication
      setError(authError)
    }

  },[authError])


  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie uma conta e compartilhe suas histórias com o mundo!</p>

      <form onSubmit={handleSubmit}>

        <label>
          <span>Nome</span>
          <input
            type="text"
            name="displayName"
            placeholder='Digite seu nome'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required />
        </label>

        <label>
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            placeholder='Digite seu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </label>

        <label>
          <span>Senha</span>
          <input
            type="password"
            name="password"
            placeholder='Insira sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </label>

        <label>
          <span>Confirme sua senha</span>
          <input
            type="password"
            name="conformPassword"
            placeholder='Confirme sua senha'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required />
        </label>
        {!loading && <button className='btn'>Cadastrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}

      </form>

    </div>
  )
}

export default Register