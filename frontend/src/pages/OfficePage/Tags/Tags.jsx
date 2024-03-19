import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import cl from '../OfficePage.module.css'
import TagContainer from "../../../components/TagsBlock/TagContainer";
import NewTagInput from "./NewTagInput";
import { tags } from "../../../slices/officeSlice";

const Tags = () => {
	const officeTags = useSelector(tags);
	const [canDelete, setCanDelete] = useState(false);
	const myRef = useRef();

	const handleClickOutside = e => {
		if (!myRef.current.contains(e.target)) setCanDelete(false)
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	return (
		<div className={cl.Tags} ref={myRef}>


			<div className={cl.officeTags}>
				{officeTags.map(tagId => {
					return <TagContainer
						tagId={tagId} key={tagId}
						canDelete={canDelete}
						setCanDelete={() => setCanDelete(!canDelete)} />
				})}
			</div>

			<div className={cl.controls}>
				<NewTagInput />
				<div
					className="msymb_icon"
					onClick={() => setCanDelete(true)}> remove </div>
			</div>
		</div>
	);
}
export default Tags;
