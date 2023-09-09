import axios from "@/utils/axios";

export async function isAuthenticated(req) {
    let token    = localStorage.getItem("user-token") || null;
    let userData = localStorage.getItem("user-data") || null;

    if(token == null) {
        return false;
    }

    try{
        const response = await axios.get('/api/user', {
            headers : {
                'Authorization': 'Bearer ' + userToken(),
            }
        });
        const result = response.data;
        return result.status == 'success';
    } catch (error) {
        return false;
    }

}

export function userToken(req) {
    let token = localStorage.getItem("user-token") || null;
    return token
}