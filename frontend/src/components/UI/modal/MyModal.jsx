import React from "react";
import cl from './MyModal.module.css';

const MyModal = ({ children, visible, setVisible }) => {

	const defaultClasses = [cl.myModal];

	if (visible) { defaultClasses.push(cl.active) };

	return (
		<div className={defaultClasses.join(' ')} onClick={() => setVisible(false)}>

			<div className={cl.myModalContent} onClick={e => e.stopPropagation()}>

				{children}
			</div>
		</div>
	)
}

export default MyModal;