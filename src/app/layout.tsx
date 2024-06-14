import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "~/app/topnav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "T3 Gallery",
  description: "Next.js app router learning project",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable}`}>
        <body>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <TopNav />
          <div className="p-4">{children}</div>
          {modal}
          <div id="modal-root" />
        </body>
      </html>
    </ClerkProvider>
  );
}
