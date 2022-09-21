import axios, { AxiosError } from "axios";
import { ICredential } from "@typesCustom";


const api = axios.create({
    baseURL:'http://localhost:3300'
})

//Endpoint dos servicos
const _ACCOUNT = '/account/admin';


//Account
const signInAdmin = async (credential: ICredential) => {
    try {
        const result = await api.post(`${_ACCOUNT}/signin`, credential);

        return new Promise(resolve => {
            resolve(result.data)
        })

    } catch (e) {
        const error = e as AxiosError;

        return new Promise((resolve,reject) => {
            reject(error.response?.data)
        })
        
    }

}

export {signInAdmin}