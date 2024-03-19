import React from "react";
import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList, addTag, removeTag, selectListIds, selectNoTagListIds } from "../slices/tagListSlice";
import { useNavigate } from "react-router-dom";
import { selectCurrentTag } from "../slices/tag";
const TagsContext = createContext();


export const TagsProvider = ({ children }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentList = useSelector(selectListIds);
	const restItemsList = useSelector(selectNoTagListIds);
	const [currentTag] = useSelector(selectCurrentTag);
	const [tagListLoading, setTagListLoading] = useState(false);

	const fetchList = async (tagId) => {
		setTagListLoading(true);
		dispatch(getList(tagId));
		setTagListLoading(false);
		navigate(`/dashboard/list/${tagId}`)
	}
	const addToList = (officeId, newTag = { tagId: currentTag.id }) => {
		if (currentList.includes(officeId)) return;
		dispatch(addTag({ officeId, newTag }));
	}
	const removeFromList = (officeId, tagId = currentTag.id) => dispatch(removeTag({ officeId, tagId }));


	const value = {
		currentTag,
		tagListLoading,
		currentList,
		restItemsList,
		fetchList: fetchList,
		addToList: addToList,
		removeFromList: removeFromList
	};
	return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
};

export const useTags = () => {
	return useContext(TagsContext);
};
