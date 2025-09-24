export default function handler(request, response) {
  // Vercel 会将客户端的 IP 地址放在 'x-forwarded-for' 请求头中
  const forwarded = request.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0].trim() : request.socket.remoteAddress;
  
  // 设置响应头为 JSON
  response.setHeader('Content-Type', 'application/json');
  
  // 返回 IP 地址
  response.status(200).json({ ip: ip });
}