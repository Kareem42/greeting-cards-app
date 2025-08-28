import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Reflection of Me",
  description: "Personalized greeting card ecommerce app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
            <h1 className="text-xl font-bold">Greeting Cards</h1>
            <nav className="flex gap-4">
              {/* <a href="/" className="hover:underline">Home</a> */}
              <a href="/builder" className="hover:underline">
                Card Builder
              </a>
              <a href="/checkout" className="hover:underline">
                Checkout
              </a>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
        <footer className="bg-gray-100 py-6 mt-12 text-center text-sm">
          © {new Date().getFullYear()} Greeting Cards
        </footer>
      </body>
    </html>
  );
}
