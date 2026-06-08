import type { IncomingMessage, ServerResponse } from 'http';
import { productcontroller } from '../controller/product.contoroller';

export const routeHandeler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(
      JSON.stringify({ message: 'This is the home page ok .............' })
    );
  } else if (url?.startsWith('/products')) {
    productcontroller(req, res);
  } else {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'Page not found . status code : 404 ' }));
  }
};
