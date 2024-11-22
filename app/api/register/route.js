import prisma from '@/libs/prismaDB'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req){

    const body  = await req.json();
    const {name,email,password,address,contact,category,gender,dateStarted,profilePictureUrl,orNumber} = body;


    // console.log(gender); ken


    if(!name || !email || !password || !address || !contact || !category || !dateStarted || !gender){ //validate input 
        return new NextResponse('Missing Fields', {status:400});
    }

    

    const userExist  = await prisma.userInfo.findUnique({
        where:{
            email:email
        }
    })


    if(userExist){
        throw new Error({message:"email already exist!"}); 
    }


    else{
        const hashedPassword = await  bcrypt.hash(password,10);

        const user = await prisma.userInfo.create({
            data:{
                name:name,
                orNumber:orNumber,
                email:email,
                address:address,
                contact:contact,
                userType: "user",
                password:hashedPassword,
                v:2,
                category:category,
                dateStarted:dateStarted,
                profilePictureUrl:profilePictureUrl,
                gender:gender
            }
        })
    
    
        return NextResponse.json(user);

    }



   

    
}