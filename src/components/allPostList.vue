<template >
    <div>
        <div class="post-info border border-light">
            <div class="card-title text-start" style=" ">
                <div class="row">
                    <div class="col-1 margin-left-1">
                        <img :src="post.authorImage" v-if="post.authorImage"
                            class=" rounded-circle border border-white border-4 " style=" width: 50px;height: 50px;"
                            alt="">
                    </div>
                    <div class=" col-10">
                        <button @click="$emit('usernameClicked', post.author)" class="btn border0">
                            <h6 class="card-title fw-normal text-start text-primary">
                                @{{ post.author }}
                            </h6>
                        </button>

                        <h6 class="fw-normal ">
                            {{ (new Date(post.date)).toLocaleString() }}
                        </h6>
                        <h6 class="card-title fw-bold text-start" v-if="post.text">
                            {{ post.text }}
                        </h6>
                        <div class="card mb-3 col " style="border: 0ch;">
                            <div class="">
                                <div class="row" v-if="post.image">
                                    <img style="width: 400px; " :src="post.image" />
                                </div>
                            </div>
                            <div class="text-start">
                                <button class="border-0" @click="$emit('addLike', post.id), change()"
                                    style="background-color:transparent; width: 20px;">
                                    <div v-if="!liked">
                                        <i class="fa-regular fa-thumbs-up"></i>
                                    </div>
                                    <div v-else>
                                        <i class="fa-solid fa-thumbs-up"></i>

                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>


</template>

<script lang="ts">

import { Post } from "@/models/post";
import { validate } from "@babel/types";
import { User } from "@firebase/auth";
import { async } from "@firebase/util";
import { defineComponent, PropType, ref, onMounted } from "vue";
import useAuth from "@/composables/useAuth";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getFirestore, collection, doc, query, where, getDocs, getDoc } from "firebase/firestore";
import { Computed } from "vuex";
export default defineComponent({
    name: "allPostList",
    props: {
        post: {
            type: Object as PropType<Post>,
            required: true,
        },

    },
    setup(props) {
        var liked = ref(false)
        const confirmIsLiked = async function (postId: string) {
            const auth = getAuth()
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const db = getFirestore()
                    const ref01 = doc(db, "users", user.uid);
                    const docSnap = await getDoc(ref01);
                    let LikedList: Array<string> = []
                    if (docSnap) {
                        LikedList = docSnap.data()?.likedPost
                    }
                    liked.value = LikedList.includes(postId)
                }
            })
        }
        onMounted(async () => {
            await confirmIsLiked(props.post.id)
        })
        const change = function () {
            liked.value = !liked.value
        }
        return { liked, change }

    }
}

);
</script>