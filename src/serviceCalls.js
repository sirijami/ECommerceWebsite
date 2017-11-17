import { appkey } from './constants';

// This is an example of faking a service call
// This can be replaced with a real call
// and whatever calls this won't have to change
export const callLogin = ({ username, password }) => {
  let result = appkey; // this gets overwritten, just showing we can pull in an appkey variable
  if(username === 'cat' && password ) {
    result = new Response(JSON.stringify({ username: 'cat', userLevel: 'normal' }), {status: 200 });
  } else {
    result = new Response("fake error", { status: 401 });
  }
  return Promise.resolve(result); // returns a promise of a response, just like fetch()
};
