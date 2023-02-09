import { User } from "@/models/user";
import { MutationTree } from "vuex";
import { UserState } from "./state";

const mutations: MutationTree<UserState> = {
    setUsers(state: UserState, user: User[]) {
        state.user = user;
    },
    setNameStatus(state: UserState, value: boolean) {
        state.ifNameExist = value
    },
    setisLoggedIn(state: UserState, value: boolean) {
        state.isLoggedIn = value
    },
    setisLoggedOut(state: UserState, value: boolean) {
        state.isLoggedIn = value
    },
    setLikedPost(state: UserState, list: Array<string>) {
        state.likedPost = list
    },
    setFollowing(state: UserState, list: Array<string>) {
        state.following = list
    },


}

export default mutations;
