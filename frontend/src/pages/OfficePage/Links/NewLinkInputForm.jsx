import React, { useState } from "react";
import cl from './Links.module.css'
import { useOffice } from "../../../hooks/useOffice";


const NewLinkInputForm = ({ setVisible }) => {
	const { postLink } = useOffice();
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');


	const submitLink = () => {
		postLink({ title, url });
		setTitle('');
		setUrl('');
		setVisible(false);
	};

	return (
		/*  <div id="NewLinkInputForm" > */
		<div className={cl.newlinkform}>
			<div className={cl.newlinkform__header}>Добавить ссылку</div>
			<input
				type="text"
				onChange={e => { setTitle(e.target.value) }}
				placeholder="Название"
				className={cl.newlinkform__item}
				value={title} />
			<input
				type="text"
				onChange={e => { setUrl(e.target.value) }}
				placeholder="Ссылка"
				className={cl.newlinkform__item}
				value={url} />

			{<button className={cl.newlinkform__submit} onClick={submitLink}>
				ok
			</button>}
		</div>
		/*  </div> */
	)
}

export default NewLinkInputForm;