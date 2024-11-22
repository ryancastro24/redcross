import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
const CameraCapture = ({name}) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null); // Ref to store the video stream

  // Start the camera
  const startCamera = async () => {
    try {
      // Access the laptop camera with video enabled
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream; // Save the stream in a ref for stopping it later
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };

  // Capture photo from the video stream and stop the camera
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas size to match the video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content (image) to a data URL (base64 image string)
    const imageDataUrl = canvas.toDataURL("image/png");

    // Save the image in state and automatically trigger download
    setCapturedImage(imageDataUrl);
    downloadPhoto(imageDataUrl);

    // Stop the camera after capturing the photo
    stopCamera();
  };

  // Function to trigger download of the captured image
  const downloadPhoto = (imageDataUrl) => {
    const link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = `${name || "samplename"}.png`;
    link.click(); // Automatically triggers download
  };

  // Stop the camera stream
  const stopCamera = () => {
    const stream = streamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop()); // Stop all tracks (video stream)
      streamRef.current = null; // Clear the stream ref
      videoRef.current.srcObject = null; // Remove the video stream from the video element
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h1>Take a Picture with Laptop Camera</h1>

      {/* Video element to show the camera feed */}
    <div className="w-full flex items-center justify-evenly">
      <video ref={videoRef} autoPlay playsInline style={{ width: "150px" }}></video>
      <br />

      {capturedImage && <img src={capturedImage} alt="Captured" style={{ width: "150px" }} />}

    </div>

        <div className="flex items-center justify-evenly">
           
             <Button>
                <button onClick={startCamera}>Open Camera</button>
            </Button>

            <Button>
                <button onClick={capturePhoto}>Capture Photo</button>
            </Button>

        </div>

      {/* Hidden canvas used for capturing the image */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {/* Display the captured image */}
     
    </div>
  );
};

export default CameraCapture;
