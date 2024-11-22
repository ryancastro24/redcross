import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
  try {
    const { formattedDate } = await req.json();

    if (!params?.id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Validate if formattedDate is provided
    if (!formattedDate) {
      return NextResponse.json(
        { message: "Formatted date is required" },
        { status: 400 }
      );
    }

    const updateUser = await prisma.userInfo.update({
      where: {
        id: params.id, // Ensure the route is dynamic like `/api/user/[id]`
      },
      data: {
        certificatedApproved: true,
        dateEnded: formattedDate,
      },
    });

    return NextResponse.json({
      message: "Update successful",
      updatedUser: updateUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error updating user", error: error.message },
      { status: 500 }
    );
  }
}
