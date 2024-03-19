import React, { useState } from "react";
import classes from './ListItem.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectWithId } from "../../slices/loaderSlice";
import { addTag, removeTag } from "../../slices/tagListSlice";
import { useTags } from "../../hooks/useTags";
import { useOffice } from "../../hooks/useOffice";


const ListItem = ({ id, rest }) => {
	const { addToList, removeFromList } = useTags();
	const { getOfficeDetails } = useOffice();
	const navigate = useNavigate();
	const listItem = useSelector(selectWithId(id));
	const [isHovered, setIsHovered] = useState(false);
	const root = [classes.ListItem];
	if (rest === true) root.push(classes.RestItems);

	return (
		<div
			onMouseOver={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={root.join(' ')}>
			<span
				className={classes.listItem_span}
				onClick={() => navigate(`/dashboard/${listItem['id']}`)}
			>
				{listItem['adress']} </span>

			{isHovered && (
				<span
					className={"msymb_icon " + classes.ListItemButton}
					onClick={
						(rest === true)
							? () => addToList(listItem['id'])
							: () => removeFromList(listItem['id'])}>
					{rest === true ? 'add' : 'remove'}
				</span>
			)}
		</div>
	)
}
export default ListItem;
