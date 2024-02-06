import React, { useState } from 'react'

import './Formulario.css'

const Formulario2 = () => {
    const [ descricao, setDescricao ] = useState("")
    const [ marca, setMarca ] = useState("")
    const [ categoria, setCategoria ] = useState("")
    const [ quantidade, setQuantidade ] = useState()
    //const [ medida, setMedida ] = useState()
    //const [ codigo, setCodigo ] = useState()
    const [ error, setError ]= useState("")
    const [ tipoMedida, setTipoMedida ] = useState("")
    //const tipoMedida = useId()

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())

        console.log(form)
        console.log(formData)
        console.log(formJson)

        const produto = {
            descricao,
            marca,
            categoria,
            quantidade,
            tipoMedida
        }

        console.log(produto)
    }



  return (
    <div>
        <h1>Cadastro de produto</h1>

        <form onSubmit={ handleSubmit }>
            <label>
                <span>Item:</span>
                <input
                    type='text'
                    placeholder='Insira a descrição do produto'
                    name='descricao'
                    value={ descricao }
                    onChange={ (e) => setDescricao(e.target.value) }
                    required
                />
            </label>

            <label>
                <span>Marca:</span>
                <input
                    type='text'
                    placeholder='Insira a marca do produto'
                    name='marca'
                    value={ marca }
                    onChange={ (e) => setMarca(e.target.value) }
                    required
                />
            </label>

            <label>
                <span>Categoria:</span>
                <input
                    type='text'
                    placeholder='Insira a categoria do produto (limpeza, alimento, etc)'
                    name='categoria'
                    value={ categoria }
                    onChange={ (e) => setCategoria(e.target.value) }
                    required
                />
            </label>

            <label>
                <span>Quantidade da medida</span>
                <input
                    type='text'
                    placeholder='Insira o valor numérico da quantidade'
                    name='quantidade'
                    value={ quantidade }
                    onChange={ (e) => setQuantidade(e.target.value) }
                    required
                />
            </label>

            <label>
                <span>Tipo de medida:</span>
                <select name="tipoMedida" defaultValue={ " " } onChange={ (e) => setTipoMedida(e.target.value)}>
                    <option value="">Selecione o tipo de medida</option>
                    <option value="ml">militro</option>
                    <option value="lt">litro</option>
                    <option value="gr">grama</option>
                    <option value="kg">quilograma</option>
                    <option value="un">unidade</option>
                </select>
            </label>


            <button className='btn'>
                Cadastrar produto
            </button>

            {error && <p className='error'>{error}</p>}
        </form>

    </div>
  )
}

export default Formulario2