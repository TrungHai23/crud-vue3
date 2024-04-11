<template>
  <PostsPage :headersPosts="headers" :posts="posts"></PostsPage>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import PostsPage from "../components/PostsPage.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    PostsPage,
  },
  // mounted() {
  //   this.getPosts();
  // },
  setup() {
    const store = useStore();

    onMounted(() => getPosts());

    const headers = ref([
      {
        title: "Title",
        align: "start",
        sortable: false,
        key: "title",
      },
      { title: "Body", key: "body" },
      { title: "Actions", key: "actions", sortable: false },
    ]);

    const getPosts = () => {
      store.dispatch("getPosts");
    };

    return { headers, getPosts, posts: computed(() => store.state.post.posts) };
  },
});
</script>
