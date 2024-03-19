import React from "react";
import cl from './NavBar.module.css';
import { useNavigate } from "react-router-dom";


function NavSearchCategoryItem({ value, setIsHovered, id }) {
	const navigate = useNavigate();

	const handleClick = () => {
		setIsHovered();
		navigate(`dashboard/${id}`);
	}

	return (
		<div
			className={cl.dropdown_ul}
			id={id} key={id}
			onMouseDown={handleClick}
		>{value}
		</div>
	)
};
export default NavSearchCategoryItem;
