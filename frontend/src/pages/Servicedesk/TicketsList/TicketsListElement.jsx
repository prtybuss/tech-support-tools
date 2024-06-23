import React from "react";
import classes from './TicketsList.module.css';
import { useChat } from "../../../hooks/useChat";
import formatDate from "../../../utils/formatDate";

const TicketsListElement = ({ id, authorName, theme, created }) => {
	const { currentTicketId, setCurrentTicketId, getMessageHistory } = useChat();
	let { date, time } = formatDate(created);
	return (
		<div className={(id !== currentTicketId) ? classes.list_element : classes.list_element_picked}
			id={id} onClick={() => getMessageHistory(id)} key={id} >
			<div className={classes.le_authorName} key={authorName}> {authorName}</div>
			<div className={classes.le_date} key={time}> {time}</div>
			<div className={classes.le_theme} key={theme}>{theme}</div>
		</div>

	)
}

export default TicketsListElement;