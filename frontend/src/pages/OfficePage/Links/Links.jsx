import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import cl from './Links.module.css'
import Link from '../../../components/UI/link/Link';
import MyModal from '../../../components/UI/modal/MyModal';
import NewLinkInputForm from "./NewLinkInputForm";
import { links } from "../../../slices/officeSlice";


const Links = () => {
	const currentOfficeLinks = useSelector(links);
	const myRef = useRef();
	const [modal, setModal] = useState(false);
	const [deletable, setDeletable] = useState(false)


	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	const handleClickOutside = e => {
		if (!myRef.current.contains(e.target)) setDeletable(false)
	};



	return (
		<div className={cl.Links} ref={myRef}>


			<div className={cl.linksItems}>{
				currentOfficeLinks.map(link => {
					return (
						<Link
							href={link.url}
							title={link.title}
							id={link._id}
							key={link._id}
							deletable={deletable} />
					)
				})}
			</div>


			<div className={cl.linkscontrols}>
				<div
					className="msymb_icon"
					onClick={() => setModal(true)}>
					add
				</div>
				<div
					className="msymb_icon"
					onClick={() => setDeletable(true)}>
					remove
				</div>
			</div>


			<MyModal
				visible={modal}
				setVisible={setModal}>
				<NewLinkInputForm
					setVisible={setModal} />
			</MyModal>


		</div>
	)
};
export default Links;