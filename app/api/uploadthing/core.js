import { createUploadthing, UploadThingError } from "uploadthing/next"

const f = createUploadthing();



// FileRouter for your app, can contain multiple FileRoutes
const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "5MB" } })
   
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for userId:", metadata.userId); ken

      // console.log("file url", file.url); ken


      // console.log("i will create a mongogdb user connection here") ken

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),

  pdfUploader: f({ pdf: { maxFileSize: "12MB" } })
   
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete PDF FILE:", metadata.userId); ken

      // console.log("file url", file.url); ken


      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
};








export const OurFileRouter = ourFileRouter;




// console.log(OurFileRouter); ken