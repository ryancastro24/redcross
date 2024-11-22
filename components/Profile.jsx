"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
const Profile = () => {
  const { data: session } = useSession();

  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="relative">
      <div
        onClick={() => setOpenModal(!openModal)}
        className="w-8 h-8 bg-white rounded-full overflow-hidden relative cursor-pointer"
      >
        <Image
          src={"/assets/user profile.jpg"}
          className="object-cover absolute "
          fill
          alt="User Profile"
        />
      </div>

      {openModal && (
        <div
          onClick={() => setOpenModal(false)}
          className="w-52 h-52 p-5 z-50  flex-col bg-white shadow-lg flex items-center justify-between shadow-[#0000005e] rounded absolute -bottom-52 -left-44"
        >
          <div
            onClick={() => setOpenModal(!openModal)}
            className="w-12 h-12 bg-white rounded-full overflow-hidden relative cursor-pointer"
          >
            <Image
              src={"/assets/user profile.jpg"}
              className="object-cover absolute "
              fill
              alt="User Profile"
            />
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-1">
            <h2 className="text-black text-2xl">{session.user.name}</h2>
            <h1 className="text-black text-sm">{session.user.email}</h1>
          </div>

          <button
            onClick={signOut}
            className="bg-red-600 rounded py-2 w-full text-white"
          >
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
