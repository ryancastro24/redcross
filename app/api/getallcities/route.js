import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  async function getGroupedCategories() {
    const groupedCategories = await prisma.userInfo.groupBy({
      by: ["address"], // Group by 'address'
      where: {
        userType: {
          notIn: ["admin", "instructor"], // Exclude 'admin' and 'instructor'
        },
      },
      _count: {
        _all: true, // Count total users in each group (optional)
      },
    });

    const result = await Promise.all(
      groupedCategories.map(async (group) => {
        const standardCount = await prisma.userInfo.count({
          where: {
            address: group.address,
            category: "standard",
            userType: {
              notIn: ["admin", "instructor"],
            },
          },
        });

        const occupationalCount = await prisma.userInfo.count({
          where: {
            address: group.address,
            category: "occupational",
            userType: {
              notIn: ["admin", "instructor"],
            },
          },
        });

        return {
          address: group.address,
          standard: standardCount,
          occupational: occupationalCount,
        };
      })
    );

    return result;
  }

  // Call the async function
  const data = await getGroupedCategories();

  // console.log(data); ken
  return NextResponse.json(data);
}
