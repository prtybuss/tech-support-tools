import React, { useState, useEffect } from "react";
import cl from './NavBar.module.css';
import NavSearchCategoryItem from "./NavSearchCategoryItem";




function NavSearchCategory({ name, data }) {
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		document.addEventListener('mousedown', () => setIsHovered(false));
		return () => document.removeEventListener('mousedown', () => setIsHovered(false));
	}, []);


	return (
		<div
			style={{ zIndex: 3 }}
			className={cl.mainwrap_element}
			onMouseOver={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>


			<div className={cl.nav_btn}
			>{name}</div>


			{isHovered && (
				<div className={cl.dropdown} onClick={() => setIsHovered(false)}>

					{data.map(item => {
						return (
							<NavSearchCategoryItem
								value={item[name]}
								key={item['id'] + '_'}
								id={item['id']}
								setIsHovered={() => setIsHovered(false)} />
						)
					})}
				</div>
			)}


		</div>
	)
}
export default NavSearchCategory;
