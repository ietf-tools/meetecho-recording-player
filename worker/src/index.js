export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const normalizedPath = url.pathname.slice(1).toLowerCase();
    var objectName = url.pathname.slice(1);

    if (url.pathname === '/') {
      return Response.redirect('https://datatracker.ietf.org/meeting/past', 302);
    }

    if (normalizedPath === 'playout' || normalizedPath === 'playout/') {
      objectName = 'playout/index.html';
    }

    if (request.method === 'GET') {
      const object = await env.SESSIONS_BUCKET.get(objectName, {
        range: request.headers,
        onlyIf: request.headers,
      });

      if (object === null) {
        return new Response(`Not found`, {
          status: 404
        });
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);
      if (object.range) {
        headers.set("content-range", `bytes ${object.range.offset}-${object.range.end ?? object.size - 1}/${object.size}`);
      }
      const status = object.body ? (request.headers.get("range") !== null ? 206 : 200) : 304;
      return new Response(object.body, {
        headers,
        status
      });
    }

    return new Response(`Unsupported method`, {
      status: 400
    });
  }
};
