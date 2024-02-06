import { db } from "../firebase/config"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useEffect, useState } from "react"

export const useAuthentication = () => {
    const [ error, setError ] = useState(null) // será acessível pelo formulário
    const [ loading, setLoading ] = useState(null) // será acessível pelo formulário
    const [ cancelled, setCancelled ] = useState(false)

    const auth = getAuth() // será acessível pelo formulário

    function checkIfIsCancelled() {
        if (cancelled) return;
    }

    const login = async (data) => {
        checkIfIsCancelled()
        setError(null)
        setLoading(true)

        try {

            const { user } = await signInWithEmailAndPassword (
                auth,
                data.email,
                data.password
             )

             setLoading(false)
             return user

        } catch (error) {

            let systemErrorMessage

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "O e-mail informado não está cadastrado em nossa plataforma"
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "A senha informada não é válida para este e-mail"
            } else if (error.message.includes("invalid-credential")) {
                systemErrorMessage = "A senha informada não é válida para este e-mail"
            } else {
                systemErrorMessage = "Ocorreu um erro. Por favor, tente mais tarde"
            }

            setError(systemErrorMessage)
            setLoading(false)

        }
    }

    const logout = () => {
        checkIfIsCancelled()

        signOut(auth)
    }

    // cria o objeto que será enviado para criação ou alteração do perfil
    const createUser = async (data) => { // será acessível pelo formulário
        checkIfIsCancelled()
        setError(null)
        setLoading(true)

        try {

            const { user } = await createUserWithEmailAndPassword (
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)
            return user

        } catch (error) {

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa ser pelo menos 6 caracteres."
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado. Tente outro endereço de e-mail."
            } else {
                systemErrorMessage = "Ocorreu um erro. Por favor, tente mais tarde."
            }

            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    useEffect(() => { return setCancelled(true) }, [])

    return {
        auth,
        createUser,
        login,
        logout,
        error,
        loading
    }

}