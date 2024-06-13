import axios from "axios";
const  {REACT_APP_BASE_URL} = process.env

class ticket {

	getAll() {
		return axios.get(`${REACT_APP_BASE_URL}/tickets`);
	}

	readAllMessages({ id }) {
		return axios.post(`${REACT_APP_BASE_URL}/ticket/${id}/messages`);
	}

	getById(id) {
		return axios.get(`${REACT_APP_BASE_URL}/ticket/${id}`);
	}

	create(data) {
		return axios.post(`${REACT_APP_BASE_URL}/ticket`, data);
	}

	update({ ticketId, changes }) {
		return axios.post(`${REACT_APP_BASE_URL}/ticket/${ticketId}`, changes);
	}

	delete(id) {
		return axios.delete(`${REACT_APP_BASE_URL}/ticket/${id}`);
	}
}

export default new ticket();

