import axios from "axios";


export const base_url : string = 'http://localhost:9001'

export const login_url : string = base_url + '/api/auth/login'

export const signup_url : string = base_url + '/api/auth/signup'

export const user_details_url : string = base_url + '/api/user'

export const logout_url : string = base_url + '/api/auth/logout'

export const instance = axios.create({
  withCredentials: true
});
