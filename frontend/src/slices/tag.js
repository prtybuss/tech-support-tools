import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import store from '../store.js';
import tag from "../services/tag.service.js";
import { listLoaded } from "./tagListSlice.js";

const tagsAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.name.localeCompare(b.name),
});
const initialState = {
	entities: [],
	ids: []
};
export const getTags = createAsyncThunk('taggs/getAll', async () => {
	try {
		const res = await tag.getAll();
		res.data.map(el => el.active === false);
		store.dispatch(tagsLoaded(res.data));
	} catch (error) { console.error(error); }
})
export const getDetails = createAsyncThunk('taggs/getDetails', async (id) => {
	try {
		const res = await tag.getDetails(id);
		store.dispatch(listLoaded(res.data));
		return res.data;
	} catch (error) { console.error(error); }
})

export const createtag = createAsyncThunk('taggs/create', async (initialtag) => {
	const res = await tag.post(initialtag);
	store.dispatch(tagAdded(res.data));
	return res.data
})

const tagsSlice = createSlice({
	name: 'taggs',
	initialState,
	reducers: {
		tagsLoaded: tagsAdapter.setAll,
		tagAdded: tagsAdapter.addOne,
		tagUpdated: tagsAdapter.updateOne,
		tagsUpdated: tagsAdapter.updateMany,
		tagRemoved: tagsAdapter.removeOne,
		tagsCleared: tagsAdapter.removeAll,
		tagSetActive(state, action) {

			Object.values(state.entities).forEach(tag =>
				!(tag.active))
			if (action.payload) {
				const id = action.payload;
				state.entities[id].active = !state.entities[id].active
			}
		}
	}
})
export const { tagsLoaded, tagSetActive, tagAdded, tagRemoved, tagsCleared, tagUpdated } = tagsSlice.actions;
export const tagsSelector = tagsAdapter.getSelectors((state) => state.taggs);
export const selectAlltags = tagsSelector.selectAll;
export const selectTagsIds = tagsSelector.selectIds;

export const selectCurrentTag = createSelector(
	tagsSelector.selectAll,
	(tags) => tags.filter(t => t.active === true)
);
export const selectTagsNames = createSelector(tagsSelector.selectAll, (tags) => tags.map(tag => tag.name));
export const selectTagWithId = id => state => tagsSelector.selectById(state, id);
export default tagsSlice.reducer;

