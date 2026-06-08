import { log } from 'console';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { routeHandeler } from './routes/route';

const servcer = createServer((req: IncomingMessage, res: ServerResponse) => {
  // console.log(req.url)  ;
  // console.log(req.method)
  routeHandeler(req, res);
});
servcer.listen(5000, () => {
  console.log('serveris running on port 5000');
});
