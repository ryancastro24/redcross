import Image from "next/image";
import LoginForm from "@/components/LoginForm";
export default function Home() {
  return (
    <main style={{backgroundImage:`url("/assets/background.png")`,backgroundSize:"cover",backgroundPosition:"center center"}} className="flex h-screen absolute inset-0 flex-col items-center justify-between">

        <div className="w-full h-full bg-[#000000ae] flex justify-center items-center">
          <LoginForm/>
        </div>
    </main>
  );
}
