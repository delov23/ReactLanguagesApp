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

function registerUser (username, password, firstName, lastName) {
    return requester(API_URL + '/auth/signup', 'POST', {
        username,
        password,
        firstName,
        lastName
    });
}

function createCourse(language, flag, token) {
    let options = {
        headers: {
            Authorization: token
        }
    };
    let body = {
        language,
        flag
    }
    return requester(API_URL + '/course/create', 'POST', body, options)
}

export default {
    getAllCourses,
    loginUser,
    registerUser,
    createCourse
}