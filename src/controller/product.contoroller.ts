import type { IncomingMessage, ServerResponse } from 'http';
import { insertproduct, readproduct } from '../services/product.services';
import type { Iproduct } from '../types/product.type';
import { parseBody } from '../utility/parseBody';
import { log } from 'console';

export const productcontroller = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const url = req.url;
  const method = req.method;

  const urlparts = url?.split('/');
  const id =
    urlparts && urlparts[1] === 'products' ? Number(urlparts[2]) : undefined;

  // console.log( 'thisis hte id ', id)

  if (url === '/products' && method === 'GET') {
    // const products = [
    //   {
    //     id: 1,
    //     name: 'product-1',
    //   },
    // ];
    const products = readproduct();
    res.writeHead(200, { 'content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        message: 'This is the products page.',
        data: products,
      })
    );
  } else if (method === 'GET' && id !== undefined) {
    const products = readproduct();
    const product = products.find((p: Iproduct) => p.id === id);
    console.log(product);
    res.writeHead(200, { 'content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        message: 'This is the products page.',
        data: product,
      })
    );
  } else if (method === 'POST' && url === '/products') {
    const body = await parseBody(req);
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    // console.log(newProduct);
    // console.log(' ', body);
    const products = readproduct();
    products.push(newProduct);
    insertproduct(products)
    res.writeHead(200, { 'content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        message: 'This is the products page.',
        data: newProduct,
      })
    );
  }
};
