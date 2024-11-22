


import { NextResponse } from "next/server";
import prisma from '@/libs/prismaDB';

export async function GET() {
  const currentYear = new Date().getFullYear();

  // Fetch all users for the current year
  const users = await prisma.userInfo.findMany({
    where: {
      userType: "user",
      dateCreated: {
        gte: new Date(currentYear, 0, 1),  // January 1st of the current year
        lt: new Date(currentYear + 1, 0, 1),  // January 1st of the next year
      },
    },
    select: {
      dateCreated: true,
      category: true,  // "standard" or "occupational"
      gender: true,    // "male" or "female"
    },
  });

  // Initialize an object with all months of the current year
  const dataPerMonth = {};
  for (let i = 0; i < 12; i++) {
    const yearMonth = `${currentYear}-${String(i + 1).padStart(2, '0')}`; // Format: YYYY-MM
    dataPerMonth[yearMonth] = {
      standard: 0,
      standardGender: { male: 0, female: 0 },
      occupational: 0,
      occupationalGender: { male: 0, female: 0 },
    };
  }

  // Iterate through the user data and populate the months
  users.forEach((user) => {
    const date = new Date(user.dateCreated);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Get year-month format
    const category = user.category;
    const gender = user.gender;

    // Increment the count based on the user's category and gender
    if (category === 'standard') {
      dataPerMonth[yearMonth].standard += 1; // Increment total for standard category
      if (gender === 'male') {
        dataPerMonth[yearMonth].standardGender.male += 1;
      } else if (gender === 'female') {
        dataPerMonth[yearMonth].standardGender.female += 1;
      }
    } else if (category === 'occupational') {
      dataPerMonth[yearMonth].occupational += 1; // Increment total for occupational category
      if (gender === 'male') {
        dataPerMonth[yearMonth].occupationalGender.male += 1;
      } else if (gender === 'female') {
        dataPerMonth[yearMonth].occupationalGender.female += 1;
      }
    }
  });

  // Format the data into a response, ordered by month
  const formattedData = Object.keys(dataPerMonth).map((month) => ({
    month,
    standard: dataPerMonth[month].standard,  // Total count of standard users
    standardGender: {
      male: dataPerMonth[month].standardGender.male,
      female: dataPerMonth[month].standardGender.female,
    },
    occupational: dataPerMonth[month].occupational,  // Total count of occupational users
    occupationalGender: {
      male: dataPerMonth[month].occupationalGender.male,
      female: dataPerMonth[month].occupationalGender.female,
    },
  }));

  return NextResponse.json(formattedData);
}
