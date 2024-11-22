"use client";

import { UploadButton } from "../utils/uploadthing";

const UploadFile = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-10">
      <h2 className="text-2xl text-white">Upload A Certificate</h2>

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          // console.log("Files: ", res);  ken
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default UploadFile;
