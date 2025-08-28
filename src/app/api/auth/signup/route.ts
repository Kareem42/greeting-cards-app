import { prisma } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    return NextResponse.json({ error: "User exists" }, { status: 400 });

  const passwordHash = await hash(password, 10);
  const user = await prisma.user.create({
    data: { email, name, passwordHash },
  });

  return NextResponse.json({ id: user.id, email: user.email });
}
