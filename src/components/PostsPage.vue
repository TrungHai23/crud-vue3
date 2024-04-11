<template>
  <v-data-table
    :headers="headersPosts"
    :items="posts"
    :sort-by="[{ key: 'id', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- dialog create -->
        <v-dialog v-model="dialogCreate" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="green" dark v-bind="props">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">New Item</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-col>
                  <v-row cols="12" md="4" sm="6">
                    <v-text-field
                      label="Title"
                      v-model="newPost.title"
                    ></v-text-field>
                  </v-row>
                  <v-row cols="12" md="4" sm="6">
                    <v-text-field
                      label="Body"
                      v-model="newPost.body"
                    ></v-text-field>
                  </v-row>
                </v-col>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeCreate">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="addPost">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- dialog delete -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deletePost(postToDelete.id)"
                >OK</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- dialog edit -->
        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit Item</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-col>
                  <v-row cols="12" md="4" sm="6">
                    <v-text-field
                      label="Title"
                      v-model="editedPost.title"
                    ></v-text-field>
                  </v-row>
                  <v-row cols="12" md="4" sm="6">
                    <v-text-field
                      label="Body"
                      v-model="editedPost.body"
                    ></v-text-field>
                  </v-row>
                </v-col>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeEdit">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="saveEdit">
                Save Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-col-6
        ><v-icon color="blue" class="me-2" size="small" @click="editPost(item)">
          mdi-pencil
        </v-icon>
        <v-tooltip activator="parent" location="top">edit post</v-tooltip>
      </v-col-6>
      <v-col-6>
        <v-icon color="red" size="small" @click="openDeleteDialog(item)">
          mdi-delete
        </v-icon>
        <v-tooltip activator="parent" location="top">delete post</v-tooltip>
      </v-col-6>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent, watch, PropType, ref } from "vue";
import { useStore } from "vuex";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default defineComponent({
  props: {
    headersPosts: {
      required: true,
      type: Array as any,
    },
    posts: {
      required: true,
      type: Array as PropType<Post[]>,
    },
  },

  setup() {
    const store = useStore();
    const dialogCreate = ref(false);
    const dialogDelete = ref(false);
    const dialogEdit = ref(false);

    const newPost = ref({} as Post);
    const editedPost = ref({} as Post);
    const postToDelete = ref({} as Post);

    // add post
    const addPost = () => {
      store.dispatch("addPost", { ...newPost.value });
      dialogCreate.value = false;
    };

    // delete post
    const openDeleteDialog = (post: Post) => {
      postToDelete.value = post;
      dialogDelete.value = true;
    };

    const deletePost = (postId: number) => {
      store.dispatch("deletePost", postId);
      dialogDelete.value = false;
    };

    // edit post
    const editPost = (post: Post) => {
      editedPost.value.id = post.id;
      editedPost.value.title = post.title;
      editedPost.value.body = post.body;
      dialogEdit.value = true;
    };

    const saveEdit = () => {
      store.dispatch("editPost", { ...editedPost.value });
      dialogEdit.value = false;
    };

    // close dialog
    const closeCreate = () => {
      dialogCreate.value = false;
      resetForm();
    };

    const closeEdit = () => {
      dialogEdit.value = false;
    };
    const closeDelete = () => {
      dialogDelete.value = false;
    };

    // reset form
    const resetForm = () => {
      newPost.value.title = "";
      newPost.value.body = "";
    };

    watch(dialogCreate, (newVal) => {
      if (!newVal) {
        resetForm();
      }
    });

    return {
      dialogCreate,
      dialogDelete,
      dialogEdit,
      newPost,
      editedPost,
      postToDelete,
      deletePost,
      openDeleteDialog,
      editPost,
      addPost,
      closeCreate,
      closeDelete,
      closeEdit,
      saveEdit,
      resetForm,
    };
  },
});
</script>
