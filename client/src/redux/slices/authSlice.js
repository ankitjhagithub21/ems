import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    loading:true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setUser: (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    },
})

export const { setUser,setLoading } = authSlice.actions

export default authSlice.reducer