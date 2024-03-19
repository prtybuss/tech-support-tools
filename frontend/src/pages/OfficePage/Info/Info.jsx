import React from "react";
import { useSelector } from "react-redux";
import InfoBlock from "./InfoBlock";
import { ip, numb, adress } from "../../../slices/officeSlice";



const Info = () => {
	const officeIp = useSelector(ip);
	const officeNumb = useSelector(numb);
	const officeAdress = useSelector(adress);

	return (
		<div className="InfoBlockContainer main">
			<InfoBlock title='#' value={officeNumb} />
			<InfoBlock title='IP' value={officeIp} />
			<InfoBlock title='Адрес' value={officeAdress} />

		</div>

	)
}

export default Info;