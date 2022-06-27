const axios = require('axios');

const signup = async ({ email, password}) => {
    const response = await httpClient({
        method : 'post',
        url: '/api/users/signup',
        payload: {
            email,
            password,
        }
    });

    if (!response) return;
    const { newUser } = response.data;
    console.log('signup response', newUser);
    return newUser;
};



const httpClient = async ({ method = 'get', url, payload}) => {
    if (!url) {
        throw Error('URL not defined');
    }
    let response;
    try {
        if (method === 'post') {
            response = await axios.post(url, payload);
        } else {
            response = await axios.get(url, payload);
        }
    } catch (e) {
        console.log('error making API call', e);
    }
    return response;

}

module.exports = { signup };