import React, { useState } from 'react'

const Formulario4 = () => {
    const [ item1, setItem1 ] = useState("")
    const [ item2, setItem2 ] = useState("")
    const [ item3, setItem3 ] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const completo = {
            itemBla: item1,
            itemBle: item2,
            itemBli: item3
        }

        console.log(completo);
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Item 1:</span>
                <input
                    type="text"
                    value={item1}
                    onChange={(e) => setItem1(e.target.value)}
                    name='itemBla'
                    placeholder='Item 1'
                />
            </label>

            <label>
                <span>Item 2</span>
                <input
                    type="text"
                    value={item2}
                    onChange={(e) => setItem2(e.target.value)}
                    name='itemBle'
                    placeholder='Item 2'
                />
            </label>

            <label>
                <span>Item 3</span>
                <input
                    type="text"
                    value={item3}
                    onChange={(e) => setItem3(e.target.value)}
                    name='itemBli'
                    placeholder='Item 3'
                />
            </label>

            <button>
                Enviar
            </button>

        </form>
    </div>
  )
}

export default Formulario4