import { db } from '../firebase/config';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup -- lida com vazamentos de memória
    // em mudança de componente, não pode haver resquício de funções
    const [cacelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled(){
        if (cacelled) return;
    }

    // login
    const login = async (data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(false)

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)

        } catch (error) {

            let systemErrorMessage;
            console.log(error)

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não cadastrado";
            } else if (error.message.includes("invalid-login")) {
                systemErrorMessage = "Senha incorreta";
            } else {
                systemErrorMessage = "Ocorreu um erro. Por favor, tente mais tarde";
            }

            setError(systemErrorMessage)
            console.log(error)
            setLoading(false)
        }
    }


    // logout
    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    // cadastrar
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            // erros retornados pelo firebase
            // se senha estiver ruim, se já cadastrou, erro qualquer
            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor, teste mais tarde";
            }

            setError(systemErrorMessage);
        }

        setLoading(false)
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    // os dados retornados aqui serão recebidos em
    // Register.jsx > const {createUser error: authError, loading} = useAuthentication
    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}