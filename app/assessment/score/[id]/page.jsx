"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
const Score = ({ params }) => {
  const { id } = params;

  const [userAssessment, setUserAssessment] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await axios.get(`/api/user/score/${id}`);
        const data = usersData.data;
        setUserAssessment(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        console.log(data);
      }
    };

    getUsers();
  }, []);

  if (!userAssessment) {
    return (
      <div className="absolute inset-0 z-50 w-full h-full  bg-white p-5">
        <Link className="text-sm   flex items-center gap-2" href={"/dashboard"}>
          <IoMdArrowRoundBack /> Dashboard
        </Link>

        <div className="flex items-center justify-center w-full h-full">
          <h2 className="text-2xl">User is not assested yet!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 w-full h-full  bg-white p-5">
      <div className="w-full h-full p-5 flex flex-col justify-between rounded">
        <Link className="text-sm   flex items-center gap-2" href={"/dashboard"}>
          <IoMdArrowRoundBack /> Dashboard
        </Link>

        <div className="flex items-center gap-4">
          <div className="w-32 h-32 rounded-full relative overflow-hidden">
            {userAssessment?.user.profilePictureUrl == "" ? (
              <Image
                src={"/assets/user profile.jpg"}
                fill
                className="object-cover absolute inset-0"
                alt=""
              />
            ) : (
              <Image
                src={userAssessment?.user.profilePictureUrl}
                fill
                className="object-cover absolute inset-0"
                alt=""
              />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold ">{userAssessment?.user.name}</h2>
            <span className="text-sm ">
              {" "}
              <b>Email:</b> {userAssessment?.user.email}
            </span>
            <span className="text-sm ">
              {" "}
              <b>Address:</b> {userAssessment?.user.address}
            </span>
            <span className="text-sm ">
              {" "}
              <b>Contact:</b> {userAssessment?.user.contact}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-thin ">_</h2>
            <span className="text-sm ">
              {" "}
              <b>Category:</b> {userAssessment?.user.category}
            </span>
            <span className="text-sm ">
              {" "}
              <b>Or Number:</b> {userAssessment?.user.orNumber}
            </span>
            <span className="text-sm ">
              {" "}
              <b>Date Started:</b> {userAssessment?.user.dateStarted}
            </span>
          </div>
        </div>

        <div className="w-full h-96 bg-red-700 rounded p-5">
          <h2 className="text-white mb-5">Assessment Score</h2>

          <div className="flex flex-col gap-5 h-full ">
            <div>
              <span className="text-white text-sm">
                {" "}
                <b>Basic First Aid Proficiency:</b> {userAssessment?.firsAid}
              </span>

              <div className="w-full h-5 bg-red-300 ">
                <div
                  className={`
                        ${
                          userAssessment?.firsAid === "excellent"
                            ? "w-full bg-green-500"
                            : userAssessment?.firsAid === "good"
                            ? "w-4/5 bg-orange-500"
                            : userAssessment?.firsAid === "satisfactory"
                            ? "w-3/5 bg-yellow-700"
                            : userAssessment?.firsAid === "needs-improvement"
                            ? "w-2/5 bg-yellow-300"
                            : "w-1/5 bg-red-500"
                        }
                        
                        h-full
                        
                        `}
                ></div>
              </div>
            </div>

            <div>
              <span className="text-white text-sm">
                {" "}
                <b>CPR and AED Use:</b> {userAssessment?.cpr}
              </span>

              <div className="w-full h-5 bg-red-300 ">
                <div
                  className={`
                        ${
                          userAssessment?.cpr === "excellent"
                            ? "w-full bg-green-500"
                            : userAssessment?.cpr === "good"
                            ? "w-4/5 bg-orange-500"
                            : userAssessment?.cpr === "satisfactory"
                            ? "w-3/5 bg-yellow-700"
                            : userAssessment?.cpr === "needs-improvement"
                            ? "w-2/5 bg-yellow-300"
                            : "w-1/5 bg-red-500"
                        }
                        
                        h-5
                        
                        `}
                ></div>
              </div>
            </div>

            <div>
              <span className="text-white text-sm">
                {" "}
                <b>Handling Bloodborne Pathogens:</b> {userAssessment?.pathogen}
              </span>

              <div className="w-full h-5 bg-red-300 ">
                <div
                  className={`
                        ${
                          userAssessment?.pathogen === "excellent"
                            ? "w-full bg-green-500"
                            : userAssessment?.pathogen === "good"
                            ? "w-4/5 bg-orange-500"
                            : userAssessment?.pathogen === "satisfactory"
                            ? "w-3/5 bg-yellow-700"
                            : userAssessment?.pathogen === "needs-improvement"
                            ? "w-2/5 bg-yellow-300"
                            : "w-1/5 bg-red-500"
                        }
                        
                        h-5
                        
                        `}
                ></div>
              </div>
            </div>

            <div>
              <span className="text-white text-sm">
                {" "}
                <b>Emergency Preparedness:</b> {userAssessment?.preparedness}
              </span>

              <div className="w-full h-5 bg-red-300 ">
                <div
                  className={`
                        ${
                          userAssessment?.preparedness === "excellent"
                            ? "w-full bg-green-500"
                            : userAssessment?.preparedness === "good"
                            ? "w-4/5 bg-orange-500"
                            : userAssessment?.preparedness === "satisfactory"
                            ? "w-3/5 bg-yellow-700"
                            : userAssessment?.preparedness ===
                              "needs-improvement"
                            ? "w-2/5 bg-yellow-300"
                            : "w-1/5 bg-red-500"
                        }
                        
                        h-5
                        
                        `}
                ></div>
              </div>
            </div>

            <div>
              <span className="text-white text-sm">
                {" "}
                <b>Communication and Teamwork:</b> {userAssessment?.teamwork}
              </span>

              <div className="w-full h-5 bg-red-300 ">
                <div
                  className={`
                        ${
                          userAssessment?.teamwork === "excellent"
                            ? "w-full bg-green-500"
                            : userAssessment?.teamwork === "good"
                            ? "w-4/5 bg-orange-500"
                            : userAssessment?.teamwork === "satisfactory"
                            ? "w-3/5 bg-yellow-700"
                            : userAssessment?.teamwork === "needs-improvement"
                            ? "w-2/5 bg-yellow-300"
                            : "w-1/5 bg-red-500"
                        }
                        
                        h-5
                        
                        `}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
