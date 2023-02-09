import { IState } from "..";
import { UserState } from "./state";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { Module } from "vuex";
const usersModule: Module<UserState, IState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};

export default usersModule;