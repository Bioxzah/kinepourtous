export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const clientId = import.meta.env.GITHUB_CLIENT_ID;
  const scope = 'repo,user';
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`;
  return Response.redirect(url, 302);
};
