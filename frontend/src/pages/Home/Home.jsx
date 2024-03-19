import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import cl from './Home.module.css'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../../slices/sessionSlice";
const  {REACT_APP_BASE_URL} = process.env


const Home = () => {
	const navigate = useNavigate();
	const token = useSelector(selectToken);
	const [info, setInfo] = useState({ ip: '', numb: '', adress: '' });

	const infoCurrentUser = async () => {
		try{
		const response = await axios.get(`${REACT_APP_BASE_URL}/home`);
		return response.data;
	} catch (error) { console.error(error) 
	}	finally {(response)=>{
		setInfo({ ...response.data });
	}

}}

	useEffect(() => {
		infoCurrentUser();
	}, [token]);


	const infoComponents = useMemo(() => {
		return (
			<>
				{info.numb && (
					<div className={cl.info_item}>
						<span className={cl.info_item__description}># </span>
						<span className={cl.info_item__data}>{info.numb} </span>
					</div>
				)}
				{info.ip && (
					<div className={cl.info_item}>
						<span className={cl.info_item__description}>ip </span>
						<span className={cl.info_item__data}>{info.ip} </span>
					</div>
				)}
				{info.adress && (
					<div className={cl.info_item}>
						<span className={cl.info_item__description}> </span>
						<span className={cl.info_item__data}> {info.adress} </span>
					</div>
				)}
			</>
		)
	}, [info]);

	return (
		<div className={cl.home}>
			<span className={cl.info_h}>
				Ваши данные:
			</span>

			{info && infoComponents}

			<div
				onClick={() => navigate('/login')}
				className="button-modal" >
				Войти
			</div>

		</div>
	)
}

export default Home;