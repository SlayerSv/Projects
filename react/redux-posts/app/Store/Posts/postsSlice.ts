import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import type { Post, Category } from "../../../types/types";
import { postCategories } from "../../../types/types";

const initialState: Post[] = []

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, userId: string, category: Category) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            category,
            reactions: {
              thumbsUp: 0,
              love: 0,
              angry: 0,
              sad: 0,
              thinking: 0,
              surprised: 0
             }
          }
        }
      },
    },
    editPost(state, action) {
      const id = action.payload.id
      const post = state.find(post => post.id === id);
      if (!post) return;
      post.title = action.payload.title;
      post.content = action.payload.content;
    },
    deletePost(state, action) {
      state.filter(post => post.id !== action.payload)
    },
    addReaction(state, action) {
      const {postId, reactionName} = action.payload;
      const post = state.find(post => post.id === postId);
      if (!post) {return;}
      post.reactions[reactionName as keyof Post["reactions"]]++;
    }
  }
})

export const { addPost, editPost, deletePost, addReaction }  = postsSlice.actions;
export default postsSlice.reducer;