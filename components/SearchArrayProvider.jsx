"use client";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SearchArrayDataProvider = createContext(null);

const SearchArrayProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [searchData, setSearchData] = useState("");
	const [searchDataArchives, setSearchDataArchives] = useState("");

	useEffect(() => {
		const getUsers = async () => {
			try {
				const usersData = await axios.get(`/api/user?timestamp=${Date.now()}`);
				const data = usersData.data;
				setUsers(data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		getUsers();
	}, []);
	// ken remove user in dependency
	const notAdminUsers = users.filter(
		(val) => val.userType !== "admin" && val.certificatedApproved === false
	);
	const graudatedUsers = users.filter(
		(val) => val.certificatedApproved === true
	);

	const finalUsers = notAdminUsers.filter((val) => {
		const lowercaseSearch = searchData.toLowerCase();
		// Check if the name or any other data fields contain the search query
		return Object.values(val).some(
			(field) =>
				typeof field === "string" &&
				field.toLowerCase().includes(lowercaseSearch)
		);
	});

	const archivedUsers = graudatedUsers.filter((val) => {
		const lowercaseSearch = searchDataArchives.toLowerCase();
		// Check if the name or any other data fields contain the search query
		return Object.values(val).some(
			(field) =>
				typeof field === "string" &&
				field.toLowerCase().includes(lowercaseSearch)
		);
	});

	return (
		<SearchArrayDataProvider.Provider
			value={{
				finalUsers,
				searchData,
				setSearchData,
				archivedUsers,
				searchDataArchives,
				setSearchDataArchives,
			}}
		>
			{children}
		</SearchArrayDataProvider.Provider>
	);
};

export default SearchArrayProvider;
