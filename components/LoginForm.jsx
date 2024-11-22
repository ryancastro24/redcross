"use client";

import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault(); //avoid or restrict browser to reload

    signIn("credentials", { ...userData, redirect: false }).then((callback) => {
      if (callback?.error) {
        alert(callback.error);
        setLoading(false);
        setUserData({
          email: "",
          password: "",
        });
      }
      if (callback?.ok && !callback?.error) {
        alert("login successfully!");
        router.push("/dashboard");
      }
    });
  };

  // console.log(userData); ken

  return (
    <div className="w-[350px] flex flex-col gap-8 p-6 rounded bg-white">
      <div className="w-full flex flex-col justify-center items-center gap-3">
        <Image src={"/assets/logo.png"} width={100} height={100} alt="logo" />

        <h2 className="text-xl font-bold text-black">Red Cross Cavite</h2>
      </div>

      <form className="w-full flex flex-col gap-5" onSubmit={handleLogin}>
        <div className="w-full gap-1 flex flex-col">
          <label className="text-black text-sm" htmlFor="email">
            Email
          </label>
          <input
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            id="email"
            type="text"
            placeholder="Enter Email"
            className="text-black px-3 border border-[0.2] border-opacity-30 rounded border-black py-2 w-full"
          />
        </div>

        <div className="w-full gap-1 flex flex-col">
          <label className="text-black text-sm" htmlFor="password">
            Password
          </label>
          <input
            required
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            id="password"
            type="password"
            placeholder="Enter Password"
            className="text-black px-3 py-2 w-full border border-[0.2] border-opacity-30 rounded border-black"
          />
        </div>

        <button
          onClick={() => setLoading(true)}
          className="w-full py-3 rounded bg-[#B00909] text-white font-bold"
        >
          {loading ? "LOADING...." : "LOGIN"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
