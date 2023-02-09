import store, { IState } from "..";
import { PostState } from "./state";
import { ActionTree } from "vuex";
import { getFirestore, collection, updateDoc, getDoc, doc, query, where, getDocs, orderBy, addDoc, deleteDoc } from "firebase/firestore";
import { Post } from "@/models/post";
import { ref } from "vue";
const actions: ActionTree<PostState, IState> = {
    // eslint-disable-next-line
    async fetchAllPosts({ commit }: { commit: any }) {
        const date = new Date().getTime()
        const db = getFirestore()
        const postsRef = collection(db, "posts")
        const q = query(postsRef, orderBy("date", "desc"), where("date", "<=", date))
        const allPostsList: Array<object> = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            allPostsList.push(doc.data())
        });

        commit("setAllPosts", allPostsList)
    },
    async fetchSearchedPost({ commit }: { commit: any }, searchTerm: string) {
        const date = new Date().getTime()
        const db = getFirestore()
        const postsRef = collection(db, "posts")
        const q = query(postsRef, orderBy("date", "desc"), where("date", "<=", date))
        const allSearchedPostsList: Array<object> = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const post = doc.data().text
            if (post.toLowerCase().includes(searchTerm)) {
                allSearchedPostsList.push(doc.data())
            }
        });

        commit("setSearchedPost", allSearchedPostsList)
    },
    async fetchPostsbyUser({ commit }: { commit: any }, userName: string) {
        const date = new Date().getTime()
        const db = getFirestore()
        const postsRef = collection(db, "posts")
        const q = query(postsRef, orderBy("date", "desc"), where("date", "<=", date), where("author", "==", userName))
        const allPostsList: Array<object> = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            allPostsList.push(doc.data())
        });
        commit("setPostByUser", allPostsList)
    },

    async fetchPostsLikedbyUser({ commit }: { commit: any }, userName: string) {
        const date = new Date().getTime()
        const db = getFirestore()
        const UserRef = collection(db, "users")
        const q = query(UserRef, where("name", "==", userName))
        let allPostsId: Array<string> = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            allPostsId = doc.data().likedPost
        });
        const likedPost: Array<object> = []
        //fetch post by id
        const PostRef = collection(db, "posts")
        allPostsId.forEach(async (id) => {
            const q2 = query(PostRef, where("id", "==", id))
            const querySnapshot2 = await getDocs(q2);
            querySnapshot2.forEach((doc) => {
                likedPost.push(doc.data())
            });
        })
        commit("setPostLikedByUser", likedPost)

    },
    async fetchFollowingId({ commit }: { commit: any }, userName: string) {
        const date = new Date().getTime()
        const db = getFirestore()
        const UserRef = collection(db, "users")
        const q = query(UserRef, where("name", "==", userName))
        let allFollowerId: Array<string> = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            allFollowerId = doc.data().following
        });
        console.log("allFollowerId", allFollowerId)
        commit("setFollowingID", allFollowerId)
    },
    async fetchFollowingName({ commit }: { commit: any }, idList: Array<string>) {
        const date = new Date().getTime()
        const db = getFirestore()
        const allFollowerName: Array<string> = []
        const followingpost: Array<object> = []
        let name = ""
        const PostRef = collection(db, "posts")
        const getName = () => {
            idList.forEach(async (id) => {
                const docRef = doc(db, "users", id);
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    name = docSnap.data().name
                    const q = query(PostRef, where("author", "==", name))
                    const querySnapshot = await getDocs(q);
                    if (querySnapshot) {
                        querySnapshot.forEach((doc) => {
                            followingpost.push(doc.data())
                        });
                    }
                }
            }
            )
            commit("setPostsOfFollowing", followingpost)
            console.log("followingpost", followingpost)
        }
        getName()

    },




};

export default actions;
