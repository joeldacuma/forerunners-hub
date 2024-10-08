export default [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "storage.googleapis.com",
            "dl.airtable.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "storage.googleapis.com",
            "dl.airtable.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      header: [
        "accept-language",
        "Content-Type",
        "Authorization",
        "Accept",
        "X-Timezone",
        "X-Timezone-Name",
      ],
      origin: process.env.WHITELIST_ORIGIN,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
