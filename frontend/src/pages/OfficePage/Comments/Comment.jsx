import React, { useState } from "react";
import cl from './Comments.module.css'
import formatDate from "../../../utils/formatDate";
import { useOffice } from "../../../hooks/useOffice";

const Comment = ({ id, text, created, author, postByCurrentUser }) => {
	const [hovered, setHovered] = useState();
	const { deleteComment } = useOffice();
	const { date, time } = formatDate(created);

	const root = [cl.comment];
	if (postByCurrentUser === true) root.push(cl.postedByCurrentUser);

	return (
		<div
			className={root.join(" ")}
			onMouseOver={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className={cl.comment_details}>
				<div className={cl.comment__author}>					{postByCurrentUser ? 'автор - Вы' : author}				</div>
				<div className={cl.comment__date}> {date + " | " + time} </div>

				{postByCurrentUser && hovered && (
					<div className={cl.comment__deleteBtn} onClick={() => deleteComment(id)}> Удалить </div>
				)}
			</div>


			<div className={cl.comment_content}>
				<div className={cl.comment__text}> {text} </div>
			</div>


		</div>
	)
}

export default Comment;