import React from "react";
import classes from './Comment.module.css'
import formatDate from "../../../utils/formatDate";

const Comment = ({ text, created, author }) => {
	let { /* date,  */time } = formatDate(created);
	return (
		<div className={classes.Comment}
			date={time}>
			{text}

		</div>
	)
}

export default Comment;