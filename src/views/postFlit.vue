/* eslint-disable */
<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col"></div>
            <div class="col-md-4 col-lg-4">
                <form @submit.prevent="onSubmit">
                    <div class="mb-5 text-center ">
                        <h3>Post your flit</h3>
                    </div>
                    <div class=" mb-3">

                        <label for="exampleInputEmail1" class="form-label">Text</label>
                        <textarea v-model="PostForm.text" type="text" class="form-control" maxlength="256">
                        </textarea>
                        <p class="text-end fs-6">{{ charactersLeftNum }}</p>

                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Image</label>
                        <input v-model="PostForm.image" type="text" class="form-control" id="exampleInputPassword1">
                    </div>
                    <input class="form-control" type="datetime-local" placeholder="Select DateTime" v-model="inputDate">
                    <button type="submit" class="btn btn-primary">Go!</button>
                </form>

            </div>
            <div class="col"></div>
        </div>
    </div>
</template>

<script lang="ts">

import { ref, defineComponent, watch } from 'vue'
import { collection, addDoc, getFirestore, updateDoc, doc, getDocs, query, where } from "firebase/firestore";
import useAuth from "@/composables/useAuth";
import { async } from '@firebase/util';
import router from '@/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default defineComponent({
    name: "postFlit",
    setup() {
        let charactersLeftNum = ref("256/256")
        const { fetchUsers, users } = useAuth()
        const db = getFirestore()
        const PostForm = ref({
            text: '',
            image: '',
            date: "",
            author: "",
            authorImage: ""
        })

        const inputDate = ref("")
        const charactersLeft = () => {
            var char = PostForm.value.text.length,
                limit = 256;
            charactersLeftNum.value = limit - char + "/" + "256"
        }

        const getUserImage = async (username: string) => {
            let userImage
            const auth = getAuth()
            const db = getFirestore()
            const q = query(collection(db, "users"), where("name", "==", username))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                userImage = doc.data().image
            })
            return userImage
        }
        const sendFlit = async () => {
            const Currentdate = new Date().getTime()
            const userImage = await getUserImage(users.value.name)
            const docRef = await addDoc(collection(db, "posts"), {
                text: PostForm.value.text,
                image: PostForm.value.image,
                date: inputDate.value.length > 0 ? Date.parse(inputDate.value) : Currentdate,
                author: users.value.name,
                authorImage: userImage,
                like: [],
                id: null
            });
            await updateDoc(docRef, {
                id: docRef.id
            });
            if (Currentdate < Date.parse(inputDate.value)) {
                alert("The flit has been programmed!")
            }
            else { alert("Flit sent!") }
        }
        fetchUsers()
        watch(() => PostForm.value.text, () => {
            charactersLeft()
        });

        return {
            PostForm, users, charactersLeft, inputDate, sendFlit, charactersLeftNum,
            onSubmit: async () => {
                try {

                    if (PostForm.value.text || PostForm.value.image) {
                        sendFlit()
                        router.push({ name: "profile", params: { id: users.value.id } });
                    }
                    else {
                        alert("The flit must contain text or image!")
                    }

                }
                catch (e: any) {
                    console.log(e.code)
                }
            }
        }


    }
})
</script>
<style scoped>

</style>