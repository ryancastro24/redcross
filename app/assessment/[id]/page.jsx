"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";

const Assessment = ({ params }) => {
	const { id } = params;

	if (!params?.id) {
		return NextResponse.json({ message: "Id is missing" }, { status: 400 });
	}

	const router = useRouter();
	const [assessmentData, setAssessmentData] = useState({
		firstAid: "",
		cpr: "",
		pathogen: "",
		preparedness: "",
		teamwork: "",
	});
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const usersData = await axios.get("/api/user");
				const data = usersData.data;
				setUsers(data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		getUsers();
	}, []);
	// remove users in dependency

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios
			.post("/api/assessment", { ...assessmentData, userId: id })
			.then(() => {
				alert("assessment data has been saved");

				router.push("/dashboard");

				//  toast('Trainee Has Been Added', {
				//    position: "top-right",
				//    autoClose: 5000,
				//    hideProgressBar: false,
				//    closeOnClick: true,
				//    pauseOnHover: true,
				//    draggable: true,
				//    progress: undefined,
				//    theme: "light",
				//    });

				//  setLoading(false);
			})
			.catch((error) => {
				alert(error.message);
				//  setUserData({
				//      name:"",
				//      email:"",
				//      password:"",
				//      address:"",
				//      contact:"",

				//  })

				//  setLoading(false);
			});
	};

	const user = users.find((val) => val.id === id);

	return (
		<div className="absolute inset-0 z-50 w-full h-full  bg-white p-10">
			<Link
				className="text-lg mb-5 flex items-center gap-2"
				href={"/dashboard"}
			>
				<IoMdArrowRoundBack /> Dashboard
			</Link>
			<h2 className="text-2xl ">Assessment</h2>

			<div>
				<h2>
					{" "}
					<b>Trainee:</b> {user?.name}{" "}
				</h2>
			</div>

			<form
				onSubmit={handleSubmit}
				action=""
				className="flex flex-col gap-10 mt-5 w-1/2 pb-10 "
			>
				<div className="flex flex-col gap-2">
					<label className="text-2xl">Basic First Aid Proficiency:</label>

					<RadioGroup defaultValue="option-one">
						<div className="flex items-center gap-5 ">
							<div>
								{/* <RadioGroupItem value="option-one" id="option-one" /> */}
								<input
									type="radio"
									onChange={(e) =>
										setAssessmentData({
											...assessmentData,
											firstAid: e.target.value,
										})
									}
									id="first-aid-excellent"
									name="first-aid"
									value="excellent"
								/>
								<label htmlFor="first-aid-excellent">Excellent</label>
							</div>
							<div>
								<input
									type="radio"
									onChange={(e) =>
										setAssessmentData({
											...assessmentData,
											firstAid: e.target.value,
										})
									}
									id="first-aid-good"
									name="first-aid"
									value="good"
								/>
								<label htmlFor="first-aid-good">Good</label>
							</div>
							<div>
								<input
									type="radio"
									onChange={(e) =>
										setAssessmentData({
											...assessmentData,
											firstAid: e.target.value,
										})
									}
									id="first-aid-satisfactory"
									name="first-aid"
									value="satisfactory"
								/>
								<label htmlFor="first-aid-satisfactory">Satisfactory</label>
							</div>
							<div>
								<input
									type="radio"
									onChange={(e) =>
										setAssessmentData({
											...assessmentData,
											firstAid: e.target.value,
										})
									}
									id="first-aid-needs-improvement"
									name="first-aid"
									value="needs-improvement"
								/>
								<label htmlFor="first-aid-needs-improvement">
									Needs Improvement
								</label>
							</div>
							<div>
								<input
									type="radio"
									onChange={(e) =>
										setAssessmentData({
											...assessmentData,
											firstAid: e.target.value,
										})
									}
									id="first-aid-unsatisfactory"
									name="first-aid"
									value="unsatisfactory"
								/>
								<label htmlFor="first-aid-unsatisfactory">Unsatisfactory</label>
							</div>
						</div>
					</RadioGroup>
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-2xl">CPR and AED Use:</label>

					<div className="flex items-center gap-5">
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({ ...assessmentData, cpr: e.target.value })
								}
								id="cpr-excellent"
								name="cpr"
								value="excellent"
							/>
							<label htmlFor="cpr-excellent">Excellent</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({ ...assessmentData, cpr: e.target.value })
								}
								id="cpr-good"
								name="cpr"
								value="good"
							/>
							<label htmlFor="cpr-good">Good</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({ ...assessmentData, cpr: e.target.value })
								}
								id="cpr-satisfactory"
								name="cpr"
								value="satisfactory"
							/>
							<label htmlFor="cpr-satisfactory">Satisfactory</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({ ...assessmentData, cpr: e.target.value })
								}
								id="cpr-needs-improvement"
								name="cpr"
								value="needs-improvement"
							/>
							<label htmlFor="cpr-needs-improvement">Needs Improvement</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({ ...assessmentData, cpr: e.target.value })
								}
								id="cpr-unsatisfactory"
								name="cpr"
								value="unsatisfactory"
							/>
							<label htmlFor="cpr-unsatisfactory">Unsatisfactory</label>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-2xl">Handling Bloodborne Pathogens:</label>
					<div className="flex items-center gap-5">
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										pathogen: e.target.value,
									})
								}
								id="pathogens-excellent"
								name="pathogens"
								value="excellent"
							/>
							<label htmlFor="pathogens-excellent">Excellent</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										pathogen: e.target.value,
									})
								}
								id="pathogens-good"
								name="pathogens"
								value="good"
							/>
							<label htmlFor="pathogens-good">Good</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										pathogen: e.target.value,
									})
								}
								id="pathogens-satisfactory"
								name="pathogens"
								value="satisfactory"
							/>
							<label htmlFor="pathogens-satisfactory">Satisfactory</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										pathogen: e.target.value,
									})
								}
								id="pathogens-needs-improvement"
								name="pathogens"
								value="needs-improvement"
							/>
							<label htmlFor="pathogens-needs-improvement">
								Needs Improvement
							</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										pathogen: e.target.value,
									})
								}
								id="pathogens-unsatisfactory"
								name="pathogens"
								value="unsatisfactory"
							/>
							<label htmlFor="pathogens-unsatisfactory">Unsatisfactory</label>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-2xl">Emergency Preparedness:</label>

					<div className="flex items-center gap-5">
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										preparedness: e.target.value,
									})
								}
								id="preparedness-excellent"
								name="preparedness"
								value="excellent"
							/>
							<label htmlFor="preparedness-excellent">Excellent</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										preparedness: e.target.value,
									})
								}
								id="preparedness-good"
								name="preparedness"
								value="good"
							/>
							<label htmlFor="preparedness-good">Good</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										preparedness: e.target.value,
									})
								}
								id="preparedness-satisfactory"
								name="preparedness"
								value="satisfactory"
							/>
							<label htmlFor="preparedness-satisfactory">Satisfactory</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										preparedness: e.target.value,
									})
								}
								id="preparedness-needs-improvement"
								name="preparedness"
								value="needs-improvement"
							/>
							<label htmlFor="preparedness-needs-improvement">
								Needs Improvement
							</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										preparedness: e.target.value,
									})
								}
								id="preparedness-unsatisfactory"
								name="preparedness"
								value="unsatisfactory"
							/>
							<label htmlFor="preparedness-unsatisfactory">
								Unsatisfactory
							</label>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-2xl">Communication and Teamwork:</label>

					<div className="flex items-center gap-5">
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										teamwork: e.target.value,
									})
								}
								id="teamwork-excellent"
								name="teamwork"
								value="excellent"
							/>
							<label htmlFor="teamwork-excellent">Excellent</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										teamwork: e.target.value,
									})
								}
								id="teamwork-good"
								name="teamwork"
								value="good"
							/>
							<label htmlFor="teamwork-good">Good</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										teamwork: e.target.value,
									})
								}
								id="teamwork-satisfactory"
								name="teamwork"
								value="satisfactory"
							/>
							<label htmlFor="teamwork-satisfactory">Satisfactory</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										teamwork: e.target.value,
									})
								}
								id="teamwork-needs-improvement"
								name="teamwork"
								value="needs-improvement"
							/>
							<label htmlFor="teamwork-needs-improvement">
								Needs Improvement
							</label>
						</div>
						<div>
							<input
								type="radio"
								onChange={(e) =>
									setAssessmentData({
										...assessmentData,
										teamwork: e.target.value,
									})
								}
								id="teamwork-unsatisfactory"
								name="teamwork"
								value="unsatisfactory"
							/>
							<label htmlFor="teamwork-unsatisfactory">Unsatisfactory</label>
						</div>
					</div>
				</div>

				<button className="w-full py-3 rounded bg-red-700 text-white">
					SUBMIT
				</button>
			</form>
		</div>
	);
};

export default Assessment;
