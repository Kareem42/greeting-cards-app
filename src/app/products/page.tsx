import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ where: { active: true } });

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Our Cards</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg p-4 shadow-sm">
            {/* Placeholder image until real product images are added */}
            <img
              src="https://placehold.co/300x200"
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-3">{p.name}</h3>
            <p className="text-gray-600">${(p.price / 100).toFixed(2)}</p>
            <Link
              href={`/products/${p.id}`}
              className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Customize
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
