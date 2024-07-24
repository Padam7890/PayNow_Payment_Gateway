// app/layout.tsx
"use client";

import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "../provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "../redux/store";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Provider store={store}>
        <Providers>
          <body className={poppins.className}>
            <div className="min-w-screen min-h-screen bg-[#F9F9F9]">
              <ToastContainer />
              {children}
            </div>
          </body>
        </Providers>
      </Provider>
    </html>
  );
}
