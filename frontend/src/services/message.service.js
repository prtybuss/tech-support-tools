import axios from "axios";
const  {REACT_APP_BASE_URL} = process.env

class message {

	getAll(id) {
		return axios.get(`${REACT_APP_BASE_URL}/ticket/${id}/messages`);
	}

	create(data) {
		return axios.post(`${REACT_APP_BASE_URL}/ticket/message`, data);
	}

	delete({ ticketId, messageId }) {
		return axios.delete(`${REACT_APP_BASE_URL}/ticket/${ticketId}/message/${messageId}`);
	}
}

export default new message();

