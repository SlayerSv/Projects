import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!', userId: "3",
   date: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
   reactions: {
    thumbsUp: 3,
    love: 1,
    angry: 0,
    sad: 0,
    thinking: 1,
    surprised: 1
   }},
  { id: '2', title: 'Second Post', content: 'More text', userId: "4",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    reactions: {
      thumbsUp: 2,
      love: 2,
      angry: 1,
      sad: 1,
      thinking: 0,
      surprised: 0
     }
  },
  { id: '3', title: 'Third Post', content: 'More text', userId: "1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    reactions: {
      thumbsUp: 5,
      love: 10,
      angry: 3,
      sad: 2,
      thinking: 1,
      surprised: 0
     }
  },
]

export type Post = typeof initialState[0]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId: userId,
            date: new Date().toISOString(),
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
      const post = state.find(post => post.id);
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
