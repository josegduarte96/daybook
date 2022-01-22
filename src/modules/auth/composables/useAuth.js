import { updateCommaList } from 'typescript'
import { computed } from 'vue'
import {useStore} from 'vuex'


const useAuth = () => {
    const store = useStore()

   const createUser = async(user) => {
       const resp = await store.dispatch('auth/createUser', user)
       return resp
 
   }

   const signInUser = async(user) => {
       const resp = await store.dispatch('auth/signInUser', user)
       return resp
   }

   const checkAuth = async() => {
       const resp = await store.dispatch('auth/checkAuthStatus')
       return resp
   }

   const logout = () => {
       store.commit('auth/logout')
       store.commit('journal/clearEntries')
   }
    return {
        createUser,
        signInUser,
        checkAuth,
        logout,
        
        username: computed(() => store.getters['auth/username']),
        authStatus: computed(() => store.getters['auth/currentStatus'])
    }
}

export default useAuth