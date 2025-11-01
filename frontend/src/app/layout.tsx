import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
// import "../app/assets/scss/main.scss"
// import "./globals.css";

const varelaRound = Varela_Round ({ weight:'400',subsets: ["hebrew"] });

export const metadata: Metadata = {
  title: "paymentGateWay",
  description: "your crypto payment solution",
//   icons:{
//     icon:['/favicon.ico?v=4'],
//     apple:['/apple-touch-icon.png?v=4'],
//     shortcut:['/apple-touch-icon.png']
//   },
  manifest: '/site.webmanifest'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en" style={{height:`100%`}}>
      <body className={`${varelaRound.className}  main-layout`}>
          {children}
        {/* <Footer/> */}
      </body>
    </html>  
  );
}
