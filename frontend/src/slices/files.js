import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import office from "../services/office.service.js";
import store from "../store.js";


const initialState = {
	entities: [],
	ids: []
};

export const getDirectoryContent = createAsyncThunk('files/getDirContent', async ({ officeId, userId, subfolder }) => {
	
	try {
		const res = await office.getDirContent(officeId, userId, subfolder);
		store.dispatch(filesLoaded(res.data))
		return res.data;
	} catch (error) { console.error(error); }
})


const filesSlice = createSlice({
	name: 'files',
	initialState: {
		files: [],
		folders: [],
		status: 'idle',
	},
	reducers: {
		filesCleared: () => initialState,
		filesLoaded: (state, action) => {
			const filesList = action.payload;
			state.files = filesList?.filter(f => f.isDirectory === false);
			state.folders = filesList?.filter(f => f.isDirectory === true);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getDirectoryContent.rejected, (state, action) => {
				state.status = 'rejected'
			})
			.addCase(getDirectoryContent.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(getDirectoryContent.fulfilled, (state, action) => {
				state.status = 'succeeded';/* 
				const filesList = action.payload;

				state.files = filesList?.filter(f => f.isDirectory === false);
				state.folders = filesList?.filter(f => f.isDirectory === true); */
			})
	}
})
export const { filesLoaded, filesCleared } = filesSlice.actions;

export const selectFiles = (state) => state.files.files;
export const selectFolders = (state) => state.files.folders;
export const filesStatus = (state) => state.files.status;


export default filesSlice.reducer;