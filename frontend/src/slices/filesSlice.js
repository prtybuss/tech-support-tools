import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: [],
  status: 'idle',
};

export const fetchFiles = createAsyncThunk('files/fetchFiles', async ({ ip, subfolder }) => {
  console.log('{ ip, subfolder }', { ip });
  if (subfolder === undefined) console.log('ПУСТАЯ СТРОКА');
  const response = await axios.post('api/getFolderContent', { ip, subfolder })
    .catch(function (error) {
      console.log(Error.message);
    })
  return response.data;
});

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    dataLoaded: (state, action) => {
      state.value = action.payload;
    },
    dataCleared: () => initialState
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFiles.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
/*         filter(e => e['isDirectory'] == true);
 */      })

  }
})
export const { dataCleared } = filesSlice.actions;

export const selectFiles = (state) => state.files.value.filter(e => e['isDirectory'] === false);
export const selectFolders = (state) => state.files.value.filter(e => e['isDirectory'] === true);
export const selectFilesStatus = (state) => state.files.status;

export default filesSlice.reducer;