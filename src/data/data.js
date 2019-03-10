import requester from '../utils/requester';
const API_URL = 'http://localhost:9999';

function getAllCourses (token) {
    return requester(API_URL + '/course/all', 'GET', {}, {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        }
    });
}

export default {
    getAllCourses
}