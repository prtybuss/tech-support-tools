import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOffice } from "../../../hooks/useOffice";
const { REACT_APP_BASE_URL } = process.env

async function getImage(officeId, imgId) {
	try {
		const resp = await axios.get(`${REACT_APP_BASE_URL}/api/office/${officeId}/img/${imgId}`, { responseType: 'blob' })
		return URL.createObjectURL(resp.data)
	} catch { (error) => { console.log(Error.message) } }
	/* 	return URL.createObjectURL(resp.data) */
};

const Img = ({ imgId, onClick, ...props }) => {
	const { currentOffice } = useOffice();
	let [src, setSrc] = useState("");/* 
	getImage(currentOffice, imgId).then(res => setSrc(res)) */


	useEffect(() => {

		/*getImage(currentOffice, imgId).then(resp => setSrc(URL.createObjectURL(resp.data))) */
		getImage(currentOffice, imgId).then((url) => setSrc(url))
	}, [imgId]);
	return (<>
		{src &&
			<img src={src} {...props} onClick={onClick} />
		}
	</>
	)
}
export default Img;