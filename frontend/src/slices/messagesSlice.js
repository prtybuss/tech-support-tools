import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import store from '../store.js';
import message from "../services/message.service.js";

const messagesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.edited.localeCompare(b.edited),
});

export const getMessages = createAsyncThunk('messages/getAll', async (id) => {
  try {
  const res = await message.getAll(id);
  store.dispatch(messagesLoaded(res.data));
  return res.data
  } catch (error) { console.error(error); }
})

export const createMessage = createAsyncThunk('messages/create', async (initialMessage) => {
  try {
    const res = await message.create(initialMessage);
    store.dispatch(messageAdded(res.data));
  } catch (error) { console.error(error); }
})

export const deleteMessage = createAsyncThunk('messages/delete', async ({ ticketId, messageId }) => {
  try {
  await message.delete({ ticketId, messageId });
  store.dispatch(messageDeleted(messageId));
  }  catch (error) { console.error(error) }
})

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    messagesLoaded: messagesAdapter.setAll,
    messageAdded: messagesAdapter.addOne,
    messageDeleted: messagesAdapter.removeOne,
    messagesRead: messagesAdapter.updateMany,
  }
})

export const { messagesLoaded, messageAdded, messageDeleted, messagesRead  } = messagesSlice.actions;

export const messagesSelector = messagesAdapter.getSelectors((state) => state.messages);
export const selectMessage = id => state => messagesSelector.selectById(state, id);

export default messagesSlice.reducer;
