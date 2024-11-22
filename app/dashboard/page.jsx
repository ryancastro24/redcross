"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import RegisterForm from "@/components/RegisterForm";
import DataTable from "@/components/DataTable";
import Archives from "@/components/Archives";
import axios from "axios";
import Link from "next/link";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { SideNavigationProvider } from "@/components/SideNavigationProvider";
import Analytics from "@/components/Analytics";
import { toast } from "react-toastify";
import InstructorsPage from "@/components/InstructorsPage";
import UploadCerts from "@/components/UploadCerts";
const Dashboard = () => {
	const navigationData = useContext(SideNavigationProvider);

	const [searchData, setSearchData] = useState("");
	const [unlockCertificate, setUnlockCertificate] = useState(false);

	const [loading, setLoading] = useState(false);
	const [update, setUpdate] = useState(false);
	const [updateId, setUpdateId] = useState("");
	const [users, setUsers] = useState([]);

	const handleDelete = async (id) => {
		await axios
			.delete(`/api/user/${id}`)
			.then(() => {
				toast("Trainee Has Been Deleted", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			})
			.catch((e) => alert(e.message));
	};

	const handleUnlockCertificate = async (id) => {
		await axios
			.patch(`/api/certificate/${id}`, { formattedDate: formattedDate })
			.then(() => {
				alert("user certificate has been unlock!");
			})
			.catch((e) => alert(e.message));
	};

	return (
		<div className="flex justify-center items-center w-full bg-white h-full">
			{navigationData.navigation === "form" && (
				<RegisterForm
					update={update}
					setUpdate={setUpdate}
					navigationDataChange={navigationData.setNavigation}
					loading={loading}
					setLoading={setLoading}
				/>
			)}
			{navigationData.navigation === "list" && (
				<DataTable
					handleUnlockCertificate={handleUnlockCertificate}
					handleDelete={handleDelete}
				/>
			)}
			{navigationData.navigation === "analytics" && <Analytics />}
			{navigationData.navigation === "archive" && <Archives />}
			{navigationData.navigation === "instructors" && <InstructorsPage />}
			{navigationData.navigation === "uploadCerts" && <UploadCerts />}
		</div>
	);
};

export default Dashboard;
