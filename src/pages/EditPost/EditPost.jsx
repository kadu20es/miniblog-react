import { useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/authContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useFetchDocument } from '../../hooks/useFetchDocument'

import './EditPost.css'

const EditPost = () => {
  const { id } = useParams()
  const { user } = useAuthValue()
  const { document: post } = useFetchDocument("posts", id)
  const { updateDocument, response } = useUpdateDocument("posts")

  const [ title, setTitle ] = useState("")
  const [ image, setImage ] = useState("")
  const [ body, setBody ] = useState("")
  const [ tags, setTags ] = useState([])
  const [ formError, setFormError ] = useState("")




  useEffect(() => {

    if (post) {
      setTitle(post.title)
    setBody(post.body)
    setImage(post.image)

    const textTags = post.tagsArray.join(", ")
    setTags(textTags)
    }

  }, [post])


  const navigate = useNavigate("/dashboard")

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
    }

    // criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    // checar todos os valores
    if (!title || !image || !body || !tags) {
      setFormError("Por favor, preencha todos os campos")
    }

    if (formError) return

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid, // id do usuário
      createdBy: user.displayName
    }

    updateDocument(id, data)

    console.log(updateDocument)
    console.log(response.error)
    console.log(response)
    console.log(user)

    // redirect to home page
    navigate("/")

  }

  return (
    <div className='edit_post'>
        {post && (
          <>
            <h1>Editar post <span>&ldquo;{post.title}&rdquo;</span></h1>
            <p>Altere os dados do post como desejar</p>

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
              <p className='preview_title'>Preview da imagem atual:</p>
              <img src={post.image} className='preview_image' alt='preview'/>

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


              {!response.loading && <button className='btn'>Salvar</button>}
              {response.loading && <button className='btn' disabled>Aguarde...</button>}
              {response.error && <p className='error'>{response.error}</p>}
              {formError && <p className='error'>{formError}</p>}


            </form>
          </>
        )}

    </div>
  )
}

export default EditPost