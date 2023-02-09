import { IState } from "..";
import { PostState } from "./state";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { Module } from "vuex";
const postsModule: Module<PostState, IState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};

export default postsModule;