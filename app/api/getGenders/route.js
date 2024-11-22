import { NextResponse } from "next/server";
import prisma from '@/libs/prismaDB'

export async function GET() {
  const genderCounts = await prisma.userInfo.groupBy({
    where:{
      userType:"user"
    },
    by: ['gender'],
    _count: {
      gender: true,
    },
  });
  
  const fillColors = {
    male: "var(--color-male)",
    female: "var(--color-female)",
  };

  const result = genderCounts.map(group => {
    return {
      gender: group.gender,
      total: group._count.gender,
      fill: fillColors[group.gender.toLowerCase()] || "var(--color-default)"
    };
  });

  // console.log(result); ken

  return NextResponse.json(result);
}
