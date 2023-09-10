import axios from "@/utils/axios";

export async function isAuthenticated(req) {
    let token        = localStorage.getItem("user-token") || null;
    if(token == null) {
        return false;
    }

    let byToken = await checkUserByToken(token);
    
    if(byToken == true) {
        return true
    }

    let refreshToken = localStorage.getItem("user-refresh-token") || null;

    if(refreshToken == null) {
        return false
    }

    let refreshResult = await refresingUserToken(refreshToken);
    return refreshResult;
}


const checkUserByToken = async (token) => {
    try{
        const response = await axios.get('/api/user', {
            headers : {
                'Authorization': 'Bearer ' + token,
            }
        });
        const  result         = response.data;
        if (result.status == 'success') {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}


const refresingUserToken = async (userRefreshToken) => {
    try{
        const response = await axios.post('/api/refresh-token', {}, {
            headers : {
                'Authorization': 'Bearer ' + userRefreshToken,
            }
        });
        const result = response.data;
        if (result.status == 'success') {
            localStorage.setItem("user-token", result.data.token);
            localStorage.setItem("user-refresh-token", result.data.refresh_token);
            localStorage.setItem("user-data", JSON.stringify(result.data.user));
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}


export function userToken(req) {
    let token = localStorage.getItem("user-token") || null;
    return token
}