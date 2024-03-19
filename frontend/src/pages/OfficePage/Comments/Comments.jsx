import React, { useState, useMemo, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import cl from './Comments.module.css'
import Comment from './Comment'
import { useOffice } from "../../../hooks/useOffice";
import { comments } from "../../../slices/officeSlice";
import { selectId } from "../../../slices/sessionSlice";


const Comments = () => {
	const { postComment } = useOffice();
	const [newComment, setNewComment] = useState('');
	const officeComments = useSelector(comments);
	const newCommentInputRef = useRef();
	const userId = useSelector(selectId);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside)
	});

	function handleSubmit() {
		postComment({
			comment: newComment
		});
		setNewComment('')
	}
	const handleClickOutside = e => {
		if (!newCommentInputRef.current.contains(e.target))
			setNewComment('')
	};


	return (
		<>

			<div className={cl.Comments}>
				{officeComments.map(comment => {
					return (
						<Comment
							id={comment._id}
							key={comment._id}
							text={comment.text}
							author={comment.author.login}
							created={comment.created}
							postByCurrentUser={(comment.author._id === userId)} />
					)
				})}
			</div>

			<div className={cl.Comments_textarea} ref={newCommentInputRef} >
				<textarea
					placeholder="оставить комментарий"
					className={cl.Comments_textarea}
					value={newComment}
					onChange={e =>
						setNewComment(e.target.value)
					} />
				<button
					onClick={handleSubmit}
					className={cl.Comments__submit}
					disabled={
						newComment
							? false
							: true
					}	> OK
				</button>
			</div>

		</>
	)
}

export default Comments;