import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./slices/messagesSlice";
import chatSlice from "./slices/chatSlice";

export default configureStore({
    reducer: {
        messages: messagesSlice,
        chat: chatSlice,
    }
})