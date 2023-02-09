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
                        <p class="fs-5 fw-bold col mt-2">@{{ users.name }}</p>
                        <div class="col text-end ">
                            <button @click="goSetting" class="btn " style="background-color:transparent" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    class="bi bi-gear" viewBox="0 0 16 16">
                                    <path
                                        d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                    <path
                                        d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row md-5">
                    <div class="col px-0">
                        <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off">
                        <label @click="showFollowing()" class="btn rounded-0 border-start-0 border-end-0 border-top-0"
                            for="option1" style="width:100%">Following</label>
                    </div>
                    <div class="col px-0">
                        <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" checked>
                        <label @click="showPost()" class="btn rounded-0 border-start-0 border-end-0 border-top-0"
                            for="option2" style="width:100%">Your Flit</label>
                    </div>
                    <div class="col  px-0">
                        <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off">
                        <label @click="showLike()" class=" btn rounded-0 border-start-0 border-end-0 border-top-0"
                            for="option3" style="width:100%">Likes</label>
                    </div>
                </div>
                <div class="row">
                    <div v-if="showFollowings" class="row mt-5">
                        <div v-for="post in PostsOfFollowing" :key="post.id" :post="post">
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
                    <div v-if="showPosts" class="row mt-5">
                        <div v-for="(post, index) in PostsByUser" :key="post.id" :post="post">
                            <div class="post-info border border-light">
                                <div class="card-body mt-2" style="width: 100%; ">
                                    <div class="container">
                                        <div class="row ">
                                            <div class="col-1 margin-left-1">
                                                <img src="https://loremflickr.com/150/150/person"
                                                    class="rounded-circle border border-white border-4 "
                                                    style=" width: 50px;" alt="">
                                            </div>

                                            <div class="col-10 container" id="post">
                                                <h6 class="card-title fw-normal text-start row">
                                                    @{{ post.author }}
                                                </h6>
                                                <h6 class="card-title fw-normal text-start row">
                                                    {{ (new Date(post.date)).toLocaleString() }}
                                                </h6>
                                                <div class="row">
                                                    <div class="col-1">
                                                        <button @click="deletePost(post.id, index)" id="remove"
                                                            type="button" class=" btn btn-light rounded-5"
                                                            style="width:20px; height:20px;visibility: hidden; padding:0">&#9587;</button>

                                                    </div>
                                                    <div class=" col-10">
                                                        <div>
                                                            <h6 class="card-title fw-bold text-start mt-3"
                                                                v-if="post.text">
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
import useAuth from "@/composables/useAuth"
import { ref, onMounted, watch } from "vue";
import usePost from "@/composables/usePost";
import { User } from "@/models/user";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore, collection, doc, query, where, getDoc, deleteDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { Post } from "@/models/post";
import router from "@/router";
export default ({
    name: "PerfilView",
    props: {
        userid: {
            type: String,
            required: true
        }
    },
    setup(props: any) {
        const { users } = useAuth()
        const {
            getPostbyUser,
            getPostLikedbyUser,
            PostsByUser,
            PostsLikedByUser,
            fetchFollowingId,
            FollowingId,
            fetchFollowingName,
            FollowingName,
            fetchFollowingpost,
            PostsOfFollowing
        } = usePost()

        var showPosts = ref(false)
        var showFollowings = ref(false)
        var showLikes = ref(false)
        const showPost = function () {
            showPosts.value = true
            showLikes.value = false
            showFollowings.value = false

        }
        const showLike = function () {
            showLikes.value = true
            showPosts.value = false
            showFollowings.value = false
        }
        const showFollowing = function () {
            showFollowings.value = true
            showLikes.value = false
            showPosts.value = false
        }
        let userName = ref("")
        const getUserNamebyId = async (userid: string) => {
            const date = new Date().getTime()
            const db = getFirestore()
            const usersRef = doc(db, "users", userid)
            const docSnap = await getDoc(usersRef)
            if (docSnap.exists()) {
                userName.value = docSnap.data().name
            }
        }
        const deletePost = async (postId: string, index: number) => {
            const db = getFirestore()
            const confirm = window.confirm("Are you sure to delete the flit?")
            if (confirm) {
                await deleteDoc(doc(db, "posts", postId));
                PostsByUser.value.splice(index, 1)
            }
            getPostLikedbyUser(userName.value)
        }
        const goSetting = () => {
            const confirm = window.confirm("Are you sure to delete your account?")
            if (confirm) {
                let secondConfirm = prompt("Please enter 'DELETE' to delete Your account");
                if (secondConfirm === "DELETE") {
                    const auth = getAuth();
                    const user = auth.currentUser;
                    if (user) {
                        const db = getFirestore()
                        deleteDoc(doc(db, "users", user.uid));
                        deleteUser(user).then(() => {
                            alert("Account deleted!")
                            router.push({ name: "home" });
                        })
                    }

                }
            }
        }
        onMounted(async () => {
            showPosts.value = true
            await getUserNamebyId(props.userid)
            await getPostbyUser(userName.value)
            await getPostLikedbyUser(userName.value)
            await fetchFollowingId(userName.value)
            await fetchFollowingName(FollowingId.value)
        })

        return {
            users,
            showPosts,
            showLikes,
            showFollowings,
            showPost,
            showLike,
            showFollowing,
            PostsByUser,
            PostsLikedByUser,
            PostsOfFollowing,
            deletePost,
            goSetting

        }


    }
}
);
</script>
<style scoped>
#background {
    height: 200px;
    background-image: url("https://picsum.photos/1000/200")
}

#post:hover #remove {
    background: gainsboro !important;
    visibility: visible !important;
}

#remove {
    font-size: 10px;
}
</style>