import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import store from '../store.js';
import axios from "axios";

const initialState = {
	value: [],
	isActive: '',
	list: [],
	adressesAll: [],
}

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
	const response = await axios.get('api/getUniqTags');
	return response.data;
});

export const fetchTagList = createAsyncThunk('tags/fetchTagsList', async (clickedTagValue) => {
	store.dispatch(tagIsActive(clickedTagValue));
	try {
		const response = await axios.get(`api/getList/${clickedTagValue}`);
		return response.data;
	}
	catch (error) { console.error(error); }
});

export const addElToTagList = createAsyncThunk(
	"tags/addElToTagList",
	async ({ newTag, adress }) => {
		await axios.post('api/addTagToSelected', { newTag, adress })
			.catch(function (error) {
				console.log(error);
			})
			.then(store.dispatch(fetchTags()));
		return adress;
	});

export const removeElFromTagList = createAsyncThunk(
	"tags/removeElFromTagList",
	async ({ tag, adress }) => {
		await axios.post('api/removeTagFromSelected', { tag, adress })
			.catch(function (error) {
				console.log(error);
			})
		return adress;
	});

const tagsSlice = createSlice({
	name: "tags",
	initialState,
	reducers: {
		tagsLoaded: (state, action) => {
			state.value = action.payload;
		},
		officeListLoaded: (state, action) => {
			state.adressesAll = action.payload;
		},
		tagIsActive: (state, action) => {
			state.isActive = action.payload;
		},
		tagCleared: () => initialState
	},
	extraReducers(builder) {
		builder
			.addCase(fetchTags.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchTags.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.value = action.payload;
			})
			.addCase(fetchTagList.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchTagList.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.list = action.payload;
			})
			.addCase(addElToTagList.rejected, (state, action) => {
				state.status = 'failed'
			})
			.addCase(addElToTagList.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.list.push(action.payload);
			})
			.addCase(removeElFromTagList.rejected, (state, action) => {
				state.status = 'failed'
			})
			.addCase(removeElFromTagList.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.list = state.list.filter(el => el !== action.payload)
			});
	}
})


export const selectTags = (state) => state.tags.value;
export const selectTagsStatus = (state) => state.tags.status;
export const selectTagIsActive = (state) => state.tags.isActive;
export const selectTagList = (state) => state.tags.list;
export const selectNoTagList = (state) => state.tags.isActive ? (state.tags.adressesAll).filter(item => !state.tags.list.includes(item)) : [];

export const { tagAdded, tagRemoved, tagIsActive, tagIsActiveList, tagCleared, officeListLoaded } = tagsSlice.actions;


export default tagsSlice.reducer;
