import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import store from '../store.js';
import { tagSetActive } from "./tag.js";
import office from "../services/office.service.js";


export const getOfficeData = createAsyncThunk('office/getDetails', async (officeId) => {
	try {
		const res = await office.getDetails(officeId);
		store.dispatch(dataLoaded(res.data));
		store.dispatch(tagSetActive(''));
		return res.data;
	}
	catch (error) { console.error(error); }
})



/*   ~~~~~~~~~~~~   Comments   ~~~~~~~~~~~~~  */
export const postComment = createAsyncThunk('office/postComment', async ({ officeId, comment }) => {
	try {
		const res = await office.postComment({ officeId, comment });
		store.dispatch(commentsUpdated(res.data));
		return res.data
	}
	catch (error) { console.error(error); }
})

export const removeComment = createAsyncThunk('office/removeComment', async ({ officeId, commentId }) => {
	try {
		const res = await office.deleteComment({ officeId, commentId });
		store.dispatch(commentsUpdated(res.data));
		return res.data
	}
	catch (error) { console.error(error); }
})



/*  ~~~~~~~~~~~~   Links   ~~~~~~~~~~~~~  */
export const postLink = createAsyncThunk('office/postLink', async ({ officeId, link }) => {
	try {
		const res = await office.postLink({ officeId, link });
		store.dispatch(linksUpdated(res.data));
	}
	catch (error) { console.error(error); }
})

export const removeLink = createAsyncThunk('office/removeLink', async ({ officeId, linkId }) => {
	try {
		const res = await office.removeLink({ officeId, linkId });
		store.dispatch(linksUpdated(res.data));
	}
	catch (error) { console.error(error); }
})



/*  ~~~~~~~~~~~~   Hardware   ~~~~~~~~~~~~~  */
export const updateOfficeInfo = createAsyncThunk('office/updateInfo', async ({ officeId, update }) => {
	try {
		const res = await office.updateInfo({ officeId, update });
		return res.data;
	}
	catch (error) { console.error(error); }
})



const officeSlice = createSlice({
	name: 'office',
	initialState: {
		ip: '',
		numb: '',
		adress: '',
		adressFull: '',
		tags: [],
		links: [],
		comments: [{
			text: '',
			author: '',
			created: ''
		}],
		hardware: {
			info: '',
			edited: ''
		},
		users: [],
		imgs: []
	},
	reducers: {
		dataLoaded: (state, action) => {
			Object.assign(state, action.payload);
		},
		linksUpdated: (state, action) => {
			state.links = action.payload;
		},
		tagAdded: (state, action) => {
			state.tags.push(action.payload);
		},
		tagRemoved: (state, action) => {
			state.tags = state.tags.filter(tag => tag !== action.payload);
		},
		commentsUpdated: (state, action) => {
			state.comments = action.payload
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getOfficeData.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(getOfficeData.fulfilled, (state, action) => {
				state.status = 'succeeded'
			})
	}
})


export const dataStatus = (state) => state.office.status
export const selectOffice = (state) => state.office;
export const ip = (state) => state.office.ip;
export const adress = (state) => state.office.adressFull;
export const numb = (state) => state.office.numb;
export const tags = (state) => state.office.tags;
export const comments = (state) => state.office.comments;
export const links = (state) => state.office.links;
export const hardware = (state) => state.office.hardware;
export const users = (state) => state.office.users;
export const imgs = (state) => state.office.imgs
export const imgsIds = createSelector(imgs, imgs => imgs.map(img => img._id));

export const { dataLoaded, linksUpdated, tagAdded, tagRemoved, commentsUpdated } = officeSlice.actions;


export default officeSlice.reducer;

