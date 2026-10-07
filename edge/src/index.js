const ORIGIN = 'https://typing-flash.pages.dev';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.protocol = 'https:';
    url.hostname = new URL(ORIGIN).hostname;
    url.port = '';

    const headers = new Headers(request.headers);
    headers.delete('host');

    const init = { method: request.method, headers, redirect: 'manual' };
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      init.body = request.body;
    }
    return fetch(new Request(url.toString(), init));
  },
};