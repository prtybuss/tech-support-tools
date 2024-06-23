import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import cl from './NavBar.module.css';
import { useAuth } from "../hooks/useAuth";
import { selectLogin, selectToken } from "../slices/sessionSlice";
import { selectAllTickets } from "../slices/ticketSlice";
import { selectPreloaded } from "../slices/loaderSlice";
import tambourine from '../assets/svg/tambourine.png';
import NavSearch from "./NavSearch";
import MyModal from "../components/UI/modal/MyModal";
import NewTicketForm from "../pages/Servicedesk/NewTicketForm/NewTicketForm";


function NavBar() {
	const token = useSelector(selectToken);
	const login = useSelector(selectLogin);
	const { onLogout, isAdmin } = useAuth();
	const [modal, setModal] = useState(false);
	const office_list = useSelector(selectPreloaded);
	const newTickets = useSelector(state => {
		const allTickets = selectAllTickets(state)
		return allTickets.filter(ticket => ticket.status === 'new')
	});


	return (
		< >

			{office_list && isAdmin && <NavSearch />}



			<div className={cl.navbarbuttons}>



				{token &&
					<div className={cl.mainwrap_element}>
						<span> новых обращений:  </span>

						<Link to='/servicedesk'>
							<div className={cl.nt_count_wrap} style={{ zIndex: 0 }} >
								<img src={tambourine} alt="Logo" className={cl.icon} />
								<div className={cl.nt_count}>	{newTickets.length} </div>
							</div>
						</Link>
					</div>
				}

				{token && (isAdmin == false) &&
					<div className={cl.mainwrap_element} onClick={() => setModal(true)}> пожаловаться программистам </div>}

				{token && (<>
					{/* <div className={cl.mainwrap_element} >  </div> */}
					<div className={cl.mainwrap_element} onClick={onLogout}><span>{login}</span> выйти </div>
				</>)}
			</div>

			<MyModal visible={modal} setVisible={setModal}>
				<NewTicketForm close={() => setModal(false)} />
			</MyModal>
		</>)
}
export default NavBar;
