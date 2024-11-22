import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDB";

export async function GET(req, { params }) {
	if (!params?.id) {
		return NextResponse.json({ message: "Id is missing" }, { status: 400 });
	}
	const getUser = await prisma.userAssessment.findFirst({
		where: {
			userId: params.id,
		},
		include: {
			user: true,
		},
	});

	return NextResponse.json(getUser);
}
