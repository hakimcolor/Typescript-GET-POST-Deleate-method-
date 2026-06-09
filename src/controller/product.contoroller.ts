// import type { IncomingMessage, ServerResponse } from 'http';
// import { insertproduct, readproduct } from '../services/product.services';
// import type { Iproduct } from '../types/product.type';
// import { parseBody } from '../utility/parseBody';

// export const productcontroller = async (
//   req: IncomingMessage,
//   res: ServerResponse
// ) => {
//   const url = req.url;
//   const method = req.method;

//   const urlparts = url?.split('/');
//   const id =
//     urlparts && urlparts[1] === 'products' ? Number(urlparts[2]) : undefined;

//   // console.log( 'thisis hte id ', id)

//   if (url === '/products' && method === 'GET') {
//     // const products = [
//     //   {
//     //     id: 1,
//     //     name: 'product-1',
//     //   },
//     // ];
//     const products = readproduct();
//     res.writeHead(200, { 'content-Type': 'application/json' });

//     res.end(
//       JSON.stringify({
//         message: 'This is the products page.',
//         data: products,
//       })
//     );
//   } else if (method === 'GET' && id !== undefined) {
//     const products = readproduct();
//     const product = products.find((p: Iproduct) => p.id === id);
//     console.log(product);
//     res.writeHead(200, { 'content-Type': 'application/json' });

//     res.end(
//       JSON.stringify({
//         message: 'This is the products page.',
//         data: product,
//       })
//     );
//   } else if (method === 'POST' && url === '/products') {
//     const body = await parseBody(req);
//     const newProduct = {
//       id: Date.now(),
//       ...body,
//     };
//     // console.log(newProduct);
//     // console.log(' ', body);
//     const products = readproduct();
//     products.push(newProduct);
//     insertproduct(products);
//     res.writeHead(200, { 'content-Type': 'application/json' });

//     res.end(
//       JSON.stringify({
//         message: 'This is the products page.',
//         data: newProduct,
//       })
//     );
//   } // put method for update the product
//   else if (method === 'PUT' && id !== null) {
//     const body = await parseBody(req);
//     const products = readproduct();
//     const index = products.findIndex((p: Iproduct) => p.id === id);
//     console.log(index);
//     if (index < 0) {
//       res.writeHead(404, { 'content-type': 'application/json' });
//       res.end(
//         JSON.stringify({
//           message: 'product not found for update',
//           data: null,
//         })
//       );
//     }
//     products[index] = {
//       id: products[index].id,
//       ...body,
//     };
//     insertproduct(products);
//     res.writeHead(200, { 'content-type': 'application/json' });
//     res.end(
//       JSON.stringify({
//         message: 'product updated successfully',
//         data: products[index],
//       })
//     );
//   } // Delete method
//   else if (method === 'DELETE' && id !== null) {
//     const products = readproduct();
//     const index = products.findIndex((p: Iproduct) => p.id === id);
//     if (index < 0) {
//       res.writeHead(404, { 'content-type': ' application/json' });
//       res.end(
//         JSON.stringify({
//           message: 'product is not found try again ',
//           data: null,
//         })
//       );
//     }
//     products.splice(index, 1);
//     console.log(products);
//     insertproduct(products);
//     res.writeHead(200, { 'content-type': 'application/json' });
//     res.end(
//       JSON.stringify({
//         message: 'product deleted successfully',
//         data: null,
//       })
//     );
//   }
// };
import type { IncomingMessage, ServerResponse } from 'http';
import { insertproduct, readproduct } from '../services/product.services';
import type { Iproduct } from '../types/product.type';
import { parseBody } from '../utility/parseBody';
import { sendresponse } from '../utility/sendresponse';

export const productcontroller = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const url = req.url;
  const method = req.method;

  const urlparts = url?.split('/');

  const id =
    urlparts && urlparts[1] === 'products' ? Number(urlparts[2]) : undefined;

  // GET ALL PRODUCTS
  if (url === '/products' && method === 'GET') {
    const products = readproduct();

    return sendresponse(
      res,
      200,
      true,
      'Products fetched successfully',
      products
    );
  }

  // GET SINGLE PRODUCT
  else if (method === 'GET' && id !== undefined) {
    const products = readproduct();

    const product = products.find((p: Iproduct) => p.id === id);

    if (!product) {
      return sendresponse(res, 404, false, 'Product not found', null);
    }

    return sendresponse(
      res,
      200,
      true,
      'Product fetched successfully',
      product
    );
  }

  // CREATE PRODUCT
  else if (method === 'POST' && url === '/products') {
    const body = await parseBody(req);

    const newProduct = {
      id: Date.now(),
      ...body,
    };

    const products = readproduct();

    products.push(newProduct);

    insertproduct(products);

    return sendresponse(
      res,
      201,
      true,
      'Product created successfully',
      newProduct
    );
  }

  // UPDATE PRODUCT
  else if (method === 'PUT' && id !== undefined) {
    const body = await parseBody(req);

    const products = readproduct();

    const index = products.findIndex((p: Iproduct) => p.id === id);

    if (index < 0) {
      return sendresponse(
        res,
        404,
        false,
        'Product not found for update',
        null
      );
    }

    products[index] = {
      id: products[index].id,
      ...body,
    };

    insertproduct(products);

    return sendresponse(
      res,
      200,
      true,
      'Product updated successfully',
      products[index]
    );
  }

  // DELETE PRODUCT
  else if (method === 'DELETE' && id !== undefined) {
    const products = readproduct();

    const index = products.findIndex((p: Iproduct) => p.id === id);

    if (index < 0) {
      return sendresponse(res, 404, false, 'Product not found', null);
    }

    products.splice(index, 1);

    insertproduct(products);

    return sendresponse(res, 200, true, 'Product deleted successfully', null);
  }

  return sendresponse(res, 404, false, 'Route not found', null);
};