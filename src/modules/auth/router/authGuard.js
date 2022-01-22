import store from '@/store'


const isAuthGuard = async(to, from, next) => {
    let ok = null
    await store.dispatch('auth/checkAuthStatus')
        .then( () => {
            ok = store.state.auth.status === 'authenticated' ? true : false
        })
        .catch(() => {
            ok = false
        })

    if (ok) next()
    else next({name: 'login'})


}

export default isAuthGuard