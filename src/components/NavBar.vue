<template>
    <nav class="navbar bg-white border-bottom border-secundary mx-5 row ">
        <div class=" col-lg-4 col-md-3 ">
            <a class="navbar-brand " href="/">
                <img src="@/assets/logo.png" alt="" class="d-inline-block"
                    style="border-radius: 10px;max-height: 3rem;">
            </a>
        </div>
        <div class="col-lg-5 col-md-3">
            <router-link :to="{ name: 'register' }"><button type="button" class="btn btn-primary rounded-pill  mx-1"
                    style="width:6rem" v-if="!isLooggedIn">Register</button></router-link>
            <router-link :to="{ name: 'login' }"><button type="button" class="btn btn-primary rounded-pill  mx-1"
                    style="width:6rem" v-if="!isLooggedIn">Login</button></router-link>
            <button @click="goPerfil" type="button" class="btn btn-primary rounded-pill  mx-1" style="width:6rem"
                v-if="isLooggedIn">For you</button>
            <router-link :to="{ name: 'postflit' }"><button type="button" class="btn btn-primary rounded-pill  mx-1"
                    style="width:6rem" v-if="isLooggedIn">Post Flit</button></router-link>
            <button @click="handleSignOut" type="button" class="btn  mx-1" style="width:6rem" v-if="isLooggedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                    <path fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg></button>
        </div>

    </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Auth, getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { RouterLink } from 'vue-router';
import router from '@/router';
import useAuth from '@/composables/useAuth';
export default defineComponent(
    {
        name: "NavBar",
        setup() {
            const isLooggedIn = ref(false)
            const { setisLoggedOut, isLogin, fetchUsers, users } = useAuth()
            // eslint-disable-next-line
            let auth: any;
            let uid = ref("")
            onMounted(() => {
                auth = getAuth()

                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        isLooggedIn.value = true
                        fetchUsers()
                        uid.value = user.uid
                    }
                    else {
                        isLooggedIn.value = false

                    }
                })
            });
            const handleSignOut = () => {
                signOut(auth).then(() => {
                    router.push("/")
                })
                setisLoggedOut()

            };
            const goPerfil = () => {
                router.push({ name: "profile", params: { id: uid.value } });
            }
            return {
                isLooggedIn, handleSignOut, uid, goPerfil
            }

        }

    }
)
</script>