import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOffice } from "../../../hooks/useOffice";
const { REACT_APP_BASE_URL } = process.env

const getImage = async (officeId, imgId) => {/* 
	console.log('get img func', officeId, 'officeID'); */
	try {
		let resp = await axios.get(`${REACT_APP_BASE_URL}/api/office/${officeId}/img/${imgId}`, { responseType: 'blob' })
		return URL.createObjectURL(await resp.data)
	} catch { (error) => { console.log(Error.message) } }
	/* return URL.createObjectURL(resp.data); */
};

const Img = ({ imgId, ...props }) => {
	const { currentOffice } = useOffice();
	let [src, setSrc] = useState("");
	

	useEffect(() => {
		console.log('wearehereeeeeeeeeeee');
		getImage(currentOffice, imgId).then((url) => setSrc(url))/* .catch(function (error) {
			console.log(Error.message);
		}) */
	}, [imgId]);
	return (<>
		{src &&
			<img src={src} {...props} />
		}
	</>
	)
}
export default Img;