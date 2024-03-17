import axios from "axios";
const  {REACT_APP_BASE_URL} = process.env

class tag {

	getAll() {
		return axios.get(`${REACT_APP_BASE_URL}/api/tags`);
	}

	getDetails(id) {
		return axios.get(`${REACT_APP_BASE_URL}/api/tag/${id}`);
	}

	post({ officeId, newTag }) {
		return axios.post(`${REACT_APP_BASE_URL}/api/office/${officeId}/tag`, newTag);
	}

	delete(officeId, tagId) {
		return axios.delete(`${REACT_APP_BASE_URL}/api/office/${officeId}/tag/${tagId}`);
	}
}

export default new tag();

