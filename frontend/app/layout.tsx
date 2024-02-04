'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { ConnectionProvider } from "@solana/wallet-adapter-react";

require('@solana/wallet-adapter-react-ui/styles.css');
const inter = Inter({ subsets: ["latin"] });

// set custom RPC server endpoint for the final website
// const endpoint = "https://explorer-api.devnet.solana.com";
// const endpoint = "http://127.0.0.1:8899";
const endpoint = "https://ssc-dao.genesysgo.net";

// export const metadata: Metadata = {
//   title: "Group Vault App",
//   description: "Traditional Tanda clubs made easy",
// };
const WalletProvider = dynamic(
  () => import("../contexts/ClientWalletProvider"),
  {
    ssr: false,
  }
);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider>
            {children}
          </WalletProvider>
        </ConnectionProvider></body>
    </html>

  );
}


