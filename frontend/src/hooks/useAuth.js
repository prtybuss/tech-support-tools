import React from "react";
import axios from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { tokenUpdated, authorized, signout, selectToken, selectAdminPermissions } from "../slices/sessionSlice";
import { getProps } from '../slices/loaderSlice';
import { getTickets } from "../slices/ticketSlice";
const AuthContext = createContext();
const { REACT_APP_BASE_URL } = process.env

export const AuthProvider = ({ children }) => {
	const dispatch = useDispatch();
	const token = useSelector(selectToken);
	const isAdmin = useSelector(selectAdminPermissions);
	const navigate = useNavigate();

	const handleLogin = async ({ login, password }) => {
		try {
			const response = await axios.post(`${REACT_APP_BASE_URL}/signin`, { login, password })
			dispatch(tokenUpdated(await response.data.token));
			dispatch(authorized(await response.data.data.user));
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + await response.data.token;
			const role = await response.data.data.user.role;
			if (role == 'admin') {
				dispatch(getProps());
				dispatch(getTickets());
				return navigate('/dashboard');
			}
			if (role == 'user') navigate('/servicedesk');
		}
		catch (error) { console.log(Error.message) }
	};

	const handleLogout = () => {
		dispatch(signout());
		navigate('/home');
	};

	const value = {
		token, isAdmin,
		onLogin: handleLogin,
		onLogout: handleLogout,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};