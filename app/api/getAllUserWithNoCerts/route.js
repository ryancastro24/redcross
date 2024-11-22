import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const usersWithNoCerts = await prisma.userInfo.findMany({
    where: {
      certificateUrl: "",
    },
  });

  if (usersWithNoCerts.length === 0) {
    return NextResponse.json({ messsage: "No Available Data" });
  }

  return NextResponse.json(usersWithNoCerts);
}
