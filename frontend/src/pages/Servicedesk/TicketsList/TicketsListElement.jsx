import React from "react";
import classes from './TicketsList.module.css';
import { useChat } from "../../../hooks/useChat";
import formatDate from "../../../utils/formatDate";

const TicketsListElement = ({ id, authorName, theme, created }) => {
  const { currentTicketId, setCurrentTicketId, getMessageHistory } = useChat();
  console.log(' id, authorName, theme, created ', id, authorName, theme, created );
  const { /* date,  */time } = formatDate(created);
  return (
    <div className={(id !== currentTicketId) ? classes.list_element : classes.list_element_picked}
      id={id} onClick={() => getMessageHistory(id)}   >
      <div className={classes.le_authorName}> {authorName}</div>
      <div className={classes.le_date}> {time}</div>
      <div className={classes.le_theme}>{theme}</div>
    </div>

  )
}

export default TicketsListElement;