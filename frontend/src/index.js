import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store.js';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import axios from 'axios';
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
