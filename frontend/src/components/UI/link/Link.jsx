import React from "react";
import classes from './Link.module.css'
import { useOffice } from "../../../hooks/useOffice";

const Link = ({ title, href, id, deletable }) => {
	const { removeLink } = useOffice();

	return (
		<>
			{(deletable === true) && <span className={classes.Link_deletable} onClick={() => removeLink(id)}> {title} </span>}
			{(deletable === false) && <a className={classes.Link} href={href} target="_blank"> {title} </a>}
		</>
	);


}

export default Link;