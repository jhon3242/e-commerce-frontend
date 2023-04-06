import axios, { AxiosResponse } from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


const BASE_URL = 'http://localhost:3000';

export interface LoginInfo {
    email: string;
    password: string;
}

export type singUpInfo = {
    email : string,
    username : string,
    password : string,
    confirmPassword : string,
}


export async function loginApi(loginInfo : LoginInfo) : Promise<AxiosResponse>{
    try {
        const response: AxiosResponse = await axios.post(`${BASE_URL}/login`, loginInfo);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function signUpApi(singUpInfo : singUpInfo) {
	try {
        const response: AxiosResponse = await axios.post(`${BASE_URL}/users`, singUpInfo);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

