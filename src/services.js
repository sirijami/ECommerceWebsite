import { host, topic} from './constants';
import {myapp} from './appkey';
const makeHeaders = (headers)=>{
   const finalHeaders = {};
   for(const header of ['Content-Type', 'x-user-token']){
     if(headers[header]) finalHeaders[header] = headers[header];
   }
   finalHeaders['Content-Type'] = headers['Content-Type'] || 'application/json';
   return finalHeaders;
};


const commonFetch = (url, options)=>{
  const headers = makeHeaders(options.headers);
  const request = {
    method: options.method || 'GET',
    headers : headers
  }
  if(options.body) request.body = options.body;
  return fetch(url, request)
  .then((response) => {
    if( response.ok === false ) {
      if( response.status === 401 || response.status === 403) {
        return Promise.reject(response);
      }
      if(response.status === 500){
        return Promise.reject(response);
      }
    }
    return response.json();
  })
  .then((json) => {
    return(json);
  })
  .catch( (passErrors ) => {
    return passErrors;
  });
};


export const signIn = (username, password) => {
    return commonFetch(`//${host}/users/${myapp}/${username}/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( { password })
    });
}

export const productRequest = (token) => {
    return commonFetch(`//${host}/topics/${myapp}/${topic}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-user-token' : token},
    });
}

export const register = ({ username, password }) => {
  return commonFetch(`//${host}/users/${myapp}/${username}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( { password }),
  });
}

export const logout = ({ username, token }) => {
    return commonFetch(`//${host}/users/${myapp}/${username}/session`, {
    method: 'DELETE',
    headers: { 'x-user-token': token },
  });
};
