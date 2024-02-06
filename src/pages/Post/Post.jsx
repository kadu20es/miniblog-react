import React from 'react'
import './Post.css'

// hooks
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument';


const Post = () => {
  const { id } = useParams()
  const { document: post, loading } = useFetchDocument("posts", id)


  return (
    <div className='post_container'>
      {loading && <p>Carregando post...</p>}
      {post && (
        <>
            <h2>{post.title}</h2>
            <p>{post.createdBy}</p>
            <img src={post.image} alt={post.title} />
            <p>{post.body}</p>
            <div className="tags">
            {post.tagsArray.map((tag) => (
              <p key={tag}><span>#</span>{tag} </p>
            ))}
            </div>
        </>
      )}
    </div>
  )
}

export default Post