import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './hooks/useAuth';
import { ChatProvider } from './hooks/useChat';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import ServiceDesk from './pages/Servicedesk/ServiceDesk';
import NavBar from './layout/NavBar';


/* TODO */
// keep user on same page after f5
// signin через asynkThunk

function App() {

	return (
		<AuthProvider>
			<div className="app_wrap">
				<NavBar />

				<Routes>
					<Route index path="/" element={<Navigate to="/home" />} />
					<Route path="home" element={<Home />} />
					<Route path="login" element={<Login />} />

					<Route path="/dashboard/*" element={
						<ProtectedRoute adminAccess={true}>
							<Dashboard />
						</ProtectedRoute>} />

					<Route path="servicedesk" element={
						<ProtectedRoute adminAccess={false}>
							<ChatProvider>
								<ServiceDesk />
							</ChatProvider>
						</ProtectedRoute>} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</AuthProvider>
	)
}

export default App;
