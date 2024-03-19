import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import cl from './NavBar.module.css';
import { useAuth } from "../hooks/useAuth";
import { selectToken } from "../slices/sessionSlice";
import { selectAllTickets } from "../slices/ticketSlice";
import { selectPreloaded } from "../slices/loaderSlice";
import tambourine from '../assets/svg/tambourine.png';
import NavSearch from "./NavSearch";
import MyModal from "../components/UI/modal/MyModal";
import NewTicketForm from "../pages/Servicedesk/NewTicketForm/NewTicketForm";


function NavBar() {
	const token = useSelector(selectToken);
	const { onLogout, isAdmin } = useAuth();
	const [modal, setModal] = useState(false);
	const office_list = useSelector(selectPreloaded);
	const newTickets = useSelector(state => {
		const allTickets = selectAllTickets(state)
		return allTickets.filter(ticket => ticket.status === 'new')
	});


	return (
		< >

			<div className={cl.navbar}>
				{office_list && isAdmin && <NavSearch />}
				{token && (isAdmin == false) &&
					<div className={cl.nav_btn} onClick={() => setModal(true)}> Новое обращение </div>}
			</div>

			<div className={cl.navbarbuttons}>
				<div className={cl.mainwrap_element}>
					<Link to='/servicedesk'>
						<div className={cl.nt_count_wrap} style={{ zIndex: 0 }} >
							<img src={tambourine} alt="Logo" className={cl.icon} />
							<div className={cl.nt_count}>	{newTickets.length} </div>
						</div>
					</Link>
				</div>

				{token && (<div className={cl.mainwrap_element} onClick={onLogout}> Выйти </div>)}
			</div>

			<MyModal visible={modal} setVisible={setModal}>
				<NewTicketForm close={() => setModal(false)} />
			</MyModal>
		</>)
}
export default NavBar;
