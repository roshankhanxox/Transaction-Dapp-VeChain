"use client";

import "./globals.css";
import dynamic from "next/dynamic";
const DAppKitProvider = dynamic(
    async () => {
        const { DAppKitProvider: _DAppKitProvider } = await import(
            "@vechain/dapp-kit-react"
        );
        return _DAppKitProvider;
    },
    { ssr: false }
);

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <DAppKitProvider
                    node="https://testnet.vechain.org/"
                    usePersistence
                >
                    {children}
                </DAppKitProvider>
            </body>
        </html>
    );
}
