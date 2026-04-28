import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  return `
<h1>Vue H5 Template Mock Server</h1>
<h2>Mock service is running</h2>
<ul>
<li><a href="/api/auth/login">/api/auth/login (POST)</a></li>
<li><a href="/api/auth/logout">/api/auth/logout (POST)</a></li>
<li><a href="/api/auth/refresh">/api/auth/refresh (POST)</a></li>
<li><a href="/api/user/info">/api/user/info</a></li>
<li><a href="/api/product/list">/api/product/list</a></li>
<li><a href="/api/product/detail?id=1">/api/product/detail?id=1</a></li>
<li><a href="/api/upload">/api/upload</a></li>
</ul>
`;
});
