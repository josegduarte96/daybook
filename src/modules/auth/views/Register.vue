<template>
  <span class="login100-form-title p-b-41">
					Registro
				</span>
				<form @submit.prevent="onSubmit" class="login100-form validate-form p-b-33 p-t-5">

					<div class="wrap-input100 validate-input" data-validate = "Ingrese Nombre">
						<input v-model="useForm.name" class="input100" type="text" placeholder="Nombre" required>
						<span class="focus-input100" data-placeholder="&#xe82a;"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Ingrese Correo">
						<input v-model="useForm.mail" class="input100" type="text" placeholder="Correo" required>
						<span class="focus-input100" data-placeholder="&#xe818;"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Ingrese Contraseña">
						<input v-model="useForm.password" class="input100" type="password" placeholder="Contraseña" required>
						<span class="focus-input100" data-placeholder="&#xe80f;"></span>
					</div>

					<div class="container-login100-form-btn m-t-32">
						<button type="submit" class="login100-form-btn">
							Crear Cuenta
						</button>

					</div>

                    <div class="container-login100-form-btn m-t-32">
                        <router-link :to="{name: 'login'}">¿Ya tienes cuenta?</router-link>
                    </div>
				</form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'
import Swal from 'sweetalert2'


export default {

setup(){
	const router = useRouter()
	const { createUser } = useAuth()
	const useForm = ref({
		name: '',
		mail: '',
		password: ''
	})

	return{
		useForm,
		onSubmit: async() => {
			const {ok, message} = await createUser(useForm.value)
			
			if (!ok) Swal.fire('Error', message, 'error')
			// else router.push({ name: 'daybook'})
			else {
				const { isConfirmed } = await new Swal({
					icon: "success",
					title: "Tu cuenta se creo con exito!",
					text: "Pulsa continuar para acceder a tu cuenta",
					confirmButtonText: "Continuar"
				})

				if (isConfirmed) {
					router.push({ name: 'daybook'})
				}
			}
		}
	}
}

}
</script>
