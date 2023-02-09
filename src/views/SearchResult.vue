/* eslint-disable */
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="container mt-5 col-5 text-center">
                <div class="search-wrapper" style="margin-bottom:50px">
                    <form>
                        <div class="row">
                            <div class="mb-3 col-10">
                                <input type="text" class="form-control" id="text" v-model="searchVal"
                                    placeholder="What do you want to search?">
                            </div>
                            <button type="button" class="btn  col-1" style="margin-top: -3%;"
                                @click="toSearchPage(searchVal.trim().toLowerCase())">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-search" viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg></button>
                        </div>
                    </form>
                </div>
                <div>
                    <div class="row row-cols-1 " v-if="displayedPosts.length > 0">
                        <allPostList v-for="post in displayedPosts" :key="post.id" :post="post"
                            @addLike="toggleLike($event)" @usernameClicked="getUserPage" />
                    </div>
                    <div v-else>
                        oh no...there are no results
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="btn-group col-md-2 offset-md-5">
        <button type="button" class="btn btn-sm btn-outline-secondary" v-if="page != 1" @click="page--">
            &lt;&lt; </button>
        <button type="button" class="btn btn-sm btn-outline-secondary"
            v-for="pageNumber in pages.slice(page - 1, page + 5)" @click="page = pageNumber" :key="pageNumber">{{
                pageNumber
            }}</button>
        <button type="button" @click="page++" v-if="page < pages.length"
            class="btn btn-sm btn-outline-secondary">>></button>
    </div>

</template>

<script lang="ts">
import { User } from "@/models/user";
import { getFirestore, collection, updateDoc, getDoc, doc, query, where, getDocs, orderBy, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, watch, computed, onMounted } from 'vue';
import usePost from '@/composables/usePost';
import allPostList from '@/components/allPostList.vue';
import { Post } from '@/models/post';
import useAuth from "@/composables/useAuth";
import { async } from "@firebase/util";
import { useRoute, useRouter } from "vue-router";
export default ({
    name: 'SearchResult',
    components: {
        allPostList
    },
    props: {
        searchTerm: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const router = useRouter()
        const { fetchSearchedPost, SearchedPost } = usePost()
        let page = ref(1)
        let perPage = ref(5)
        let pages: number[] = []
        let numOfPages;
        //Paginación
        onMounted(() => {
            fetchSearchedPost(props.searchTerm)
        })
        const setPostNumber = () => {
            numOfPages = Math.ceil(SearchedPost.value.length / perPage.value)
            for (let i = 1; i <= numOfPages; i++) {
                pages.push(i);
            }
        };
        const paginate = (AllPosts: Array<Post[]>) => {
            let Page = page
            let PerPage = perPage
            let from = (Page.value * PerPage.value) - PerPage.value
            let to = (Page.value * PerPage.value)
            return AllPosts.slice(from, to)
        };
        const displayedPosts = computed(() => {
            return paginate(SearchedPost.value);

        });
        watch(() => SearchedPost.value, () => {
            setPostNumber()
        });

        const { fetchUsers, users, setLikedPost, getLikeList } = useAuth()
        let currentLikeList: string[] = []

        const currentPostLikeList = async (postID: string, liked: boolean) => {
            const db = getFirestore()
            const ref = doc(db, "posts", postID)
            if (!liked) {
                currentLikeList?.push(users.value.name)
                console.log("liked", liked)
            } else {
                const index = currentLikeList.indexOf(users.value.name)
                currentLikeList?.splice(index, 1)
                console.log("unliked", liked)
            }
            await updateDoc(ref, {
                like: currentLikeList
            });

        }
        // set user's liked post
        let currentUserLikeList: string[] = []
        const setLikedList = async (postID: string, liked: boolean) => {
            const db = getFirestore()
            const ref = doc(db, "users", users.value.id);
            const docSnap = await getDoc(ref);
            if (!liked) {
                currentUserLikeList?.push(postID)
                setLikedPost(currentUserLikeList)
            }
            else {
                const index = currentUserLikeList.indexOf(postID)
                currentUserLikeList?.splice(index, 1)
                setLikedPost(currentUserLikeList)
            }
            await updateDoc(ref, {
                likedPost: currentUserLikeList
            });
        }
        const toggleLike = async (postID: string) => {
            const result = await isLiked(postID)
            const liked = result
            currentPostLikeList(postID, liked)
            setLikedList(postID, liked)
        }

        const isLiked = async (postID: string) => {
            await fetchUsers()
            const db = getFirestore()
            const ref = doc(db, "users", users.value.id);
            const docSnap = await getDoc(ref);
            currentUserLikeList = docSnap.data()?.likedPost
            let result: boolean | undefined
            result = currentUserLikeList.includes(postID)
            return result
        }

        const getUserPage = (username: string) => {
            router.push({ name: "UserPageView", params: { username: username } });
        }

        const toSearchPage = (searchTerm: string) => {
            router.push({ name: "SearchResult", params: { searchTerm: searchTerm } })
        }

        let searchVal = ""
        return {
            SearchedPost, pages, paginate, displayedPosts, page, setPostNumber, toggleLike, users, getLikeList, isLiked, getUserPage, searchVal, toSearchPage
        }

    },


}
);
</script>
