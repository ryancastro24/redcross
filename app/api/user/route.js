import { NextResponse } from "next/server";
import prisma from '@/libs/prismaDB'


export async function GET(){
    const user  = await prisma.userInfo.findMany({
        where:{
            userType: "user"
        }
    });
    return NextResponse.json(user);
}   

