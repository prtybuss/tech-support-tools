import React, { useMemo } from "react";
import classes from './Taglist.module.css';
import { useSelector } from "react-redux";
import ListItem from "./ListItem";
import { selectNoTagListIds } from "../../slices/tagListSlice";

function UntaggedItems() {
	const untaggedItems = useSelector(selectNoTagListIds);


	const NoTagListComponents = useMemo(() => untaggedItems.map(itemId => {
		return (
			<ListItem
				key={itemId}
				id={itemId}
				rest={true}
			/>)
	}, [untaggedItems]));

	return (
		<div className={classes.list_r} >
			{NoTagListComponents}
		</div>
	)
}

export default UntaggedItems;