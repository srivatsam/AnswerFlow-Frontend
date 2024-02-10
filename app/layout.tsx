import type { Metadata } from "next";
import { Toaster } from "sonner";
import AuthProvider from "../context/Auth";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// Poppins font
const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
// root meta data
export const metadata: Metadata = {
  title: "AnswerFlow AI - Boost Efficiency with Data-Driven Chatbot",
  description:
    "Elevate your business efficiency with AnswerFlow AI. Leverage data-driven chatbot and natural language processing for better insights and automation",
  icons: {
    icon: "/favicon.png",
  },
};
// root layout put scripts and providers for all app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="google"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TRBBRWW8');
          `,
          }}
        />

        {/* scripts for google statists */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
              `,
          }}
        />
      </head>
      <body className={font.className}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TRBBRWW8"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `,
          }}
        />
        <Toaster richColors position="bottom-center" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
