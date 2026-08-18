import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getOrganizationSchema } from './schema';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from './siteConfig';

export { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE };

interface PageSEOProps {
  /** Page-specific title. The site name is appended automatically. */
  title: string;
  description: string;
  /** Path only, e.g. '/services' or '/doctor/michael-buck' — used to build the canonical + OG URL. */
  path: string;
  image?: string;
  noIndex?: boolean;
  children?: React.ReactNode;
}

const PageSEO: React.FC<PageSEOProps> = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  children,
}) => {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
  const url = `${SITE_URL}${path === '/' ? '' : path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(getOrganizationSchema())}</script>

      {children}
    </Helmet>
  );
};

export default PageSEO;
