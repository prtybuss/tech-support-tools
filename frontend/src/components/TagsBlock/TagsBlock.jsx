import React from "react";
import cl from './TagsBlock.module.css';
import { useSelector } from "react-redux";
import { tagsSelector } from "../../slices/tag";
import { useTags } from "../../hooks/useTags";
import TagContainer from "./TagContainer";


const TagsBlock = () => {
	const tags = useSelector(tagsSelector.selectAll);
	const { fetchList } = useTags();


	return (
		<div className={cl.tagsblock}>

			{tags.map((tag, i) => {
				return (
					<TagContainer
						onClick={() => fetchList(tag.id)}
						tagId={tag.id}
						key={tag.id}
						name={tag.name}
						active={tag.active}
					/>
				)
			})}

		</div>
	)
}
export default TagsBlock;