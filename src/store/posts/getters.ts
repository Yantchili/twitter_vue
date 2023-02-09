import { PostState } from "./state";
import { IState } from "..";
import { GetterTree } from "vuex";

const getters: GetterTree<PostState, IState> = {
    getAllPosts(state) {
        return state.Allposts;
    },
    getPostsByUser(state) {
        return state.postByUser;
    },
    getPostsLikedByUser(state) {
        return state.postsLikedByUser;
    },
    getFollowingId(state) {
        return state.allFollowingId;
    },
    getFollowingName(state) {
        return state.allFollowingName;
    },
    getPostsOfFollowing(state) {
        return state.postsOfFollowing;
    },
    getSearchedPost(state) {
        return state.searchedPost;
    },
};
export default getters;
