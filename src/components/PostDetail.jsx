import React from 'react'
import { Link } from 'react-router-dom'

import './PostDetail.css'

const PostDetail = ({post}) => {

  return (
    <div className='post_detail'>
        <div className="photo_frame">
          <img src={post.image} alt={post.title} />
          <div className="post_data">
            <h2>{post.title}</h2>
            <p className='createdby'>{post.createdBy}</p>
          </div>
        </div>
        <div className='tags'>
          {post.tagsArray.map(tag => (
            <p key={tag}>
              <span>#</span>
              {tag}
            </p>
          ))}
        </div>
        <Link to={`/posts/${post.id}`} className="btn btn-outline">Ler</Link>
    </div>
  )
}

export default PostDetail