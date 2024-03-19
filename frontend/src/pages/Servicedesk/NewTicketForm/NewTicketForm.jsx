import React from "react";
import { useDispatch } from "react-redux";
import cl from './NewTicketForm.module.css';
import useInput from "../../../hooks/useInput";
import { createTicket } from "../../../slices/ticketSlice";

const NewTicketForm = ({ close }) => {
	const authorName = useInput();
	const theme = useInput();
	const text = useInput();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(createTicket({
			authorName: authorName.value,
			theme: theme.value,
			text: text.value
		}));
		close();
	};

	return (

		<div className={cl.ntfBody}>
			ЖАЛУЙСЯ:
			<input type="text" placeholder="Ваше имя" {...authorName} className={cl.text_input} />
			<input type="text" placeholder="Тема" {...theme} className={cl.text_input} />
			<input type="text" placeholder="Текст обращения" {...text} className={cl.text_input} />
			<button onClick={handleSubmit} className={cl.input_button}> Отправить </button>

		</div>
	)
}


export default NewTicketForm;