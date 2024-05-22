import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import cl from '../OfficePage.module.css'
import { tagsSelector } from "../../../slices/tag";
import { tags } from "../../../slices/officeSlice";
import DropdownList from "../../../components/UI/DropdownList/DropdownList";
import { useTags } from "../../../hooks/useTags";
import { useOffice } from "../../../hooks/useOffice";


function NewTagInput() {
	const { addToList } = useTags();
	const { currentOffice } = useOffice();
	const [tagName, setTagName] = useState('');
	const [tagId, setTagId] = useState();
	const [hidden, setHidden] = useState(true);
	const [showSearchResults, setShowSearchResults] = useState(false);
	const inputRef = useRef(null);
	const tagEditBlockRef = useRef(null);
	const allTags = useSelector(tagsSelector.selectAll);
	const officeTags = useSelector(tags);

	useEffect(() => { inputRef.current.focus() }, [hidden])
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});
	useEffect(() => {
		sortedSearchedTags ?
			setShowSearchResults(true)
			: setShowSearchResults(false)
	}, [tagName])

	const handleClickOutside = e => {
		if (!tagEditBlockRef.current.contains(e.target)) {
			setHidden(true);
			setTagName('');
		}
	};

	const sortedTags = useMemo(() => {
		if (tagName && allTags) return allTags.sort((a, b) => a.name.localeCompare(b.name));
	}, [tagName, allTags]);

	const sortedSearchedTags = useMemo(() => {
		if (tagName && allTags) return (sortedTags.filter(tag => tag.name.toLowerCase().includes(tagName.toLowerCase())))
	}, [tagName, sortedTags]);


	const submitNewTag = async () => {
		if (tagName && officeTags.some(tag => tag.name !== tagName)) {
			addToList(currentOffice, { name: tagName });
			setTagName('');
		};
		return (setHidden(true))
	};

	return (
		<div id="NewTagInput"
			className={cl.dd_list}
			ref={tagEditBlockRef}
			onClick={() => setHidden(false)}>

			<input
				placeholder="tag text"
				className="Myinput"
				onChange={e => {
					setTagName(e.target.value.toLowerCase());
				}}
				ref={inputRef}
				type='text'
				hidden={hidden}
				value={tagName} />

			{(sortedSearchedTags && showSearchResults) &&
				<DropdownList
					searchResults={sortedSearchedTags}
					setTagName={setTagName}
					setTagId={setTagId}
					submit={submitNewTag}
					hide={() => setHidden(true)} 
					hideSearchResults={()=>setShowSearchResults(false)}/>}


			<div className="msymb_icon" onClick={(hidden) ? () => setHidden(false) : submitNewTag}>
				{hidden
					? 'add'
					: 'check'
				}
			</div>
		</div>
	)
}
export default NewTagInput;

