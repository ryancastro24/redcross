import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstAid, cpr, pathogen, preparedness, teamwork, userId } = body;

    // Insert new UserAssessment into the database
    const newAssessment = await prisma.userAssessment.create({
      data: {
        firsAid: firstAid,
        cpr: cpr,
        pathogen: pathogen,
        preparedness: preparedness,
        teamwork: teamwork,
        userId: userId,
      },
    });

    return NextResponse.json(newAssessment);
  } catch (error) {
    console.error("Error creating UserAssessment:", error);
    return NextResponse.error(new Error("Failed to create UserAssessment"));
  }
}
