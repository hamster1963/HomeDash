import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
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
        <Providers>
          <SSEConnectProvider>{children}</SSEConnectProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
