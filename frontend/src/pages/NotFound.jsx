
import React from 'react';
import cl from '../assets/Styles.module.css';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
	let navigate = useNavigate();


	return (
		<div className={cl.centred} >
			<div className={cl.h} > 404 </div>
			<div > Страница не найдена </div>

			<button type="button" className='button-modal' onClick={() => navigate(-1)}>
				Назад
			</button>
		</div>
	)
}
export default NotFound;
