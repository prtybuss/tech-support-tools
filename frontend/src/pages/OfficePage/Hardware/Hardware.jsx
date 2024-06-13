import React, { useState, useRef, useEffect } from "react";
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
	const [updatedValue, setUpdatedValue] = useState(officeHw.info);
	const [original, setOriginal] = useState({
		info: officeHw.info,
		id: currentOffice
	});

	useEffect(() => {
		setOriginal({ id: currentOffice, ...officeHw })

	}, [officeHw])

	useEffect(() => {
		setUpdatedValue(original.info)
	}
		, [original,/*  officeHw, */ onEdit])

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside)
	});

	const handleClickOutside = e => {
		if (!textAreaRef.current.contains(e.target)) {
			setOnEdit(false);
			setUpdatedValue(original.info);
		}
	};
	const update = () => {
		updateInfo({ /* id: original.id, */hardware: { info: updatedValue } })
		setOnEdit(false);
	}



	return (
		<div className={cl.hw} ref={textAreaRef}>

			<div className={cl.hw_header}>

				<div className={cl.hw_header__options}>
					<div
						onClick={() => setOriginal(
							{
								info: officeHw.info,
								id: currentOffice
							})}
						id={currentOffice}
						className={
							(original.id === currentOffice)
								? cl.hw_header__options_item_current
								: cl.hw_header__options_item
						}>
						Офис
					</div>
					{usersHw.map(user => {
						return (
							<div
								onClick={() => setOriginal(
									{
										info: user.hardware.info,
										id: user._id
									})}
								className={
									original.id === user._id
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

				<div className={cl.hw_header__controls}>
					<div className={cl.hw_header__controls_button}>

					</div>
				</div>
			</div>

			<div className={cl.hw_body}>
				<div className={cl.hw_info}  >{
					onEdit
						? <textarea
							autoFocus
							value={updatedValue}
							onChange={(e) => { setUpdatedValue(e.target.value) }}
							className={cl.hw_textarea} />
						: <div onClick={() => setOnEdit(true)}>{original.info}</div>}
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
		</div>
	)
}
export default Hardware;
