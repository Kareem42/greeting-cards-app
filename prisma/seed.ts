// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.create({
    data: {
      name: "Custom Greeting Card",
      type: "GREETING_CARD",
      price: 599, // $5.99
      active: true,
    },
  });
  console.log("✅ Seeded product");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
