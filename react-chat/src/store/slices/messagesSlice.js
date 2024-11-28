import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllMessages } from "../../api/apiMessage";

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
        loading: false,
        error: null,
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessages: (state, action) => {
            state.messages=[...state.messages, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.loading = false;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages', 
    async (activeChat, { rejectWithValue }) => {
      try {
        const loadMessages = await getAllMessages(activeChat);
        return loadMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const { setMessages, addMessages, handleCentrifugoMessage } = messagesSlice.actions;
export default messagesSlice.reducer;