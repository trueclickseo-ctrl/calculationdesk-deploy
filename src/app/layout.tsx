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
        {/* Preconnect to third-party origins — reduces DNS + TLS latency */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Set dark class before first paint — prevents flash of light mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(t==null&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}`,
          }}
        />

        {/* GTM — deferred until after page load to not block LCP */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('load',function(){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-53RFG5QW');});`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* GTM noscript fallback */}
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

        {/* GA — loaded after page via requestIdleCallback for zero impact on LCP/TBT */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                function loadGA(){
                  var s=document.createElement('script');
                  s.async=true;
                  s.src='https://www.googletagmanager.com/gtag/js?id=G-Q7V59CCCKJ';
                  document.head.appendChild(s);
                  window.dataLayer=window.dataLayer||[];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js',new Date());
                  gtag('config','G-Q7V59CCCKJ');
                }
                if('requestIdleCallback' in window){
                  requestIdleCallback(loadGA,{timeout:4000});
                } else {
                  window.addEventListener('load',loadGA);
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
