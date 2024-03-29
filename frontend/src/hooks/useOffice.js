import React from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOfficeData, postComment, postLink, removeComment, removeLink, selectUserById, updateOfficeInfo, selectUsers } from "../slices/officeSlice";
import { getDirectoryContent } from "../slices/files";
const OfficeContext = createContext();

export const OfficeProvider = ({ children }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [currentOfficeId, setcurrentOfficeId] = useState('');
	const [dataLoading, setDataLoading] = useState(false);



	const getOfficeDetails = async (officeId) => {
		if (officeId === currentOfficeId) return;
		setDataLoading(true);
		dispatch(getOfficeData(officeId));
		setcurrentOfficeId(officeId);
		setDataLoading(false);
	};

	const postNewComment = (comment) =>
		dispatch(postComment({ officeId: currentOfficeId, comment }));

	const deleteComment = (commentId) =>
		dispatch(removeComment({ officeId: currentOfficeId, commentId }));

	const postNewLink = (link) =>
		dispatch(postLink({ officeId: currentOfficeId, link }))

	const removeLinkWithId = (linkId) =>
		dispatch(removeLink({ officeId: currentOfficeId, linkId }));

	const updateHwInfo = (update) => {
		console.log({ ...update });
		dispatch(updateOfficeInfo({ officeId: currentOfficeId, update }))
	}

	const readDir = async (userId, subfolder = '') => {
		try {
			dispatch(getDirectoryContent({ officeId: currentOfficeId, userId, subfolder }))
		} catch (error) {
			console.error(error);
			process.exit(1);
		}

	}

	const value = {
		currentOfficeId, dataLoading,
		getOfficeDetails: getOfficeDetails,
		postComment: postNewComment,
		deleteComment: deleteComment,
		postLink: postNewLink,
		removeLink: removeLinkWithId,
		updateInfo: updateHwInfo,
		watchDir: readDir
	};

	return <OfficeContext.Provider value={value}>{children}</OfficeContext.Provider>;
};

export const useOffice = () => {
	return useContext(OfficeContext);
};