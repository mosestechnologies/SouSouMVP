import Axios from 'axios';

export const login = (data, callback, dispatch) => {

	return Axios.post("http://localhost:5000/api/auth/login", data)
		.then((response) => {
			// handle success
			console.log(response);
			// localStorage.setItem('auth-token', response.data.token); // saving token to localstorage
			callback(response.data.token, true, response.data.user);
			return response;
		}).then( response => {
			const user = response.data.user;
			const token = response.data.token;
			dispatch({
                type: "LOGIN",
                payload: {
					user,
					token
				}
            })
		})
		.catch((error) => {
			// handle error
			console.log("Got an error: ", error);
		});
}