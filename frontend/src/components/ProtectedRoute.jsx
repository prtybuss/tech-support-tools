import React from 'react';
import { Navigate, useLocation, } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../slices/sessionSlice.js';

const ProtectedRoute = ({ children, adminAccess }) => {
	const location = useLocation();
	const token = useSelector(selectToken);
	/*   const isAdmin = useSelector(selectAdminPermissions); */

	if ((!token) || (token === 'null')) {
		return (<Navigate to="/home" replace state={{ from: location }} />);
	}
	return children;
};

export default ProtectedRoute;