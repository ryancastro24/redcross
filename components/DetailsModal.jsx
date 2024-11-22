"use client";
import { useState, useEffect } from "react";
import "../app/globals.css";
import { CgClose } from "react-icons/cg";
import Image from "next/image";
import Link from "next/link";
const DetailsModal = ({ isOpen, userData, onClose }) => {
  const [userDataDetails, setUserDataDetials] = useState(userData);

  useEffect(() => {
    setUserDataDetials(userData);
  }, [userData]);

  if (!isOpen) return null;

  return (
    <div className="modal-details-overlay">
      <div className="modal-details-content relative">
        <button className="modal-close" onClick={onClose}>
          <CgClose />
        </button>

        <div className="flex items-center gap-6">
          <div className="w-52 border border-[rgb(24,23,23)] h-52 overflow-hidden rounded-lg relative">
            {userDataDetails?.profilePictureUrl === "" ? (
              <Image
                src="/assets/user profile.jpg"
                fill
                className="object-cover absolute inset-0 w-full h-full"
                alt=""
              />
            ) : (
              <Image
                src={userDataDetails?.profilePictureUrl}
                fill
                className="object-cover absolute inset-0 w-full h-full"
                alt=" "
              />
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl mb-3">
              <b>Name: </b>
              {userDataDetails?.name}
            </h1>
            <h3 className="text-sm">
              <b>Address:</b> {userDataDetails?.address}
            </h3>
            <h3 className="text-sm">
              <b>Email:</b> {userDataDetails?.email}
            </h3>
            <h3 className="text-sm">
              <b>Contact #:</b> {userDataDetails?.contact}
            </h3>
            <h3 className="text-sm">
              <b>Or Number:</b> {userDataDetails?.orNumber}
            </h3>
            <h3 className="text-sm">
              <b>Category:</b> {userDataDetails?.category}
            </h3>
            <h3 className="text-sm">
              <b>Date Started:</b> {userDataDetails?.dateStarted}
            </h3>
            <h3 className="text-sm">
              <b>Status:</b>{" "}
              {userDataDetails?.certificatedApproved
                ? "Graduated"
                : "In Progress"}
            </h3>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 absolute bottom-5 z-50 right-5"></div>
      </div>
    </div>
  );
};

export default DetailsModal;
