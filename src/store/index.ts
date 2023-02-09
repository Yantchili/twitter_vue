import postsModule from './posts';
import usersModule from './users';
import { createStore } from 'vuex'
export interface IState {
  authUser: null;
}

export default createStore<IState>({
  modules: {
    users: usersModule,
    posts: postsModule
  }
})
