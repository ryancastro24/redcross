"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { IoArchiveSharp } from "react-icons/io5";
import { SideNavigationProvider } from "./SideNavigationProvider";
import { SiGoogleanalytics } from "react-icons/si";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiCertificate } from "react-icons/pi";

const Sidebar = () => {
  const navigation = useContext(SideNavigationProvider);

  return (
    <div className="w-[250px] h-screen border border-[#0000001e] bg-white  p-5">
      <div className="flex items-center justify-center gap-2">
        <Image
          src={"/assets/white logo.png"}
          width={45}
          height={45}
          alt="logo"
        />
        <h2 className=" text-xl font-bold">RED CROSS</h2>
      </div>

      <ul className="flex flex-col gap-5 items-center mt-10">
        <li
          onClick={() => navigation.setNavigation("form")}
          className={`text-[#141313] ${
            navigation.navigation === "form"
              ? "bg-red-500 text-white font-bold"
              : ""
          } flex items-center px-4 py-3 cursor-pointer rounded text-sm gap-2 w-full`}
        >
          <FaUser /> ADD TRAINEE
        </li>
        <li
          onClick={() => navigation.setNavigation("list")}
          className={`text-[#141313] ${
            navigation.navigation === "list"
              ? "bg-red-500 text-white font-bold"
              : ""
          } flex items-center px-4 py-3 cursor-pointer rounded text-sm gap-2 w-full`}
        >
          <IoPeople /> LIST OF TRAINEES
        </li>
        <li
          onClick={() => navigation.setNavigation("analytics")}
          className={`text-[#141313] ${
            navigation.navigation === "analytics"
              ? "bg-red-500 text-white font-bold"
              : ""
          } flex items-center px-4 py-3 cursor-pointer rounded text-sm gap-2 w-full`}
        >
          <SiGoogleanalytics /> ANALYTICS
        </li>
        <li
          onClick={() => navigation.setNavigation("archive")}
          className={`text-[#141313] ${
            navigation.navigation === "archive"
              ? "bg-red-500 text-white font-bold"
              : ""
          } flex items-center px-4 py-3 cursor-pointer rounded text-sm gap-2 w-full`}
        >
          <IoArchiveSharp /> ARCHIVES
        </li>
        <li
          onClick={() => navigation.setNavigation("instructors")}
          className={`text-[#141313] ${
            navigation.navigation === "instructors"
              ? "bg-red-500 text-white font-bold"
              : ""
          } flex items-center px-4 py-3 cursor-pointer rounded text-sm gap-2 w-full`}
        >
          <FaPeopleGroup /> INSTRUCTORS
        </li>
        <li
          onClick={() => navigation.setNavigation("uploadCerts")}
          className={`text-[#141313] ${
            navigation.navigation === "uploadCerts"
              ? "bg-red-500 text-white font-bold"
              : ""
          } flex items-center px-4 py-3 cursor-pointer rounded text-sm gap-2 w-full`}
        >
          <PiCertificate /> CERTIFICATES
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
