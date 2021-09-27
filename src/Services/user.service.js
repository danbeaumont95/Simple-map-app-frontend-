import axios from 'axios';

const register = async (username, password, email, firstName, lastName) => {
    const res = await axios.post('http://localhost:5001/api/users/register', {
        username, password, email, firstName, lastName
    });
    console.log(res, 'res in service')
    return res;
};

const login = async (email, password) => {
    const res = await axios.post('http://localhost:5001/api/users/login', {
        email,
        password
    });
    console.log(res, 'res in service');
    return res;
};

const getUserNameFromEmail = async (email) => {
    console.log(email, 'email in US')
    const res = await axios.post('http://localhost:5001/api/users/getusernamefromemail', {
        email
    });
    return res;
}

export default {
    register,
    login,
    getUserNameFromEmail
}