<template>
    <div class="container">
        <div class="row">
            <div class=" mb-3 col-6 border-0 mt-5 container">
                <div class="text-start container ">
                    <div id="background">
                    </div>
                    <div class="">
                        <img src="https://loremflickr.com/150/150/person"
                            class="rounded-circle border border-white border-4 "
                            style="margin-top:-75px; margin-left: 15px;" alt="">
                    </div>
                    <div class="row justify-content-between">
                        <p class="fs-5 fw-bold col mt-2">@{{ userName }}</p>
                        <div class="col text-end ">
                            <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off">
                            <label class="btn btn-primary rounded-pill mx-2" for="btn-check"
                                @click="toggleFollow(userName)">
                                <span v-if="!isfollowed">
                                    &#43; Follow
                                </span>
                                <span v-else>
                                    Following
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="row md-5">
                    <div class="col px-0">
                        <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" checked>
                        <label @click="showPost()" class="btn rounded-0 border-start-0 border-end-0 border-top-0"
                            for="option1" style="width:100%">Posts</label>
                    </div>
                    <div class="col  px-0">
                        <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off">
                        <label @click="showLike()" class=" btn rounded-0 border-start-0 border-end-0 border-top-0"
                            for="option2" style="width:100%">Likes</label>
                    </div>
                </div>
                <div class="row">
                    <div v-if="showPosts" class="row mt-5">
                        <div v-for="post in PostsByUser" :key="post.id" :post="post">
                            <div class="post-info border border-light">
                                <div class="card-body mt-2" style="width: 100%; ">
                                    <div class="container">
                                        <div class="row ">
                                            <div class="col-1 margin-left-1">
                                                <img src="https://loremflickr.com/150/150/person"
                                                    class="rounded-circle border border-white border-4 "
                                                    style=" width: 50px;" alt="">
                                            </div>
                                            <div class="col-10 container">
                                                <h6 class="card-title fw-normal text-start row">
                                                    @{{ post.author }}
                                                </h6>
                                                <h6 class="card-title fw-normal text-start row">
                                                    {{ (new Date(post.date)).toLocaleString() }}
                                                </h6>
                                                <div>
                                                    <h6 class="card-title fw-bold text-start mt-3" v-if="post.text">
                                                        {{ post.text }}
                                                    </h6>
                                                </div>
                                                <div class="card mb-3 col mt-3" style="border: 0ch;">
                                                    <div class="row" v-if="post.image">
                                                        <img style="width: 400px; " :src="post.image" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div v-if="showLikes" class="row mt-5">
                        <div v-for=" post in PostsLikedByUser" :key="post.id" :post="post">
                            <div class="post-info border border-light">
                                <div class="card-body mt-2" style="width: 100%; ">
                                    <div class="container">
                                        <div class="row ">
                                            <div class="col-10 container">
                                                <h6 class="card-title fw-normal text-start row">
                                                    @{{ post.author }}
                                                </h6>
                                                <h6 class="card-title fw-normal text-start row">
                                                    {{ (new Date(post.date)).toLocaleString() }}
                                                </h6>
                                                <div>
                                                    <h6 class="card-title fw-bold text-start mt-3" v-if="post.text">
                                                        {{ post.text }}
                                                    </h6>
                                                </div>
                                                <div class="card mb-3 col mt-3" style="border: 0ch;">
                                                    <div class="row" v-if="post.image">
                                                        <img style="width: 400px; " :src="post.image" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script lang="ts">
import { getFirestore, collection, updateDoc, getDoc, doc, query, where, getDocs, orderBy, addDoc } from "firebase/firestore";
import allPostList from '@/components/allPostList.vue';
import useAuth from "@/composables/useAuth"
import { ref, onMounted } from "vue";
import usePost from '@/composables/usePost';
import { async } from "@firebase/util";
import { Auth, getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
export default ({
    name: "UserPageView",
    props: {
        userName: {
            type: String,
            required: true
        },

    },
    setup(props: any) {
        const { getPostbyUser, PostsByUser, getPostLikedbyUser, PostsLikedByUser } = usePost()
        const { fetchUsers, users, AddFollowing, CancelFollowing } = useAuth()
        fetchUsers()
        var showPosts = ref(true)
        var showLikes = ref(false)
        const showPost = function () {
            showPosts.value = true
            showLikes.value = false

        }
        const showLike = function () {
            showLikes.value = true
            showPosts.value = false

        }

        if (props.userName) {
            getPostbyUser(props.userName)
            getPostLikedbyUser(props.userName)
        }
        let isfollowed = ref(true)
        const confirmIsFollowed = async function (userName: string) {
            const auth = getAuth()
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const db = getFirestore()
                    const ref01 = doc(db, "users", user.uid);
                    const docSnap = await getDoc(ref01);
                    let followingList: Array<string> = []
                    if (docSnap) {
                        followingList = docSnap.data()?.following
                        console.log("followingList", followingList)
                        console.log("userName", userName)
                    }
                    isfollowed.value = followingList.includes(userName)
                    console.log("initial", isfollowed.value)
                }
            })
        }
        onMounted(async () => {
            await confirmIsFollowed(props.userName)
        })
        const addFollow = function (userName: string) {
            AddFollowing(userName)
            isfollowed.value = true
        }
        const cancelFollowing = function (userName: string) {
            CancelFollowing(userName)
            isfollowed.value = false
        }
        const toggleFollow = async function (userName: string) {

            if (isfollowed.value) {
                cancelFollowing(userName)


            }
            else {
                addFollow(userName)
            }
        }
        return {
            users, showPost, showLike, showPosts, showLikes, PostsByUser, PostsLikedByUser, toggleFollow, isfollowed

        }

    }
})


</script>
<style scoped>
#background {
    height: 200px;
    background-image: url("https://picsum.photos/1000/200")
}
</style>