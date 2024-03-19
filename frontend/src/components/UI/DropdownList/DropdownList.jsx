import React from "react";
import { useSelector } from "react-redux";
import cl from "./DropdownList.module.css"
import { tags } from "../../../slices/officeSlice";

const DropdownList = ({ searchResults, setNewTagName, setNewTagId, newTagName, hide }) => {
	const officeTags = useSelector(tags);

	const clickHandle = (tag) => {
		if (officeTags.some(t => t._id === tag.id)) {
			window.alert('тег уже добавлен');
		} else {
			setNewTagName(tag.name);
			setNewTagId(tag._id)
		}
		hide();
	}
	const DropdownListComponents = searchResults.map(tag => {
		return (
			<div
				className={cl.dropdown_ul}
				onClick={() => clickHandle(tag)}
				key={tag._id}
				id={tag._id}>
				{tag.name}
			</div>
		)
	})
	return (
		<div className={cl.dropdown} >
			{DropdownListComponents}
		</div>
	)
}
export default DropdownList;