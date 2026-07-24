import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MathScrollAnimation from "@/components/MathScrollAnimation";
import ScrollNavigator from "@/components/ScrollNavigator";
import "./globals.css";

export const metadata: Metadata = {
  title: "CalculationDesk - Free Online Calculators for Finance, Math, Health & Life",
  description: "Calculate loans (EMI), track physical health (BMI), check age details, and search 280+ free online calculators. Simple, accurate, and lightning-fast calculations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager — loaded after page is interactive */}
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('load',function(){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-53RFG5QW');});`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-53RFG5QW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <MathScrollAnimation />
            <ScrollNavigator />
          </div>
        </ThemeProvider>
        {/* Google Analytics — loaded after page, non-blocking */}
        <script
          defer
          src="https://www.googletagmanager.com/gtag/js?id=G-Q7V59CCCKJ"
        />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-Q7V59CCCKJ');`,
          }}
        />
      </body>
    </html>
  );
}
