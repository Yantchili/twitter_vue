import { computed } from "vue";
import { useStore } from "vuex";

const useAuth = () => {
    const store = useStore();
    return {
        isLogin: computed(() => store.getters['users/getUserLogin']),
        users: computed(() => store.getters["users/getUser"]),
        getNameStatus: computed(() => store.getters["users/getNameStatus"]),
        getLikeList: computed(() => store.getters["users/getLikeList"]),
        setisLoggedIn: () => store.dispatch("users/setLogin"),
        setisLoggedOut: () => store.dispatch("users/setLogout"),
        fetchUsers: () => store.dispatch("users/fetchUsers"),
        NamaExiste: (name: string) => store.dispatch("users/NamaExiste", name),
        AddFollowing: (name: string) => store.dispatch("users/AddFollowing", name),
        CancelFollowing: (name: string) => store.dispatch("users/CancelFollowing", name),
        setLikedPost: (likeList: Array<string>) => store.dispatch("users/setLikedPost", likeList),
    };
};

export default useAuth;
