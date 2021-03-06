export default async function request (url, method = 'GET', body = null, options = {}) {
    let fetchOptions = {
        method: method.toUpperCase(),
        ...options
    }

    if (fetchOptions.hasOwnProperty('headers')) {
        fetchOptions.headers['Content-Type'] = 'application/json'
    } else {
        fetchOptions.headers = {'Content-Type': 'application/json'}
    }

    if (body && method.toUpperCase() !== 'GET') {
        fetchOptions.body = JSON.stringify(body);
    }
    
    let raw = await fetch(url, fetchOptions);

    return raw.json();
}