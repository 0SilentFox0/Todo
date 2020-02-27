import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8000/";

axios.create({
	headers: {
		"Content-Type": "application/json",
		'Access-Control-Allow-Credentials' : true,
		'Access-Control-Allow-Origin':'*',
		'Access-Control-Allow-Methods':'GET',
		'Access-Control-Allow-Headers':'application/json',
	}
});

export default axios;