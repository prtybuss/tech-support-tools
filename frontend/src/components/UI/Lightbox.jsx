import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOffice } from "../../hooks/useOffice";
const { REACT_APP_BASE_URL } = process.env

const getImage = async (officeId, imgId) => {
	try {
		let resp = await axios.get(`${REACT_APP_BASE_URL}/api/office/${officeId}/img/${imgId}`, { responseType: 'blob' });
		return URL.createObjectURL(resp.data);
	} catch { (error) => console.log(Error.message) }
};


const Lightbox = ({ imgId, setVisible, ...props }) => {
	const { currentOffice } = useOffice();
	let [src, setSrc] = useState("");
	useEffect(() => {
		getImage(currentOffice, imgId).then((url) => setSrc(url));
	}, [imgId]);
	return (
		<div className="lightbox" style={{ zIndex: 3 }}>
			{src &&
				<img src={src} {...props} alt='img' />
			}
		</div>
	)
}

export default Lightbox;