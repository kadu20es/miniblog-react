import React, { useState } from 'react'

const Formulario3 = () => {
    const [ categoria, setCategoria ] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const obj = categoria

        console.log(obj)
    }

  return (
    <div>

        <h1>Cadastro de categoria</h1>

        <form onSubmit={ handleSubmit }>
            <label>
                <span>Nome da categoria:</span>
                <input
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                    name='categoria'
                />

            </label>

            <button className='btn'>
                Enviar
            </button>
        </form>

    </div>


  )
}

export default Formulario3