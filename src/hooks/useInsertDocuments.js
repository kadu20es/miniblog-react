import { useState, useEffect, useReducer } from "react"
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from "firebase/firestore"
// collection representa uma tabela do banco de dados do firebase. Rece o nome do banco
// addDoc é a função de adicionar documentos
// Timestamp o nome já diz tudo...

const initialState = {
    loading: null,
    insert: null
}

const insertReducer = ( state, action ) => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null}
        case "INSERTED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const useInsertDocument = (docColletion) => {

    const [ response, dispatch ] = useReducer(insertReducer, initialState)

    // deal with memory Leak
    const [ cancelled, setCancelled ] = useState(false)

    // deve ser executada antes de qualquer ação a fim de verificar se ela já está cancelada para continuar com o hhok
    const checkCancelBeforeDispatch = (action) => {
        console.log(action)
        if (!cancelled) {
            dispatch(action)
        }
    }

    const insertDocument = async(document) => {
        checkCancelBeforeDispatch({
            type: "LOADING"
        })

        try {

            const newDocument = {...document, createdAt: Timestamp.now()}

            // resultado da inserção
            const insertedDocument = await addDoc(
                collection(db, docColletion),
                newDocument
            )

            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument
            })



        } catch (error) {

            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message
            })
        }

    }

    // evitar memoryLeak e encerrar o componente
    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    // retorna a resposta e a função para ser executada quando necessário
    return { insertDocument, response }

}