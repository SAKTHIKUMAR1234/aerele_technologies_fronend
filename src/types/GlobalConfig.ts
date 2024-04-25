import axios from "axios";


export const base_url : string = 'http://localhost:9001'

export const login_url : string = base_url + '/api/auth/login'

export const signup_url : string = base_url + '/api/auth/signup'

export const user_details_url : string = base_url + '/api/user'

export const logout_url : string = base_url + '/api/auth/logout'

export const warehouse_data_fetch_url : string = base_url + '/api/loc'

export const warehouse_create_url : string = base_url + '/api/loc/create'

export const warehouse_update_url : string = base_url + '/api/loc/update'

export const product_data_fecth_url : string = base_url + '/api/product'


export const instance = axios.create({
  withCredentials: true
});
