/* eslint-disable */
<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col"></div>
            <div class="col-md-4 col-lg-4">
                <form @submit.prevent="onSubmit">
                    <div class="mb-5 text-center">
                        <h2>Login</h2>
                    </div>
                    <div class=" mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input v-model="userForm.email" type="email" class="form-control">
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                        <input v-model="userForm.password" type="password" class="form-control"
                            id="exampleInputPassword1">
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
                <div class="mt-2">
                    <router-link :to="{ name: 'register' }">Sign Up</router-link>
                </div>
                <div class="mb-5">
                    <router-link :to="{ name: 'reset' }">Forgot Password?</router-link>
                </div>
            </div>
            <div class="col"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '@/composables/useAuth'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
export default {
    setup() {
        const { setisLoggedIn, isLogin } = useAuth()
        const router = useRouter()
        const userForm = ref({
            name: '',
            email: '',
            password: '',
        })

        return {
            userForm,
            onSubmit: async () => {
                try {
                    await signInWithEmailAndPassword(getAuth(), userForm.value.email, userForm.value.password).then((data) => {
                        router.push({ name: 'home' })
                    })
                    setisLoggedIn()

                }
                catch (e: any) {
                    console.log(e.code)
                    if (e.code === "auth/user-not-found") {
                        alert("User not found")
                    }
                    else if (e.code === "auth/wrong-password") {
                        alert("The password wasn't correct")
                    }

                }
            }
        }

    }
}
</script>
<style scoped>

</style>