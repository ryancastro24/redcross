"use client";
import React, { useContext } from "react";
import Image from "next/image";

import { GrView } from "react-icons/gr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Profile from "./Profile";

const UserDetailsModal = ({
  name,
  email,
  gender,
  category,
  orNumber,
  address,
  contact,
  profilePictureUrl,
  id,
}) => {
  return (
    <Dialog>
      <DialogTrigger className="text-lg">
        <GrView />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"text-2xl"}>{name}</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-5">
          <div className="w-44 h-44 relative rounded bg-[#dadada]">
            <Image
              alt="profile picture"
              src={profilePictureUrl}
              fill
              className="object-cover absolute inset-0 w-full h-full"
            />
          </div>
          <ul className="flex flex-col gap-1">
            <li className="text-sm truncate">
              <strong>Email:</strong> {email}
            </li>
            <li className="text-sm truncate">
              <strong>Gender:</strong> {gender}
            </li>
            <li className="text-sm truncate">
              <strong>Category:</strong> {category}
            </li>
            <li className="text-sm truncate">
              <strong>Address:</strong> {address}
            </li>
            <li className="text-sm truncate">
              <strong>OR Number:</strong> {orNumber}
            </li>
            <li className="text-sm truncate">
              <strong>Contact Number:</strong> {contact}
            </li>
          </ul>

          <div></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
