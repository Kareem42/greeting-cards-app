import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import PageWrapper from "@/components/PageWrapper";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
});

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
            <Navbar />
          </div>
        </header>

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
