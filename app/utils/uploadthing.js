import  {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import { OurFileRouter } from "../api/uploadthing/core";




const UploadButton = generateUploadButton(OurFileRouter);
const UploadDropzone = generateUploadDropzone(OurFileRouter);

export{
  UploadButton,
  UploadDropzone
};
