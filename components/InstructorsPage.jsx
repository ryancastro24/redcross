import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InstructorCardSkeleton from "./InstructorCardSkeleton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Progress } from "@/components/ui/progress";
const InstructorsPage = () => {
  const [instructorRatings, setInstructorRatings] = useState([]);
  const [instructorId, setInstructorId] = useState("");
  const [allUserRatings, setAllUserRatings] = useState([]);
  const [userRatings, setUserRatings] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userRatingLoading, setUserRatingLoading] = useState(true);

  useEffect(() => {
    async function getInstructorsRatings() {
      try {
        // Fetch data from your API endpoint
        const response = await fetch(
          `http://localhost:3000/api/getInstructorRatings`
        ); // Replace with your actual API route
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json(); // Assuming the API returns JSON data
        // console.log(data); ken
        setInstructorRatings(data); // Set the state with the fetched data
        setLoading(false);
        // console.log(data); ken
      } catch (error) {
        // console.error("Error fetching data:", error); ken
      }
    }

    getInstructorsRatings();
  }, []);

  useEffect(() => {
    async function getAllUserRatings() {
      try {
        // Fetch data from your API endpoint
        const response = await fetch(
          `http://localhost:3000/api/getAllUserRatings/${instructorId}`
        ); // Replace with your actual API route
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json(); // Assuming the API returns JSON data
        // console.log(data); ken
        setAllUserRatings(data); // Set the state with the fetched data
        setUserRatingLoading(false);
      } catch (error) {
        // console.error("Error fetching data:", error); ken
      }
    }

    getAllUserRatings();
  }, [instructorId]);

  const handleRatingRange = (rating, numberOfUsers) => {
    // console.log(`Rating: ${rating}, Number of Users: ${numberOfUsers}`); ken

    // Calculate the maximum possible ratings
    const maxRating = 5 * numberOfUsers;
    // console.log(`Max Rating: ${maxRating}`); ken

    // Calculate the final rating percentage
    const finalRating = rating / maxRating;
    const result = finalRating * 100;

    // Use Math.floor() to remove decimals
    const finalResult = Math.floor(result);

    if (finalResult === 0) {
      return 10;
    }

    return finalResult;
  };

  // compare ratings
  const isLargestRating = (currentRatingKey, ratings) => {
    const currentRating = ratings[currentRatingKey];
    return Object.keys(ratings)
      .filter((key) => key !== currentRatingKey) // Exclude current rating
      .every((key) => currentRating > ratings[key]); // Check if it's greater than others
  };

  const getLabelForRating = (key) => {
    switch (key) {
      case "rate1":
        return "Trainer's ability to explain the course material:";
      case "rate2":
        return "Engaging and Interactive learning material:";
      case "rate3":
        return "Handle questions and provide feedback during training:";
      case "rate4":
        return "Knowledgeable and confident in delivering the subject matter:";
      case "rate5":
        return "Adhere to the course objectives and training schedule:";
      default:
        return "";
    }
  };

  const handleRatingLabel = (rating) => {
    if (rating <= 10) {
      return "Worst";
    }
    if (rating > 10 && rating < 25) {
      return "Bad";
    }
    if (rating >= 25 && rating < 50) {
      return "Neutral";
    }
    if (rating >= 50 && rating < 75) {
      return "Good";
    }
    if (rating >= 75 && rating < 90) {
      return "Very Good";
    } else {
      return "Excellent";
    }
  };

  const getYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    return year;
  };
  // console.log(userRatings); ken
  return (
    <div className="h-[600px] overflow-auto w-full p-5">
      <h1 className="mb-10 text-xl">
        Instructors <strong>{getYear()}</strong> Performance:
      </h1>
      {loading ? (
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="grid grid-cols-2 gap-10">
            <InstructorCardSkeleton />
            <InstructorCardSkeleton />
          </div>

          <div className="grid grid-cols-2 gap-10">
            <InstructorCardSkeleton />
            <InstructorCardSkeleton />
          </div>
        </div>
      ) : (
        <>
          {userRatings ? (
            <div className="grid grid-cols-2 gap-8">
              {instructorRatings?.map((val) => (
                <Card
                  onClick={() => {
                    setInstructorId(val.id);
                    setUserRatings(false);
                  }}
                  key={val.id}
                  className="w-full cursor-pointer hover:bg-[#bababa]"
                >
                  <CardHeader>
                    <CardTitle>{val.name}</CardTitle>
                    <CardDescription>
                      <strong>Position:</strong> {val.field}
                    </CardDescription>
                    <CardDescription>
                      <strong>Email:</strong> {val.email}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h2>
                      <strong>Rate by :</strong> {val.userRatingCount}{" "}
                      {val.userRatingCount === 1 ? "trainee" : "trainees"}
                    </h2>

                    <div className="mt-10 flex flex-col gap-6">
                      {Object.keys(val.ratings).map((key, index) => (
                        <div className="flex flex-col gap-2" key={index}>
                          <label
                            className="text-sm grid grid-cols-2"
                            htmlFor={`rating${key}`}
                          >
                            <span>{getLabelForRating(key)}</span>
                            <span
                              className={`flex justify-end w-full ${
                                isLargestRating(key, val.ratings)
                                  ? "text-xl font-bold"
                                  : "text-emerald-950"
                              }`}
                            >
                              {handleRatingRange(
                                val.ratings[key],
                                val.userRatingCount
                              )}
                              % (
                              {handleRatingLabel(
                                handleRatingRange(
                                  val.ratings[key],
                                  val.userRatingCount
                                )
                              )}
                              )
                            </span>
                          </label>
                          <Progress
                            className="rounded h-2"
                            value={handleRatingRange(
                              val.ratings[key],
                              val.userRatingCount
                            )}
                          />
                        </div>
                      ))}
                    </div>

                    <div></div>
                  </CardContent>
                  <CardFooter className="flex justify-between"></CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="w-full  h-full">
              <h2 className=" mb-8 text-2xl font-bold flex items-center gap-5">
                {" "}
                <button onClick={() => setUserRatings(true)}>
                  <IoMdArrowRoundBack />
                </button>{" "}
                Trainee's Ratings
              </h2>

              {userRatingLoading ? (
                <div>
                  <h2>Loading...</h2>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-10 ">
                  {allUserRatings.map((val) => (
                    <Card
                      key={val.id}
                      className="w-full cursor-pointer hover:bg-[#bababa]"
                    >
                      <CardHeader>
                        {val.user === null ? (
                          <CardDescription>
                            <span>user not avaible anymore</span>
                          </CardDescription>
                        ) : (
                          <>
                            <CardTitle>{val.user.name}</CardTitle>
                            <CardDescription>
                              <strong>Email:</strong> {val.user.email}
                            </CardDescription>
                          </>
                        )}
                      </CardHeader>

                      <CardContent>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm grid grid-cols-2 w-full">
                            <span>
                              Trainer's ability to explain the course material:
                            </span>{" "}
                            <span className="flex justify-end w-full items-center">
                              {val.rate1 * 10 * 2}%
                            </span>
                          </span>
                          <Progress
                            className="rounded h-2"
                            value={val.rate1 * 10 * 2}
                          />
                        </div>
                      </CardContent>

                      <CardContent>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm grid grid-cols-2 w-full">
                            <span>
                              Engaging and Interactive learning material:
                            </span>{" "}
                            <span className="flex justify-end items-center w-full">
                              {val.rate2 * 10 * 2}%
                            </span>
                          </span>
                          <Progress
                            className="rounded h-2"
                            value={val.rate2 * 10 * 2}
                          />
                        </div>
                      </CardContent>

                      <CardContent>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm grid grid-cols-2 w-full">
                            <span>
                              Handle questions and provide feedback during
                              training:
                            </span>{" "}
                            <span className="flex justify-end items-center w-full">
                              {val.rate3 * 10 * 2}%
                            </span>
                          </span>
                          <Progress
                            className="rounded h-2 "
                            value={val.rate3 * 10 * 2}
                          />
                        </div>
                      </CardContent>

                      <CardContent>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm grid grid-cols-2 w-full">
                            <span>
                              Knowledgeable and confident in delivering the
                              subject matter:
                            </span>{" "}
                            <span className="flex justify-end items-center w-full">
                              {val.rate4 * 10 * 2}%
                            </span>
                          </span>
                          <Progress
                            className="rounded h-2"
                            value={val.rate4 * 10 * 2}
                          />
                        </div>
                      </CardContent>

                      <CardContent>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm grid grid-cols-2 w-full">
                            <span>
                              Adhere to the course objectives and training
                              schedule:
                            </span>{" "}
                            <span className="flex justify-end items-center w-full">
                              {val.rate5 * 10 * 2}%
                            </span>
                          </span>
                          <Progress
                            className="rounded h-2"
                            value={val.rate5 * 10 * 2}
                          />
                        </div>
                      </CardContent>

                      <CardFooter className="flex justify-between"></CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InstructorsPage;
