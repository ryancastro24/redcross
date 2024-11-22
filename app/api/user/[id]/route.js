import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDB";

export async function DELETE(req, { params }) {
	if (!params?.id) {
		return NextResponse.json({ message: "Id is missing" }, { status: 400 });
	}

	const deletedUser = await prisma.userInfo.delete({
		where: {
			id: params.id,
		},
	});

	// console.log(`deleted user ${deletedUser.name}`); ken

	return NextResponse.json({ message: "user deleted" });
}

export async function GET(req, { params }) {
	if (!params?.id) {
		return NextResponse.json({ message: "Id is missing" }, { status: 400 });
	}
	const getUser = await prisma.userInfo.findFirst({
		where: {
			id: params.id,
		},
	});

	// console.log(`get user ${getUser.name}`); ken

	return NextResponse.json(getUser);
}

export async function PATCH(req, { params }) {
	if (!params?.id) {
		return NextResponse.json({ message: "Id is missing" }, { status: 400 });
	}
	const { name, email, address, contactNumber, category, gender } =
		await req.json();

	const updateUser = await prisma.userInfo.update({
		where: {
			id: params.id,
		},
		data: {
			name,
			email,
			address,
			contact: contactNumber,
			category,
			gender,
		},
	});

	return NextResponse.json({ message: "update success" });
}
