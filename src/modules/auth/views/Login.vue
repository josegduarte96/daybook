<template>
  <span class="login100-form-title p-b-41"> Ingresar </span>
  <form @submit.prevent="signInUser" class="login100-form validate-form p-b-33 p-t-5">
    <div class="wrap-input100 validate-input" data-validate="Enter username">
      <input v-model="userForm.email" class="input100" type="text" placeholder="Correo" required />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input
        class="input100"
        type="password"
        placeholder="Contraseña"
        required
        v-model="userForm.password"
      />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button type="submit" class="login100-form-btn">Login</button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'register' }">¿No tienes cuenta?</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import {useRouter} from 'vue-router'
import Swal from 'sweetalert2'
import useAuth from '../../auth/composables/useAuth'

export default {

  setup() {
    const router = useRouter()
    const { signInUser, checkAuth } = useAuth()
    const userForm = ref({
      email: '',
      password: ''
    })
 

    return {
    userForm,
    signInUser: async() => {
      const resp = await signInUser(userForm.value)
      if(resp.ok) router.push({name: 'no-entry'})
      else Swal.fire('Error', resp.message, 'error')
    }

    }
  }
}
</script>
