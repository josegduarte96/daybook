// export const actions = async ({ commit }) => {

import authApi from "../../../api/authApi"

// }

export const createUser = async ({commit}, user) => {
    const { name, mail: email, password } = user


    try {
        // Crear Usuario
        const { data } = await authApi.post(':signUp', { email, password, returnSecureToken: true })
        const { idToken, refreshToken } = data
        // Update Usuario: displayName
        await authApi.post(':update', {displayName: name, idToken})
        
        delete user.password
        // Ejecuto una accion en el store para cambiar el estado y se autentica
        commit('loginUser', {user, idToken, refreshToken})
        return {ok: true, message: '.....'}

    } catch (error) {
        return { ok: false, message: error.response.data.error.message }     
    }
    
}

export const signInUser = async ({commit}, user) => {
    const { email, password } = user


    try {
        // Crear Usuario
        const { data } = await authApi.post(':signInWithPassword', { email, password, returnSecureToken: true })
        const { idToken, refreshToken, displayName } = data
        user.name = displayName
        
        // Ejecuto una accion en el store para cambiar el estado
        commit('loginUser', {user, idToken, refreshToken})
        return {ok: true, message: '.....'}

    } catch (error) {
        return { ok: false, message: error.response.data.error.message }     
    }
    
}

export const checkAuthStatus = async({commit}) => {

    const idToken = localStorage.getItem('idToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (!idToken) {
       return commit('logout')
    }
    try {
        const {data} = await authApi.post(':lookup', { idToken })
        const { email, displayName } = data.users[0]
        commit('loginUser', { user:{ email, displayName }, idToken, refreshToken } )

        return {
            ok: true,
            user: {
                displayName: data.users[0].displayName
            }
        }
    } catch (error) {
        commit('logout')
        return {
            ok: false,
            message: error.response.data.error.message
        }
    }
}