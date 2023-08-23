import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!', userId: "3",
   date: new Date(Date.now() - 1000 * 60 * 60).toISOString()},
  { id: '2', title: 'Second Post', content: 'More text', userId: "4",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  { id: '3', title: 'Third Post', content: 'More text', userId: "1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString()
  },
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
            userId: userId,
            date: new Date().toISOString()
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
