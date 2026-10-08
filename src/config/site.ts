/**
 * Single source of truth for the identity of this site.
 *
 * Change it here and both the browser tab and the social preview
 * (X, WhatsApp, Slack, LinkedIn) follow: the Vite plugin and the Next.js
 * metadata read these values, so nothing has to be repeated in
 * `index.html` or `src/app/layout.tsx`.
 */

export const site = {
  name: "@raulmoracode/create",
  title: "@raulmoracode/create — field notes",
  description:
    "Internal CLI that scaffolds my React + Vite and Next.js projects. Built to my taste, forkable to yours.",
  url: "https://github.com/raulmoracode/raulmoracode-create-web",
  favicon: "https://cdn.raulmoracode.com/icons/favicon.ico",
  socialImage: "/imagen.png",
  socialImageAlt:
    "@raulmoracode/create — field notes on scaffolding React + Vite and Next.js projects",
  author: "Raul Mora",
  twitter: "@raulmoracode",
  locale: "en_US",
  themeColor: "#ffffff",
} as const;
