import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SERVICES, DOCTORS } from '../data/clinicData';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '../public');

const SITE_URL = 'https://www.theclinics.us';

const STATIC_ROUTES = ['/', '/services', '/about', '/contact', '/patient-resources'];

const routes = [
  ...STATIC_ROUTES,
  ...SERVICES.map((s) => `/service/${s.id}`),
  ...DOCTORS.map((d) => `/doctor/${d.id}`),
];

const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /dashboard

Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots);

console.log(`Generated sitemap.xml with ${routes.length} URLs and robots.txt in /public.`);
