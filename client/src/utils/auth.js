import Axios from 'axios';
import {initialState} from "../context/GlobalState"
export const login = (data, callback, dispatch) => {
	return Axios.post("/api/auth/login", data)
		.then((response) => {
			// handle success
			// console.log(response);
			// localStorage.setItem('auth-token', response.data.token); // saving token to localstorage
			callback(response.data.token, true, response.data.user);
			return response;
		}).then( response => {
			const user = response.data.user;
			const token = response.data.token;
			// console.log(user,token);
			dispatch({
                type: "LOGIN",
                payload: {
					user,
					token
				}
			})
			console.log(initialState);
		})
		.catch((error) => {
			// handle error
			console.log("Got an error: ", error);
		});
}