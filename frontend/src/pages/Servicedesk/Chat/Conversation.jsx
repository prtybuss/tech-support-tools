import React, { useEffect, useMemo, useRef, useState } from "react";
import classes from '../ServiceDesk.module.css';
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getMessages, messagesSelector } from "../../../slices/messagesSlice";
import useInput from "../../../hooks/useInput";
import { selectId } from "../../../slices/sessionSlice";
import Message from "./Message";
import { useChat } from "../../../hooks/useChat";
import store from "../../../store";
import { Button } from "@mui/material";
import MyModal from "../../../components/UI/modal/MyModal";
import NewTicketForm from "../NewTicketForm/NewTicketForm";


const Conversation = () => {
	const [modal, setModal] = useState(false);
	const { currentTicketId, readAllMessages, closeTicket } = useChat();
	const messageInputRef = useRef();
	const dispatch = useDispatch();
	const messages = useSelector(messagesSelector.selectAll);
	const newMessage = useInput();
	const userId = useSelector(selectId);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [currentTicketId]);

	useEffect(() => {
		const timer = setTimeout(() => store.dispatch(readAllMessages), 500);
		return () => clearTimeout(timer);
	}, [currentTicketId]);

	const handleClickOutside = e => {
		if (!messageInputRef.current.contains(e.target)) {

		}
	};

	const conversationComponents = useMemo(() => messages.map(m => {
		return (
			<Message key={m._id} msended={(m.author._id === userId)} {...m} current={currentTicketId} />)
	}, [messages]))

	const handleSubmit = async (e) => {
		dispatch(createMessage({ ticketid: currentTicketId, text: newMessage.value }));

	}

	return (
		<div className={classes.chat}>
			<div className={classes.currentTicket_controls}>
				<div className={classes.nav_btn}
					onClick={() => setModal(true)}>новое обращение</div>
				<Button className={classes.nav_btn} onClick={closeTicket}>Закрыть</Button>
			</div>

			<div className={classes.chat_body}>
				{conversationComponents}
			</div>

			<div className={classes.messageInput} ref={messageInputRef} >
				<textarea
					placeholder="текст сообщения"
					className={classes.textarea} {...newMessage} />
				<button
					className={classes.send_button}
					disabled={newMessage.value ? false : true}
					onClick={handleSubmit}>
					Отправить
				</button>
			</div>
			<MyModal visible={modal} setVisible={setModal}>
				<NewTicketForm close={() => setModal(false)} />
			</MyModal>
		</div>
	)
}
export default Conversation;

