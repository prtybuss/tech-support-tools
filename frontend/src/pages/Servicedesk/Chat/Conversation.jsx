import React, { useEffect, useMemo, useRef, useState } from "react";
import classes from '../ServiceDesk.module.css';
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getMessages, messagesSelector } from "../../../slices/messagesSlice";
import { selectId } from "../../../slices/sessionSlice";
import Message from "./Message";
import { useChat } from "../../../hooks/useChat";
import store from "../../../store";
import MyModal from "../../../components/UI/modal/MyModal";
import NewTicketForm from "../NewTicketForm/NewTicketForm";
import { selectTicketById } from "../../../slices/ticketSlice";
import formatDate from "../../../utils/formatDate";
import { selectWithId } from "../../../slices/loaderSlice";


const Conversation = () => {
	const dispatch = useDispatch();
	const [modal, setModal] = useState(false);
	const { currentTicketId, readAllMessages, closeTicket } = useChat();
	const currentTicketDetailed = useSelector(selectTicketById(currentTicketId));
	const messageInputRef = useRef();
	const messages = useSelector(messagesSelector.selectAll);
	const [newMessage, setNewMessage] = useState('');
	const userId = useSelector(selectId);
	const officeInfo = useSelector(selectWithId(currentTicketDetailed.office));
	const { date, time } = formatDate(currentTicketDetailed.created);

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
			setNewMessage('');

		}
	};

	const conversationComponents = useMemo(() => messages.map(m => {
		return (
			<Message key={m._id} msended={(m.author._id === userId)} {...m} current={currentTicketId} />)
	}, [messages]))

	const handleSubmit = async (e) => {
		dispatch(createMessage({ ticketid: currentTicketId, text: newMessage }))
			.then(setNewMessage(''));

	}
	officeInfo ? console.log('officeInfo', officeInfo) : false;
	return (
		<div className={classes.chat}>

			<div className={classes.currentTicket_controls}>
				<div
					className={classes.nav_btn}
					onClick={closeTicket}>
					проблема решена
				</div>
			</div>

			{currentTicketDetailed &&
				<div className={classes.currentTicket_details}>

					<span className={classes.currentTicket_details_item} title='тема'> {currentTicketDetailed.theme} </span> <br />
					<span className={classes.currentTicket_details_item} title='автор'> {`${currentTicketDetailed.authorName} / ${currentTicketDetailed.author?.login} `} </span> <br />
					<span className={classes.currentTicket_details_item} title='статус'> {currentTicketDetailed.status} </span> <br />
					<span className={classes.currentTicket_details_item} title='создан'> {
						date} / {time} </span> <br />
					<span className={classes.currentTicket_details_item} title='оффис'> {
						currentTicketDetailed.office?.adress} </span>
				</div>}

			<div className={classes.chat_body}>
				{conversationComponents}
			</div>

			<div className={classes.messageInput} ref={messageInputRef} >
				<textarea
					placeholder="текст сообщения"
					className="Myinput"
					value={newMessage}
					onChange={(event) => setNewMessage(event.target.value)} />
				<button
					className='msymb_icon'
					disabled={newMessage ? false : true}
					onClick={handleSubmit}>
					done
				</button>
			</div>
			<MyModal visible={modal} setVisible={setModal}>
				<NewTicketForm close={() => setModal(false)} />
			</MyModal>
		</div>
	)
}
export default Conversation;

