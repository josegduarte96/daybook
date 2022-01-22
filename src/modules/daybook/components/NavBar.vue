<template>
    <nav class="navbar bg-primary">
        <a class="navbar-brand text-white">
            <img src="@/assets/logo.png" alt="vuelogo" height="24" class="d-inline-block align-text-top mx-2"/>
            ¡Hola {{username}}!
        </a>

        <div class="d-flex">
            <button @click="onLogout" class="btn btn-outline-info mx-3">
                <i class="fas fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import useAuth from '../../auth/composables/useAuth'
export default {
    setup() {
        const {username, logout} = useAuth()
        const router = useRouter()

        return {
            username,
            onLogout: () => {
                logout()
                router.push({name: 'login'})
            }
        }
    }
}
</script>