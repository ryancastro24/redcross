import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const userRatings = await prisma.ratings.findMany({
    include: {
      user: true,
    },
  });

  if (!userRatings) {
    return NextResponse.json({ message: "no user ratings available" });
  }

  // console.log(userRatings); ken
  return NextResponse.json(userRatings);
}
