import React from 'react'
import { Link } from 'react-router-dom'

// hooks
import { useAuthValue } from '../../context/authContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments' // traz os posts do usuário
import { useDeleteDocument  } from '../../hooks/useDeleteDocument'

import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuthValue()
  const uid = user.uid
  const { deleteDocument } = useDeleteDocument("posts")

  // posts do usuário ->  docCollection, search = null, uid
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid)


  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className='dashboard'>
        <h2>Dashboard</h2>
        <p>Gerencie os seus posts</p>
        {posts && posts.length === 0 ? (
          <div className="noposts">
            <p>Não foram encontrados posts</p>
            <Link to='/posts/create' className='btn'>Criar primeiro post</Link>
          </div>
        ) : (
          <>
            <div className="post_header">
              <span>Titulo</span>
              <span>Ações</span>
            </div>
            {posts && posts.map((post) => (
              <div className="post_row" key={post.id}>
                <h3>{post.title}</h3>
                <div className="">
                  <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ver post</Link>
                  <Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>Editar</Link>
                  <button onClick={() => (deleteDocument(post.id))} className='btn btn-outline btn-danger'>Excluir</button>
                </div>
              </div>
            ))}
          </>
        )}
    </div>
  )
}

export default Dashboard