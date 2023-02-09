import { Post } from "@/models/post";

export interface PostState {
    Allposts: Array<Post[]>,
    postByUser: Array<Post[]>,
    postsLikedByUser: Array<Post[]>,
    allFollowingId: Array<string>,
    allFollowingName: Array<string>,
    postsOfFollowing: Array<Post[]>,
    searchedPost: Array<Post[]>

}

function state(): PostState {
    return {
        Allposts: [],
        postByUser: [],
        postsLikedByUser: [],
        postsOfFollowing: [],
        allFollowingId: [],
        allFollowingName: [],
        searchedPost: []

    }
}
export default state;