import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDB";

export async function PUT(req, { params }) {
	const { certificateUrl } = await req.json();

	if (!params?.id) {
		return NextResponse.json({ message: "Id is missing" }, { status: 400 });
	}
	const user = await prisma.userInfo.findUnique({
		where: {
			id: params.id,
		},
	});

	// console.log(user);

	if (!user) {
		return NextResponse.json({ message: "no user found" });
	}

	const updatedUser = await prisma.userInfo.update({
		where: {
			id: params.id,
		},
		data: {
			certificateUrl: certificateUrl,
		},
	});

	// console.log(updatedUser) ken

	return NextResponse.json({ message: "certificate uploaded" });
}
