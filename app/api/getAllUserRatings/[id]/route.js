import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(req, { params }) {
  const { id } = params;

  if (!params?.id) {
    return NextResponse.json({ message: "Id is missing" }, { status: 400 });
  }

  const userRatings = await prisma.ratings.findMany({
    where: {
      instructorId: id,
    },
    include: {
      user: true,
    },
  });

  if (!userRatings) {
    return NextResponse.json({ message: "no user ratings available" });
  }

  return NextResponse.json(userRatings);
}
