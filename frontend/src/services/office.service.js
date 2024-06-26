import axios from "axios";
const { REACT_APP_BASE_URL } = process.env

class office {

	getDetails(officeId) {
		return axios.get(`${REACT_APP_BASE_URL}/api/office/${officeId}`);
	}

	postComment({ officeId, comment }) {
		return axios.post(`${REACT_APP_BASE_URL}/api/office/${officeId}/comment`, comment);
	}

	deleteComment({ officeId, commentId }) {
		return axios.delete(`${REACT_APP_BASE_URL}/api/office/${officeId}/comment/${commentId}`);
	}

	postLink({ officeId, link }) {
		return axios.post(`${REACT_APP_BASE_URL}/api/office/${officeId}/link`, link);
	}

	removeLink({ officeId, linkId }) {
		return axios.delete(`${REACT_APP_BASE_URL}/api/office/${officeId}/link/${linkId}`);
	}

	updateInfo({ officeId, update }) {
		return axios.post(`${REACT_APP_BASE_URL}/api/office/${officeId}`, update);
	}

	getDirContent({ officeId, userId, subfolder }) {
		return axios.get(`${REACT_APP_BASE_URL}/api/office/${officeId}/files/${userId}/${subfolder}`);
	}


	updateUserInfo({ userId, update }) {
		return axios.post(`${REACT_APP_BASE_URL}/api/${userId}`, update);
	}
}

export default new office();

