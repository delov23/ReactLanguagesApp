export default async function request (url, method = 'GET', body = null, options = {}) {
    let fetchOptions = {
        method: method.toUpperCase(),
        ...options
    }
    
    if (body && method.toUpperCase() !== 'GET') {
        fetchOptions.body = JSON.stringify(body);
    }

    let raw = await fetch(url, fetchOptions);

    return raw.json();
}