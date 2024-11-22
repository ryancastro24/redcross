
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import  ProfileDropDown  from "@/components/ProfileDropdown";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { OurFileRouter } from "./api/uploadthing/core";
import Sidebar from "@/components/Sidebar";
import SideNavigationProviderComponent from "@/components/SideNavigationProvider";
import SearchInputField from "@/components/SearchInputField";
import SearchArrayProvider from "@/components/SearchArrayProvider";
import { Toaster } from "@/components/ui/toaster"
const poppins = Poppins({weight: ["100","200","300","400","500","600","700"],preload: false})


export const metadata = {
  title: "Red Cross Cavite",
  description: "sample description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body  className={poppins.className}>


      <script
          type="module"
          defer
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/spiral.js"
        ></script>
     

      <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(OurFileRouter)}
        />


         <Providers>
          <SearchArrayProvider>
          <SideNavigationProviderComponent>
        <div className="flex justify-between items-center w-full">
        
        
            <Sidebar/> 
        
        <div className="flex flex-col w-full h-screen">
          <div className="w-full h-16  flex items-center shadow-card justify-between px-4">



            <SearchInputField/>
           
            <ProfileDropDown/>
           
         
          </div>

          
          {children}

        </div>
         </div>

         <Toaster/>
          </SideNavigationProviderComponent>
          </SearchArrayProvider>
        </Providers>
        </body>
    </html>
  );
}
