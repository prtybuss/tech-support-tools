import React, { useState } from "react";
import cl from './Comments.module.css'
import formatDate from "../../../utils/formatDate";
import { useOffice } from "../../../hooks/useOffice";

const Comment = ({ id, text, created, author, postByCurrentUser }) => {
	const [hovered, setHovered] = useState();
	const { deleteComment } = useOffice();
	const { date, time } = formatDate(created);

	const root = [cl.Comment];
	if (postByCurrentUser === true) root.push(cl.MyComment);

	return (
		<div
			className={root.join(" ")}
			onMouseOver={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className={cl.Comment__text}> {text} </div>
			<div className={cl.Comment__date}> {date + " | " + time} </div>

			{postByCurrentUser && hovered && (
				<div className={cl.Comment__deleteBtn} onClick={() => deleteComment(id)}> Удалить </div>
			)}
			{postByCurrentUser === false && (
				<div className={cl.Comment__author}>{author}</div>
			)}
		</div>
	)
}

export default Comment;