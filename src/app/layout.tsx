import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MathScrollAnimation from "@/components/MathScrollAnimation";
import "./globals.css";

export const metadata: Metadata = {
  title: "CalculationDesk - Free Online Calculators for Finance, Math, Health & Life",
  description: "Calculate loans (EMI), track physical health (BMI), check age details, and search 500+ free online calculators. Simple, accurate, and lightning-fast calculations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <MathScrollAnimation />
          </div>
        </ThemeProvider>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-K55FBHB60R"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-K55FBHB60R');
            `,
          }}
        />
      </body>
    </html>
  );
}

