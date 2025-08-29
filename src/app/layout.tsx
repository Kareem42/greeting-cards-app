import "./globals.css";
import { Inter } from "next/font/google";
import PageWrapper from "@/components/PageWrapper";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-black shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
            <h1 className={playfair.className}>Reflections of Me</h1>
            <nav className="flex gap-4">
              <a href="/home" className="hover:underline">
                Home
              </a>
              <a href="/products" className="hover:underline">
                Products
              </a>
              <a href="/builder" className="hover:underline">
                Builder
              </a>
            </nav>
          </div>
        </header>

        {/* Wrap your children here */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <PageWrapper>{children}</PageWrapper>
        </main>

        <footer className="bg-gray-100 py-6 mt-12 text-center text-sm">
          © {new Date().getFullYear()} Greeting Cards
        </footer>
      </body>
    </html>
  );
}
