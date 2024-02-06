import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

import "./Home.css"
import PostDetail from '../../components/PostDetail'

const Home = () => {
  const [ query, setQuery ] = useState()
  //const [ posts ] = useState([]);
  const { documents: posts, loading } = useFetchDocuments("posts")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(query) {
      return navigate(`/search?q=${query}`)
    }

  }

  const handleClick = (id) => {
    console.log('clicou' + id)
  }

  return (
    <div className='home'>
      <h1>Veja nossos posts mais recentes</h1>

      <form onSubmit={handleSubmit} className='search_form'>
        <input type="text" placeholder='Ou busque por tags...' onChange={(e) => setQuery(e.target.value)}/>
        <button className='btn btn-dark'>Pesquisar</button>
      </form>

      <div className='posts'>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) =>
            <PostDetail post={post} key={post.id}/>
        )}
        {posts && posts.length === 0 && (
          <div className="noPosts">
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className='btn'>Criar primeiro post</Link>
          </div>
        )}
      </div>

    </div>
  )
}

export default Home