import { prisma } from "@/lib/db";
// import Link from "next/link";
import CategoryCarousel from "@/components/CategoryCarousel";

export default async function ProductsPage() {
  const categories = (await prisma.category.findMany({
    include: { products: true },
  })) as Array<{
    id: string;
    name: string;
    products: Array<{
      id: string;
      title: string;
      image?: string;
      price: number;
    }>;
  }>;

  // Transform the data to match CategoryCarousel interface
  const formattedCategories = categories.map((category) => ({
    id: category.id,
    name: category.name,
    cards: category.products.map((product) => ({
      id: product.id,
      title: product.title,
      image: product.image || "/placeholder.png",
      price: product.price,
    })),
  }));

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 font-playfair">
        Browse Our Collections
      </h1>
      {categories.map((cat) => (
        <CategoryCarousel key={cat.id} category={cat} />
      ))}
      <p className="text-sm text-gray-500 text-center mt-6 sm:hidden">
        👈 Swipe to browse cards 👉
      </p>
    </main>
  );
}
