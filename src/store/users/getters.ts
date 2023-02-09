import { UserState } from "./state";
import { IState } from "..";
import { GetterTree } from "vuex";

const getters: GetterTree<UserState, IState> = {
    getUser(state) {
        return state.user;
    },
    getNameStatus(state) {
        return state.ifNameExist
    },
    getUserLogin(state) {
        return state.isLoggedIn
    },
    getLikeList(state) {
        return state.likedPost
    },


};
export default getters;
