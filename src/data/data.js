import requester from '../utils/requester';
const API_URL = 'http://localhost:9999';

function getAuthOptions(token) {
    return {
        headers: {
            Authorization: token,
        }
    }
}

function getAllCourses (token) {
    return requester(API_URL + '/course/all', 'GET', {}, getAuthOptions(token));
}

function createCourse(language, flag, token) {
    let body = {
        language,
        flag
    }
    return requester(API_URL + '/course/create', 'POST', body, getAuthOptions(token))
}

function getLessonsByCourse(courseId, token) {
    return requester(API_URL + '/lesson/findByCourse/' + courseId, 'GET', {}, getAuthOptions(token));
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

function createLesson(body, token) {
    return requester(API_URL + '/lesson/create', 'POST', body, getAuthOptions(token))
}

function getLesson(lessonId, token) {
    return requester(API_URL + '/lesson/' + lessonId, 'GET', {}, getAuthOptions(token))
}

function addCourseToUser(courseId, userId, token) {
    return requester(API_URL + '/user/addCourse', 'POST', { courseId, userId }, getAuthOptions(token));
}

function removeLesson(lessonId, token) {
    return requester(API_URL + '/lesson/remove/' + lessonId, 'DELETE', {}, getAuthOptions(token));
}

export default {
    getAllCourses,
    loginUser,
    registerUser,
    createCourse,
    createLesson,
    getLessonsByCourse,
    getLesson,
    addCourseToUser,
    removeLesson
}