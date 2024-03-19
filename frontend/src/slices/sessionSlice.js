import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import store from '../store.js';
import axios from "axios";
import { tagCleared } from "./tagsSlice.js";
import { dataCleared } from "./filesSlice.js";
import { ticketsCleared } from "./ticketSlice.js";
import { preloadedCleared } from "./loaderSlice.js";
const  {REACT_APP_BASE_URL} = process.env



export const signin = createAsyncThunk('session/signin', async ({ login, password }) => {
	const response = await axios.post(REACT_APP_BASE_URL+'/signin', { login, password })
		.catch(function (error) {
			console.log(Error.message);
		});
	store.dispatch(tokenUpdated(response.data.token));
	store.dispatch(authorized(response.data.data.user));
	/*  axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token; */
	/* store.dispatch(propsLoaded(response.data));
	store.dispatch(officeListLoaded(response.data));
	store.dispatch(getTags()); */
	return response.data;
});

export const signout = createAsyncThunk(
	"session/signout",
	async () => {
		store.dispatch(tagCleared());
		store.dispatch(dataCleared());
		store.dispatch(ticketsCleared());
		store.dispatch(preloadedCleared());
		store.dispatch(logout());
	});

const initialState = {
	token: '',
	isAdmin: false,
	login: '',
};

const sessionSlice = createSlice({
	name: "session",
	initialState,
	reducers: {
		tokenUpdated: (state, action) => {
			const token = 'Bearer ' + action.payload;
			state.token = token;
			localStorage.setItem('token', JSON.stringify(token));
		},
		authorized: (state, action) => {
			const { login, role, _id, office } = action.payload;
			state.login = login;
			state.id = _id;
			state.office = office;
			if (role === "admin") state.isAdmin = true;
		},
		logout: (state, action) => {
			localStorage.removeItem('token');
			return initialState;
		},
	}
});

export const selectAdminPermissions = (state) => state.session.isAdmin;
export const selectToken = (state) => state.session.token;
export const selectId = (state) => state.session.id;
export const selectLogin = (state) => state.session.login;


export const { tokenUpdated, authorized, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
