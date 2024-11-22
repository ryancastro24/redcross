import { NextResponse } from "next/server";
import prisma from '@/libs/prismaDB';

export async function GET() {
  try {
    const ratings = await prisma.ratings.findMany({
      select: {
        instructorId: true,
        userId: true, // Assuming there is a userId field in the ratings table
        user: true, // To capture if the user field is null or not
        rate1: true,
        rate2: true,
        rate3: true,
        rate4: true,
        rate5: true,
      },
    });

    // Process the data to calculate the sum of each rating (rate1, rate2, etc.) and unique users per instructor
    const instructorStats = {};

    ratings.forEach((rating) => {
      const { instructorId, userId, rate1, rate2, rate3, rate4, rate5 } = rating;

      // Initialize instructor entry if not already present
      if (!instructorStats[instructorId]) {
        instructorStats[instructorId] = {
          instructorId,
          userIds: new Set(), // Use a Set to store unique user IDs
          ratingCounts: { rate1: 0, rate2: 0, rate3: 0, rate4: 0, rate5: 0 }, // Sum of ratings
          totalRatings: 0, // Total number of ratings
        };
      }

      // Add the userId to the Set (automatically handles uniqueness)
      if (userId !== null) {
        instructorStats[instructorId].userIds.add(userId);
      }

      // Sum up individual ratings for each instructor
      instructorStats[instructorId].ratingCounts.rate1 += rate1 || 0;
      instructorStats[instructorId].ratingCounts.rate2 += rate2 || 0;
      instructorStats[instructorId].ratingCounts.rate3 += rate3 || 0;
      instructorStats[instructorId].ratingCounts.rate4 += rate4 || 0;
      instructorStats[instructorId].ratingCounts.rate5 += rate5 || 0;

      // Increment the total number of ratings for each instructor
      instructorStats[instructorId].totalRatings += 5; // Since there are 5 ratings per user
    });

    // Get the list of instructorIds to fetch instructor details
    const instructorIds = Object.keys(instructorStats).map((id) => id.toString()); // Convert to strings

    // Fetch the instructor details
    const instructorDetails = await prisma.instructors.findMany({
      where: {
        id: {
          in: instructorIds, // Only fetch the instructors in the stats list
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        field: true,
        // Include other fields you need
      },
    });

    // Combine instructor details with their rating stats
    const rankedInstructors = instructorDetails.map((instructor) => {
      const stats = instructorStats[instructor.id];

      // console.log("new data",stats) ken

      return {
        ...instructor, // Spread instructor details (e.g., name, email)
        ratings: stats.ratingCounts, // Add rating counts (sum of rate1, rate2, etc.)
        totalRatings: stats.totalRatings, // Add total number of all ratings
        userRatingCount: stats.userIds.size, // Total unique users who rated this instructor
      };
    });

    // Add the count of users where the `user` field is null but `userId` exists to userRatingCount
    ratings.forEach((rating) => {
      const { instructorId, userId, user } = rating;

      // If user is null but userId exists, we increment the userRatingCount
      if (user === null && userId !== null) {
        rankedInstructors.find(inst => inst.id === instructorId).userRatingCount += 1;
      }
    });

    // Optionally sort instructors by any criteria, for example, total ratings or a specific rating type
    rankedInstructors.sort(
      (a, b) => b.ratings.rate1 + b.ratings.rate2 + b.ratings.rate3 + b.ratings.rate4 + b.ratings.rate5
        - (a.ratings.rate1 + a.ratings.rate2 + a.ratings.rate3 + a.ratings.rate4 + a.ratings.rate5)
    );

    // Return the ranked instructors as a response
    return NextResponse.json(rankedInstructors);
  } catch (error) {
    console.error("Error fetching instructors and ratings:", error);
    return NextResponse.json(
      { error: "Failed to fetch instructors and ratings" },
      { status: 500 }
    );
  }
}




