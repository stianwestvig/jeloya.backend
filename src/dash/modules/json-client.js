import request from 'superagent';
import when from 'when';

const defaultHeaders = [{key:'Accept', value:'application/json'}];
const devHeaders = []; //[{key: 'Authorization', value: 'Basic dGVzdC5icnVrZXI6Qm91dmV0MjAxNiE='}];
const isDev  = false;

export function httpGet(url, query, options) {
    options = options || {};
    return when.promise((resolve, reject) => {
        validateUrl(url, reject);
        var r = request.get(url);
        if(query) {
            r = r.query(query);
        }
        r = setHeaders(r, defaultHeaders);
        if(isDev) {
            r = setHeaders(r, devHeaders);
        }
        r = setHeaders(r, options.headers);
        sendRequest(r, resolve, reject);
    });
}

export function httpPost(url, query, options) {
    options = options || {};
    return when.promise((resolve, reject) => {
        validateUrl(url, reject);
        var r = request.post(url);
        if(query) {
            r = r.send(query);
        }
        r = setHeaders(r, defaultHeaders);
        if(isDev) {
            r = setHeaders(r, devHeaders);
        }
        r = r.set('Content-Type', 'application/json');
        r = setHeaders(r, options.headers);
        sendRequest(r, resolve, reject);
    });
}

export function httpDelete(url, query, options) {
    options = options || {};
    return when.promise((resolve, reject) => {
        validateUrl(url, reject);
        var r = request.del(url);
        if(query) {
            r = r.query(query);
        }
        r = setHeaders(r, defaultHeaders);
        if(isDev) {
            r = setHeaders(r, devHeaders);
        }
        r = setHeaders(r, options.headers);
        sendRequest(r, resolve, reject);
    });
}

export function httpPut(url, query, options) {
    options = options || {};
    return when.promise((resolve, reject) => {
        validateUrl(url, reject);
        var r = request.put(url);
        if(query) {
            r = r.send(query);
        }
        r = setHeaders(r, defaultHeaders);
        if(isDev) {
            r = setHeaders(r, devHeaders);
        }
        r = setHeaders(r, options.headers);
        sendRequest(r, resolve, reject);
    });
}

function setHeaders(r, headers) {
    headers = headers || [];
    headers.forEach(header => {
        r = r.set(header.key, header.value);
    });
    return r;
}

function validateUrl(url, reject) {
    if(!url) {
        reject(new Error('url is a required parameter'));
    }
}

function sendRequest(r, resolve, reject) {
    r.end((err, res) => {
        if (res.ok) {
            resolve(res);
        } else {
            reject(err);
        }
    });
}
