import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllChats, getChat } from "../../api/apiChat";
  
const ChatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [], 
        chat: {},
        loading: false,
        error: null,
    },
    reducers: {
        setChat: (state, action) => {
            state.chat = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentChat.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentChat.fulfilled, (state, action) => {
                state.chat = action.payload;
                console.log(state.chat);
                state.loading = false;
            })
            .addCase(getCurrentChat.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getChats.pending, (state) =>{
                state.loading = true;
            })
            .addCase(getChats.fulfilled, (state, action) => {
                state.chats = action.payload;
                state.loading = false;
            })
            .addCase(getChats.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    },

});

export const getCurrentChat = createAsyncThunk(
    'chat/getCurrentChat', 
    async (activeChat, { rejectWithValue }) => {
      try {
        const loadChat = await getChat(activeChat);
        console.log(loadChat);
        return loadChat;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);
export const getChats = createAsyncThunk(
    'chat/getChats', 
    async () => {
      try {
        const loadChats = await getAllChats();
        return loadChats;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);
  
export const { setChat } = ChatSlice.actions;
export default ChatSlice.reducer;