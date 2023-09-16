import { userToken } from "@/pages/api/auth";
import axios from "@/utils/axios";

export async function loginAction (formData) {
    try {
        const response = await axios.post('/api/login', formData);
        return response
    } catch (error) {
        return false;
    }
}

export async function registerAction (formData) {
    try {
        const response = await axios.post('/api/register', formData);
        return response
    } catch (error) {
        return false;
    }
}


export async function forgotAction (formData) {
    try {
        const response = await axios.post('/api/forgot-password', formData);
        return response
    } catch (error) {
        return false;
    }
}


export async function getProducts () {
    try {
        const response = await axios.get('/api/products', {
            headers : {
                'Authorization': 'Bearer ' + userToken(),
            }
        });
        return response
    } catch (error) {
        return false;
    }
}



export async function getProductDetail (productId) {
    try {
        const response = await axios.get('/api/product/' + productId, {
            headers : {
                'Authorization': 'Bearer ' + userToken(),
            }
        });
        return response
    } catch (error) {
        return false;
    }
}

