import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import store from '../store.js';
import ticket from "../services/ticket.service.js";
import { getMessages } from "./messagesSlice.js";

const ticketsAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.updated.localeCompare(b.updated),
});

export const getTickets = createAsyncThunk('tickets/getAll', async () => {
	try {
		const res = await ticket.getAll();
		console.log('res.data', res.data);
		store.dispatch(ticketsLoaded(res.data));
	} catch (error) { console.error(error); }
})

export const markAllMessagesAsRead = createAsyncThunk('tickets/readAll', async ({ id }) => {
	try {
		const res = await ticket.readAllMessages({ id });
	} catch (error) { console.error(error); }
	store.dispatch(getMessages(id));
})

export const getTicketById = createAsyncThunk('tickets/getById', async ({ id }) => {
	const res = await ticket.getById(id)
	return res.data
})

export const createTicket = createAsyncThunk('tickets/create', async (initialTicket) => {
	const res = await ticket.create(initialTicket);
	store.dispatch(ticketAdded(res.data));
	return res.data
})

export const updateTicket = createAsyncThunk('tickets/update', async ({ ticketId, changes }) => {
	const res = await ticket.update({ ticketId, changes });
	store.dispatch(ticketUpdated({ id: ticketId, changes: { ...res.data } }));
	return res.data
})

const ticketsSlice = createSlice({
	name: 'tickets',
	initialState: ticketsAdapter.getInitialState(),
	reducers: {
		ticketsLoaded: ticketsAdapter.addMany,
		ticketAdded: ticketsAdapter.addOne,
		ticketUpdated: ticketsAdapter.updateOne,
		ticketsCleared: ticketsAdapter.removeAll
	}
})


export const { ticketsLoaded, ticketAdded, ticketProceed, ticketsCleared, ticketUpdated } = ticketsSlice.actions;

export const ticketsSelector = ticketsAdapter.getSelectors((state) => state.tickets);
export const selectTicketById = id => state => ticketsSelector.selectById(state, id);


export const selectAllTickets = ticketsSelector.selectAll;
export const selectNew = (state) => selectAllTickets.filter(t => t.status === 'new');

export default ticketsSlice.reducer;

