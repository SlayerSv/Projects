import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!', userId: "3" },
  { id: '2', title: 'Second Post', content: 'More text', userId: "4" }
]

type post = typeof initialState[0]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<post>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId: userId
          }
        }
      },
    },
    editPost(state, action) {
      const post = state.find(post => post.id);
      if (!post) return;
      post.title = action.payload.title;
      post.content = action.payload.content;
    },
    deletePost(state, action) {
      state.filter(post => post.id !== action.payload)
    }
  }
})

export const { addPost, editPost, deletePost }  = postsSlice.actions;
export default postsSlice.reducer;
