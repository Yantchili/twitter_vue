/* eslint-disable */
import { User } from "@/models/user";
import { UserState } from "./state";
import { IState } from "..";
import { ActionTree } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDoc, doc, query, where, getDocs, updateDoc } from "firebase/firestore";
const actions: ActionTree<UserState, IState> = {
    // eslint-disable-next-line
    async fetchUsers({ commit }: { commit: any }) {
        const auth = getAuth()
        const db = getFirestore()
        const user = auth.currentUser;
        let userInfo
        if (user) {
            const q = query(collection(db, "users"), where("id", "==", user.uid))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                userInfo = doc.data()
            })
        }

        commit("setUsers", userInfo);

    },

    async NamaExiste({ commit }: { commit: any }, name: string) {
        commit("setNameStatus", false)
        const db = getFirestore()
        let userInfo
        const q = query(collection(db, "users"), where("name", "==", name))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            userInfo = doc.data()
        })
        if (userInfo) {
            commit("setNameStatus", true);
        }
    },
    async setLogin({ commit }: { commit: any }) {
        commit("setisLoggedIn", true)
    },
    async setLogout({ commit }: { commit: any }) {
        commit("setisLoggedOut", false)
    },
    async setLikedPost({ commit }: { commit: any }, likeList) {

        commit("setLikedPost", likeList)
    },
    async AddFollowing({ commit }: { commit: any }, userName: string) {
        const auth = getAuth()
        const db = getFirestore()
        const user = auth.currentUser;
        if (user) {
            const ref = doc(db, "users", user.uid)
            let followingList: Array<string> = []
            const docSnap = await getDoc(ref)
            if (docSnap.exists()) {
                followingList = docSnap.data().following
            }
            let userId;
            const q = query(collection(db, "users"), where("name", "==", userName))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                userId = doc.data().id
                followingList.push(userId)
            })
            await updateDoc(ref, {
                following: followingList
            });
            commit("setFollowing", followingList)
        } else {
            alert("You need to login in first!")
        }
    },
    async CancelFollowing({ commit }: { commit: any }, userName: string) {
        const auth = getAuth()
        const db = getFirestore()
        const user = auth.currentUser;
        if (user) {
            const ref = doc(db, "users", user.uid)
            let followingList: Array<string> = []
            const docSnap = await getDoc(ref)
            if (docSnap.exists()) {
                followingList = docSnap.data().following
            }
            let userId;
            const q = query(collection(db, "users"), where("name", "==", userName))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                userId = doc.data().id
                const index = followingList.indexOf(userId)
                followingList.splice(index, 1)
            })

            await updateDoc(ref, {
                following: followingList
            });
            commit("setFollowing", followingList)
        } else {
            alert("You need to login in first!")
        }
    },



};

export default actions;
