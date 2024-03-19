import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../store";
import { officeListLoaded } from "./tagsSlice";
import { getTags } from "./tag";
const  {REACT_APP_BASE_URL} = process.env

const preloadedThingsAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.adress.localeCompare(b.adress),
});

export const getProps = createAsyncThunk('preloaded/getOfficePropsList', async () => {
	const response = await axios.get(`${REACT_APP_BASE_URL}/api/offices`);
	store.dispatch(propsLoaded(response.data));
	store.dispatch(officeListLoaded(response.data));
	store.dispatch(getTags());
	return response.data;
});

const loaderSlice = createSlice({
	name: "preloaded",
	initialState: preloadedThingsAdapter.getInitialState({
		entities: [],
		ip: [],
		numb: [],
		adress: [],
		ids: []
	}),
	reducers: {
		propsLoaded: preloadedThingsAdapter.setAll,
		preloadedCleared: preloadedThingsAdapter.removeAll,
	},
	extraReducers(builder) {
		builder
			.addCase(getProps.fulfilled, (state, action) => {
				const keys = ['ip', 'numb', 'adress'];
				const data = action.payload;
				const params = { ip: [], numb: [], adress: [] };
				keys.forEach(k => {
					data.forEach(p => {
						params[k].push({ [k]: p[k], id: p['id'] });
					})
				});
				keys.forEach(k => state[k] = params[k]);
				state.status = 'succeeded';
			})
	}
})

export const { propsLoaded, preloadedCleared } = loaderSlice.actions;

export const preloadedSelectors = preloadedThingsAdapter.getSelectors((state) => state.preloaded);

export const {
	selectById: selectOfficeById,
	selectIds: selectOfficeIds,
	selectEntities: selectOfficeEntities,
	selectAll: selectAllOffices,
	selectTotal: selectTotalOffices,
} = preloadedThingsAdapter.getSelectors((state) => state.preloaded);

export const selectPreloaded = (state) => state.preloaded;

export const selectPreloadedStatus = (state) => state.preloaded.status;
export const selectPreloadedNumbList = (state) => state.preloaded.numb;
export const selectPreloadedAdressList = (state) => state.preloaded.adress;


export const selectWithId = id => state => preloadedSelectors.selectById(state, id);
export default loaderSlice.reducer;
