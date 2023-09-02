import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', name: 'Mike Hanson' },
  { id: '2', name: 'Steve Jacobson' },
  { id: '3', name: 'Angela Johns' },
  { id: '4', name: 'Maria Dubrovina' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    
  }
})

export const { }  = usersSlice.actions;
export default usersSlice.reducer;