import React from "react";
import cl from './TagsBlock.module.css';
import { useSelector } from "react-redux";
import { selectTagWithId } from '../../slices/tag'
import { useTags } from "../../hooks/useTags";
import { useOffice } from "../../hooks/useOffice";


function TagContainer({ tagId, active, canDelete, setCanDelete }) {
	const { fetchList, removeFromList } = useTags();
	const { currentOffice } = useOffice();
	const tag = useSelector(selectTagWithId(tagId))
	const root = [cl.tagsblock_item];

	if (active) { root.push(cl.active) };
	if (canDelete) { root.push(cl.deletable) };

	const clickHandler = () => {
		if (canDelete === true) {
			removeFromList(currentOffice, tagId);
			setCanDelete();
		} else fetchList(tagId)
	}
	return (
		<div
			className={root.join(' ')}
			onClick={clickHandler}>
			<span className="tag"> {tag?tag.name:console.log('none')} </span>
		</div >
	)
}

export default TagContainer;