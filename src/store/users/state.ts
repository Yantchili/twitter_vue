import { User } from "@/models/user";

export interface UserState {
    user: User[]
    ifNameExist: boolean,
    isLoggedIn: boolean,
    likedPost: Array<string>,
    following: Array<string>
}

function state(): UserState {
    return {
        user: [],
        ifNameExist: false,
        isLoggedIn: false,
        likedPost: [],
        following: []
    }
}
export default state;