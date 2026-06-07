export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');
  if (!code) {
    return new Response('Missing code', { status: 400 });
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: import.meta.env.GITHUB_CLIENT_ID,
      client_secret: import.meta.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json() as { access_token?: string; error?: string };

  if (data.error || !data.access_token) {
    return new Response(`OAuth error: ${data.error}`, { status: 400 });
  }

  // Decap CMS attend ce format de message postMessage
  const html = `<!DOCTYPE html>
<html>
<head><title>Authentification réussie</title></head>
<body>
<script>
  window.opener.postMessage(
    'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' }).replace(/'/g, "\\'")}',
    window.location.origin
  );
  window.close();
<\/script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
};
