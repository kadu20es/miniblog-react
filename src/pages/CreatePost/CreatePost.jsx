import React from 'react'

import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/authContext'
import { useInsertDocument } from '../../hooks/useInsertDocuments'

import './CreatePost.css'

const CreatePost = () => {
  const [ title, setTitle ] = useState("")
  const [ image, setImage ] = useState("")
  const [ body, setBody ] = useState("")
  const [ tags, setTags ] = useState([])
  const [ formError, setFormError ] = useState("")
  const { user } = useAuthValue()

  const { insertDocument, response } = useInsertDocument("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
    }

    // valida a url da imagem

    // criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    // checar todos os valores
    if (!title || !image || !body || !tags) {
      setFormError("Por favor, preencha todos os campos")
    }

    if (formError) return

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid, // id do usuário
      createdBy: user.displayName
    })

    console.log(insertDocument)
    console.log(response.error)
    console.log(response)
    console.log(user)

    // redirect to home page
    navigate("/")

  }

  return (
    <div className='create_post'>
        <h1>Criar post</h1>
        <p>Escreva sobre o que quiser e compartilhe suas ideias com o mundo!</p>

        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder='Pense num bom título'
            />
          </label>

          <label>
            <span>Url da imagem:</span>
            <input
              type="text"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              placeholder='insira uma imagem que representa seu post'
            />
          </label>

          <label>
            <span>Conteúdo:</span>
            <textarea
              type="text"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              placeholder='o conteúdo do seu post'
            />
          </label>

          <label>
            <span>Tags:</span>
            <input
              type="text"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
              placeholder='Insira as tags separadas por vírgulas'
            />
          </label>


          {!response.loading && <button className='btn'>Postar</button>}
          {response.loading && <button className='btn' disabled>Aguarde...</button>}
          {response.error && <p className='error'>{response.error}</p>}
          {formError && <p className='error'>{formError}</p>}


        </form>

    </div>
  )
}

export default CreatePost