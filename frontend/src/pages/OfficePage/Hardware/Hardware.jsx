import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import cl from './Hardware.module.css'
import { useSelector } from "react-redux";
import { selectUsers, hardware } from "../../../slices/officeSlice";
import { useOffice } from "../../../hooks/useOffice";

const Hardware = () => {
	const officeHw = useSelector(hardware)
	const usersHw = useSelector(selectUsers)
	const { updateInfo, currentOffice } = useOffice();

	const textAreaRef = useRef(null);
	const [onEdit, setOnEdit] = useState(false);
	const [currentValue, setCurrentValue] = useState(officeHw);
	const [updatedValue, setUpdatedValue] = useState(currentValue);
	const [currentIdForUpdate, setCurrentIdForUpdate] = useState(currentOffice);

	console.log('\n currentIdForUpdate', currentIdForUpdate, '\ncurrentValue', currentValue, '\nupdatedValue', updatedValue);
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, []);

	/* 	useEffect(() => {
			setCurrentValue(officeHw)
		}, [officeHw]); */


	console.log('onEdit', onEdit);
	console.log('currentValue', currentValue);
	console.log('updatedValue', updatedValue);


	const handleClickOutside = e => {
		if (!textAreaRef.current.contains(e.target)) {
			setOnEdit(false);/*  setUpdatedValue(currentValue) */
		}

	};

	const update = async () => {
		updateInfo({ id: currentIdForUpdate, update: { hardware: { info: updatedValue } } }); setCurrentValue(updatedValue);
		setOnEdit(false);
	}




	return (
		<div className={cl.hw} ref={textAreaRef}>

			<div className={cl.hw_header}>
				<div className={cl.hw_header__options}>

					<div
						onClick={
							(e) => {
								setCurrentIdForUpdate(e.target.id);
								setCurrentValue(officeHw)
								setUpdatedValue(officeHw)
							}}
						id={currentOffice}
						className={
							(currentIdForUpdate === currentOffice)
								? cl.hw_header__options_item_current
								: cl.hw_header__options_item
						}>
						Офис
					</div>

					{usersHw.map(user => {
						return (
							<div
								onClick={(e) => {
									setCurrentIdForUpdate(e.target.id);
									setCurrentValue(user.hardware.info)
									setUpdatedValue(user.hardware.info)
								}}
								className={
									currentIdForUpdate === user._id
										? cl.hw_header__options_item_current
										: cl.hw_header__options_item
								}
								id={user._id}
								key={user._id}>
								{user.login}
							</div>
						)
					})}

				</div>

				{/* 	<div className={cl.hw_header__controls}>					<div className={cl.hw_header__controls_button}>					</div>			</div> */}
			</div>




			<div className={cl.hw_body} >
				<div className={cl.hw_info}  >
					{
						onEdit
							? <textarea
								autoFocus
								value={updatedValue}
								onChange={(e) => { setUpdatedValue(e.target.value) }}
								className={cl.hw_textarea} />
							: <div onClick={() => setOnEdit(true)}>{currentValue}</div>}
				</div>

				<div className={cl.edit_btns}>
					<div className='msymb_icon'
						onClick={() => setOnEdit(true)}
					>	edit_note
					</div>
					{onEdit
						? <div className='msymb_icon' onClick={update}>	done	</div>
						: false}
				</div>
			</div>
		</div >
	)
}
export default Hardware;
