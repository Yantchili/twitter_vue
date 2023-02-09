import { computed } from "vue";
import { useStore } from "vuex";

const usePost = () => {
    const store = useStore();
    return {
        AllPosts: computed(() => store.getters["posts/getAllPosts"]),
        PostsByUser: computed(() => store.getters["posts/getPostsByUser"]),
        PostsLikedByUser: computed(() => store.getters["posts/getPostsLikedByUser"]),
        FollowingId: computed(() => store.getters["posts/getFollowingId"]),
        FollowingName: computed(() => store.getters["posts/getFollowingName"]),
        PostsOfFollowing: computed(() => store.getters["posts/getPostsOfFollowing"]),
        SearchedPost: computed(() => store.getters["posts/getSearchedPost"]),
        fetchAllPosts: () => store.dispatch("posts/fetchAllPosts"),
        postFlit: () => store.dispatch("posts/postFlit"),
        SetIsliked: () => store.dispatch("posts/SetIsliked"),
        SetUnliked: () => store.dispatch("posts/SetUnliked"),
        getPostbyUser: (userName: string) => store.dispatch("posts/fetchPostsbyUser", userName),
        getPostLikedbyUser: (userName: string) => store.dispatch("posts/fetchPostsLikedbyUser", userName),
        fetchFollowingId: (userName: string) => store.dispatch("posts/fetchFollowingId", userName),
        fetchFollowingName: (idList: Array<string>) => store.dispatch("posts/fetchFollowingName", idList),
        fetchFollowingpost: (authorList: Array<string>) => store.dispatch("posts/fetchFollowingpost", authorList),
        fetchSearchedPost: (searchTerm: string) => store.dispatch("posts/fetchSearchedPost", searchTerm),
    };
};

export default usePost;
