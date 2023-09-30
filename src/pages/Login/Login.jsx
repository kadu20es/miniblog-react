import { useState } from 'react';
import styles from './Login.module.css';
import { useAuthentication } from '../../hooks/useAuthentication';


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("")
    const user = {
      email,
      password
    }

    const res = await login(user);

  }



  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para utilizar seu espaço</p>

      <form onSubmit={handleSubmit}>

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


        {!loading && <button className='btn'>Entrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {authError && <p className='error'>{authError}</p>}

      </form>

    </div>
  )
}

export default Login