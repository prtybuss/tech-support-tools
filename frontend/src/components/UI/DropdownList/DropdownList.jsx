import React, { useId } from "react";
import { useSelector } from "react-redux";
import cl from "./DropdownList.module.css"
import { tags } from "../../../slices/officeSlice";
import { useTags } from "../../../hooks/useTags";
import { useOffice } from "../../../hooks/useOffice";


const DropdownList = ({ searchResults, setTagName, setTagId, hide,hideSearchResults }) => {
	const { currentOffice } = useOffice();
	const officeTags = useSelector(tags);
	const { addToList } = useTags();


	const submitPicked = async (tag) => {
		if (officeTags.some(id => id === tag.id)) {
			window.alert('уже добавлен');
		} else {
			if ((officeTags[0] === undefined) || (officeTags.indexOf(tag.id) === -1)) {
				addToList(currentOffice, { tagId: tag.id });
				setTagName('');
			}
		}
		hideSearchResults();
		hide();
	};


	const DropdownListComponents = searchResults?.map(tag => {
		return (
			<div
				className={cl.dropdown_ul}
				onClick={() => submitPicked(tag)}
				key={tag.id}
				id={tag.id}>
				{tag.name}
			</div>
		)
	})


	if (searchResults[0]) return (
		<div className={cl.dropdown} >
			{DropdownListComponents}
		</div>
	)
}
export default DropdownList;