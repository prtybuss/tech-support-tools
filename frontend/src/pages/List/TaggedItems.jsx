import React, { useMemo } from "react";
import classes from './Taglist.module.css';
import { useSelector } from "react-redux";
import ListItem from "./ListItem";
import { selectListIds } from "../../slices/tagListSlice";



function TaggedItems() {
	const taggedItems = useSelector(selectListIds);

	const TagListComponents = useMemo(() => taggedItems.map(itemId => {
		return (
			<ListItem
				key={itemId}
				id={itemId}
				rest={false}
			/>)
	}, [taggedItems]));

	return (
		<div className={classes.list_l} >
			{TagListComponents}
		</div>
	)
}
export default TaggedItems;