import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import store from '../store.js';
import tag from "../services/tag.service.js";
import { tagSetActive } from "./tag.js";
import { tagAdded, tagRemoved } from "./officeSlice.js";

const tagListAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.adress.localeCompare(b.adress),
});

export const getList = createAsyncThunk('tagList/getDetails', async (id) => {
	try {
		const res = await tag.getDetails(id);
		store.dispatch(listLoaded(res.data))
		store.dispatch(tagSetActive(id));
		return res.data;
	} catch (error) { console.error(error); }
})

export const addTag = createAsyncThunk('tagList/add', async ({ officeId, newTag }, { getState }) => {
	const res = await tag.post({ officeId, newTag });
	if ((getState().office.id === officeId) && newTag.tagId) store.dispatch(tagAdded(newTag.tagId))
	newTag.tagId
		? store.dispatch(liAdded(getState().preloaded.entities[officeId]))
		: console.log('надо диспатчить в слайс оффиса');
	return res.data
})

export const removeTag = createAsyncThunk('tagList/remove', async ({ officeId, tagId }, { getState }) => {
	const res = await tag.delete(officeId, tagId);
	if (getState().office.id === officeId) store.dispatch(tagRemoved(tagId));
	store.dispatch(liRemoved(officeId));
	return res.data
})

const tagListSlice = createSlice({
	name: 'tagList',
	initialState: tagListAdapter.getInitialState({ rest: [] }),
	reducers: {
		listLoaded: tagListAdapter.setAll,
		liAdded: tagListAdapter.addOne,
		liRemoved: tagListAdapter.removeOne,
		listCleared: tagListAdapter.removeAll,
	}
})

export const { listLoaded, liAdded, liRemoved, listCleared } = tagListSlice.actions;
export const tagListSelector = tagListAdapter.getSelectors((state) => state.tagList);
export const selectListIds = tagListSelector.selectIds;
/* 
const selectAllIds = (state) => state.preloaded.ids; */
export const selectNoTagListIds = (state) => state.preloaded.ids.filter(item => !state.tagList.ids.includes(item))

export default tagListSlice.reducer;


