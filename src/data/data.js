import requester from '../utils/requester';
const API_URL = 'http://localhost:9999';

function getAllCourses (token) {
    return requester(API_URL + '/course/all', 'GET', {}, {
        headers: {
            Authorization: token,
        }
    });
}

function loginUser (username, password) {
    return requester(API_URL + '/auth/signin', 'POST', {
        username,
        password
    });
}

export default {
    getAllCourses,
    loginUser,
}