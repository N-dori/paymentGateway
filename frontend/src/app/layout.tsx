import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/scss/main.scss"; // Global SCSS import

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className}  main-layout`}>
          {children}
        {/* <Footer/> */}
      </body>
    </html>  
  );
}
