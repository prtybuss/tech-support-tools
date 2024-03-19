import React, { useState } from "react";
import classes from './Message.module.css';
import formatDate from "../../../utils/formatDate";/*
import { selectId } from "../../../../slices/sessionSlice"; */
import { useDispatch, useSelector } from "react-redux";
import { selectMessage, deleteMessage } from "../../../slices/messagesSlice";

const Message = ({ msended, current, id, created, status }) => {
	const dispatch = useDispatch();
	const m = useSelector(selectMessage(id));
	const [hovered, setHovered] = useState();
	let { /* date,  */time } = formatDate(created);
	return (
		<div className={msended ? classes.msended : classes.mreceived}
			onMouseOver={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}>

			<div className={classes.mhead}>
				<div className={classes.mauthor}>
					{m.author.login}
				</div>

				<div className={classes.mtime}>
					{time}
				</div>

				<div className={classes.mstatus}>
					{(status === 'new') ? 'mark_chat_unread' : 'mark_email_read'}
				</div>

				{hovered && msended && (
					<div
						className={classes.mdelete_btn}
						onClick={() => dispatch(deleteMessage({ messageId: m.id, ticketId: current }))}>
						Удалить
					</div>)}
			</div>

			<div className={classes.mtext}>
				{m.text}
			</div>
		</div>

	)
}

export default Message;