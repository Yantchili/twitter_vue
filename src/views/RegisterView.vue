/* eslint-disable */
<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col"></div>
            <div class="col-md-4 col-lg-4">
                <form @submit.prevent="register">
                    <div class="mb-5 text-center">
                        <h3>Register</h3>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Username</label>
                        <input v-model="userForm.name" type="text" class="form-control" aria-describedby="emailHelp"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input type="email" class="form-control" aria-describedby="emailHelp" v-model="userForm.email"
                            required>

                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input v-model="userForm.password" type="password" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Profile image url (optional)</label>
                        <input v-model="userForm.image" type="text" class="form-control">
                    </div>

                    <button type="submit" class="btn btn-primary"> Create account</button>
                </form>
                <div class="">
                    <router-link :to="{ name: 'login' }">Already have an account?</router-link>
                </div>
            </div>
            <div class="col-md-4 col-lg-4"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { getFirestore, collection, addDoc, setDoc, doc, } from "firebase/firestore";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { async } from "@firebase/util";
import useAuth from "@/composables/useAuth"
export default {
    name: "RegisterView",

    setup() {

        const router = useRouter()
        const userForm = ref({
            name: '',
            email: '',
            password: '',
            image: ""
        })
        const db = getFirestore()
        const { NamaExiste, getNameStatus } = useAuth()
        const checkNameFormat = function (name: string) {
            return Boolean(name.match(/^[a-zA-Z]+$/))
        }
        const randomid = () => {
            let randomNumber = Math.floor(Math.random() * 100)
            return randomNumber
        }
        return {
            userForm, db, getNameStatus, checkNameFormat, randomid,

            register: async () => {
                await NamaExiste(userForm.value.name)
                const resultFormat = checkNameFormat(userForm.value.name)
                if (getNameStatus.value) {
                    alert("This username has been used. Try another!")
                }
                if (!resultFormat) {
                    alert("Username can only contain letters!")
                }
                if (!getNameStatus.value && resultFormat) {
                    try {
                        await createUserWithEmailAndPassword(getAuth(), userForm.value.email, userForm.value.password)
                            .then(async (cred) => {

                                const docRef = doc(db, "users", cred.user.uid)
                                const data = {
                                    name: userForm.value.name,
                                    email: cred.user.email,
                                    id: cred.user.uid,
                                    image: userForm.value.image ? userForm.value.image : `https://picsum.photos/id/${randomid()}/200/300`,
                                    likedPost: [],
                                    following: [],
                                    follower: [],

                                }
                                await setDoc(docRef, data)
                                router.push({ name: 'profile', params: { id: cred.user.uid } })
                            })

                            .then(() => alert("Successfully registered!"))
                    }
                    catch (e: any) {
                        if (e.code === "auth/weak-password") {
                            alert("The password was too weak")
                        }
                        else if (e.code === "auth/email-already-in-use") {
                            alert("The email is already in use")
                        }
                    }
                }

            }

        }
    }
}



</script>

