import { createStore } from "vuex";
// import axios, { AxiosResponse } from "axios";
import postsModule from "./post";

// interface Post {
//   id: number;
//   title: string;
//   body: string;
// }

// interface State {
//   posts: Post[];
// }

export default createStore({
  // state: {
  //   posts: [],
  // },
  // getters: {},
  // mutations: {
  //   DELETE_POST(state, postId: number) {
  //     state.posts = state.posts.filter((post) => post.id !== postId);
  //   },
  //   ADD_POST(state, newPost: Post) {
  //     state.posts.unshift(newPost);
  //   },
  //   GET_POST(state, posts: Post[]) {
  //     state.posts = posts;
  //   },
  //   EDIT_POST(state, editedPost: Post) {
  //     const index = state.posts.findIndex((post) => post.id === editedPost.id);
  //     if (index !== -1) {
  //       state.posts.splice(index, 1, editedPost);
  //     }
  //   },
  // },
  // actions: {
  //   async deletePost({ commit }, postId: number) {
  //     try {
  //       await axios.delete(
  //         `https://jsonplaceholder.typicode.com/posts/${postId}`
  //       );
  //       commit("DELETE_POST", postId);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   async addPost({ commit }, newPost: Post) {
  //     try {
  //       await axios.post<Post, AxiosResponse<Post>>(
  //         `https://jsonplaceholder.typicode.com/posts`,
  //         newPost
  //       );
  //       commit("ADD_POST", newPost);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   async getPosts({ commit }) {
  //     try {
  //       const response = await axios.get<Post[]>(
  //         "https://jsonplaceholder.typicode.com/posts"
  //       );
  //       commit("GET_POST", response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   async editPost({ commit }, editedPost: Post) {
  //     try {
  //       await axios.put<Post, AxiosResponse<Post>>(
  //         `https://jsonplaceholder.typicode.com/posts/${editedPost.id}`,
  //         editedPost
  //       );
  //       commit("EDIT_POST", editedPost);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // },
  modules: {
    post: postsModule,
  },
});
