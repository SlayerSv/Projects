import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'

export const postCategories = {
  CODING: "Coding",
  FOOD: "Food",
  STYLE: "Style",
  TRAVEL: "Travel",
  RELATIONSHIPS: "Relationships"
}

export interface Post {
  id: string,
  title: string,
  content: string,
  userId: string,
  date: string,
  category: keyof typeof postCategories,
  reactions: {
    thumbsUp: number,
    love: number,
    angry: number,
    sad: number,
    thinking: number,
    surprised: number
   }

}

const initialState = [
  {
    id: '1',
    title: "Post 1",
    content: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud" +
    "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor" +
    " in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." +
    " Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt" +
    " mollit anim id est laborum.",
    userId: "3",
    date: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    category: postCategories.TRAVEL,
    reactions: {
      thumbsUp: 3,
      love: 1,
      angry: 0,
      sad: 0,
      thinking: 1,
      surprised: 1
   }},
  {
    id: '2',
    title: "Post 2",
    content: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud" +
    "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor" +
    " in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." +
    " Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt" +
    " mollit anim id est laborum.",
    userId: "4",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    category: postCategories.RELATIONSHIPS,
    reactions: {
      thumbsUp: 2,
      love: 2,
      angry: 1,
      sad: 1,
      thinking: 0,
      surprised: 0
     }
  },
  {
    id: '3',
    title: "Post 3",
    content: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud" +
    "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor" +
    " in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." +
    " Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt" +
    " mollit anim id est laborum.",
    userId: "1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    category: postCategories.STYLE,
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

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, userId: string, category: keyof typeof postCategories) {
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