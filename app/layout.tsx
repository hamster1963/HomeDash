import { Inter } from "next/font/google";
import Script from "next/script";
import React from "react";

import { SSEConnectProvider } from "@/app/home/utils/sseContext";

import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <Script
          src="https://umami.buycoffee.top/script.js"
          data-website-id="d51d1579-2f3e-4d7d-9172-a860c016ec58"
        />
        <Providers>
          <SSEConnectProvider>{children}</SSEConnectProvider>
        </Providers>
      </body>
    </html>
  );
}
