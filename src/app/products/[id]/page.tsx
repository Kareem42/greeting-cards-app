import { prisma } from "@/lib/db";
import Link from "next/link";

type Props = { params: Promise<{ id: string }> }; // params is now a Promise

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params; // await params first
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <img
        src="https://placehold.co/600x400"
        className="w-full h-auto rounded border"
      />
      <h1 className="text-4xl font-bold mt-4">{product.name}</h1>
      <p className="text-xl text-gray-600 mt-2">
        ${(product.price / 100).toFixed(2)}
      </p>
      <Link
        href={`/builder?productId=${product.id}`}
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500"
      >
        Customize This Card
      </Link>
    </div>
  );
}
