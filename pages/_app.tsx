import "tailwindcss/tailwind.css";
import { Analytics } from "@vercel/analytics/react";

import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/header";
import { Auth0Provider } from "@auth0/auth0-react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧙🏿</text></svg>"
        ></link>
        <meta
          name="description"
          content="Write grant applications faster with Grant Wizard"
        />
        <title>Grant Wizard</title>
      </Head>

      <Header />

      <main className="py-6">
        <Component {...pageProps} />
      </main>
      <Analytics />
    </Auth0Provider>
  );
}
