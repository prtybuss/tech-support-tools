import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets, ticketsSelector } from "../../slices/ticketSlice";
import { selectToken } from "../../slices/sessionSlice";
import TicketsList from "./TicketsList/TicketsList";
import Conversation from "./Chat/Conversation";
import { useChat } from "../../hooks/useChat";



const Servicedesk = () => {
	const token = useSelector(selectToken);
	const ticketsIds = useSelector(ticketsSelector.selectIds);
	const dispatch = useDispatch();

	const { getMessageHistory, currentTicketId } = useChat();


	useEffect(() => {
		dispatch(getTickets());
		if (ticketsIds) {
			let i;
			let l = ticketsIds.length;
			if (l = 1) { i = 0 } else i = l - 1;
			getMessageHistory(ticketsIds[i]);
		}
	}, [token, ticketsIds]);

	return (
		<>

			{ticketsIds && <TicketsList />}
			{currentTicketId && (<Conversation />)}

		</>
	)
}
export default Servicedesk;