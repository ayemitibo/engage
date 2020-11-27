import Vue from "vue";
import Vuex from "vuex";
import { apolloClient } from "../apollo.config";
import gql from "graphql-tag";
import { UPLOAD_IMAGE, CREATE_POST } from "../queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userDetail: {},
  },
  mutations: {
    USER_DETAIL(state, userDetail) {
      state.userDetail = userDetail;
    },
  },
  actions: {
    async performLogin({ commit }, payload) {
      try {
        const loginMutation = gql`
          mutation login($identifier: String!, $password: String!) {
            login(input: { identifier: $identifier, password: $password }) {
              jwt
            }
          }
        `;
        const { identifier, password } = payload;
        const { data } = await apolloClient.mutate({
          mutation: loginMutation,
          variables: {
            identifier,
            password,
          },
          error(error) {
            throw error;
          },
        });
        localStorage.setItem("admin_token", data.login.jwt);
        return data;
      } catch (error) {
        throw error;
      }
    },
    async userProfile({ commit }) {
      const userProfileQuery = gql`
        query {
          me {
            username
            email
            role {
              name
            }
          }
        }
      `;
      const { data } = await apolloClient.query({
        query: userProfileQuery,
      });
      commit("USER_DETAIL", data.me);
    },
    async createPost({ commit }, payload) {
      try {
        const { data } = await apolloClient.mutate({
          mutation: UPLOAD_IMAGE,
          variables: {
            file: payload.post_image,
          },
          error(error) {
            throw error;
          },
        });
        await apolloClient.mutate({
          mutation: CREATE_POST,
          variables: {
            post_title: payload.post_title,
            post_detail: payload.post_detail,
            post_date: payload.post_date,
            post_image: data.upload.id,
            name: "Photo",
          },
          error(error) {
            throw error;
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
