export default function handler(request, response) {
  // Parse URL to check for debug query parameter
  // A base URL is required to construct the URL object, but it's not used.
  const url = new URL(request.url, `http://${request.headers.host}`);
  const isDebug = url.searchParams.get('debug') === 'true';

  response.setHeader('Content-Type', 'application/json');

  if (isDebug) {
    // In debug mode, return all headers
    response.status(200).json(request.headers);
  } else {
    // In normal mode, return the client IP
    const forwarded = request.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0].trim() : request.socket.remoteAddress;
    response.status(200).json({ ip: ip });
  }
}