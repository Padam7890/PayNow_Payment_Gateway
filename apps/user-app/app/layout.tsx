import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "../provider";
import { AppbarClient } from "../components/AppbarClient";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SocketProvider } from "./contexts/SocketContent";
import NotificationHandler from "../components/NotificationHandler";
import { useSession } from "next-auth/react";
const poppins = Poppins({ 
  subsets: ["latin"] ,
  display: "swap",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      
      <Providers>
      <SocketProvider>
        <body className={poppins.className}>

          <div className="min-w-screen min-h-screen bg-[#F9F9F9]">
            <ToastContainer />

            {children}
          </div>
        </body>
        </SocketProvider>

      </Providers>

    </html>
  );
}