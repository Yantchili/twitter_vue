import { Post } from "@/models/post";
import { MutationTree } from "vuex";
import { PostState } from "./state";
const mutations: MutationTree<PostState> = {
    setAllPosts(state: PostState, posts: Array<Post[]>) {
        state.Allposts = posts;
    },
    setPostByUser(state: PostState, posts: Array<Post[]>) {
        state.postByUser = posts;
    },
    setPostLikedByUser(state: PostState, posts: Array<Post[]>) {
        state.postsLikedByUser = posts;
    },
    setFollowingID(state: PostState, id: Array<string>) {
        state.allFollowingId = id;
    },
    setAllFollowingName(state: PostState, name: Array<string>) {
        state.allFollowingName = name;
    },
    setPostsOfFollowing(state: PostState, posts: Array<Post[]>) {
        state.postsOfFollowing = posts;
    },
    setSearchedPost(state: PostState, posts: Array<Post[]>) {
        state.searchedPost = posts
    },

}

export default mutations;
