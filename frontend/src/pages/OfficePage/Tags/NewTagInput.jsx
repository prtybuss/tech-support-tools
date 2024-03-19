import React, { useState, useRef, useEffect, useMemo } from "react";
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
	const [newTagName, setNewTagName] = useState();
	const [newTagId, setNewTagId] = useState();
	const [hidden, setHidden] = useState(true);
	const [dropdownVisible, setDropdownVisible] = useState(true);
	const inputRef = useRef(null);
	const tagEditBlockRef = useRef(null);
	const allTags = useSelector(tagsSelector.selectAll);
	const officeTags = useSelector(tags);

	useEffect(() => { inputRef.current.focus() }, [hidden])
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	const handleClickOutside = e => {
		if (!tagEditBlockRef.current.contains(e.target)) {
			setHidden(true);
			setNewTagName(''); setNewTagId('');
		}
	};

	const sortedTags = useMemo(() => {
		if (newTagName && allTags) return allTags.sort((a, b) => a.name.localeCompare(b.name));
	}, [newTagName, allTags]);

	const sortedSearchedTags = useMemo(() => {
		if (newTagName && allTags) return (sortedTags.filter(tag => tag.name.toLowerCase().includes(newTagName.toLowerCase())))
	}, [newTagName, sortedTags]);


	const submitNewTag = async () => {
		if ((newTagId || newTagName) && officeTags.some(tag => tag.name !== newTagName)) {
			const new_tag = newTagId ? { tagId: newTagId } : { name: newTagName };
			addToList({ officeId: currentOffice, new_tag });
			setNewTagName(''); setNewTagId('');
		};
		return (setHidden(!hidden))
	};

	return (
		<div id="NewTagInput" className={cl.dd_list} ref={tagEditBlockRef}>
			<input
				placeholder="tag text"
				className="Myinput"
				onChange={e => {
					setNewTagName(e.target.value.toLowerCase());
					if (e.target.value) setDropdownVisible(true)
				}}
				ref={inputRef}
				type='text'
				hidden={hidden}
				value={newTagName} />

			{sortedSearchedTags && dropdownVisible && (
				<DropdownList
					searchResults={sortedSearchedTags}
					newTag={newTagName}
					setNewTagName={newTagName}
					hide={() => setDropdownVisible(false)} />
			)}

			<div className="msymb_icon" onClick={submitNewTag}>
				{hidden
					? 'add'
					: "OK"
				}
			</div>
		</div>
	)
}
export default NewTagInput;

