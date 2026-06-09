import type { ServerResponse } from 'http';

export const sendresponse = (
  res: ServerResponse,
  statusCode: number,
  success: boolean,
  message: string,
  data?: any
) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
  });

  res.end(
    JSON.stringify({
      success,
      message,
      data,
    })
  );
};
