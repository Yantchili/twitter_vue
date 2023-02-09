
export interface User {

    name: string;
    id: string;
    email: string;
    following: Array<string>,
    follower: Array<string>,
    likedPost: Array<string>,
    photo: string
}

