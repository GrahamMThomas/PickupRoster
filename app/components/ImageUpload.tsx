"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forwardRef, useImperativeHandle, useState } from "react";

export enum ImageUploadFolder {
  Profile = "profile",
  Meetup = "meetup",
}

export interface ImageUploadHandle {
  uploadImage: () => Promise<void>;
}

interface ImageUploadProps {
  onUpload: (value: string) => void;
  fileName: string;
  filePath: ImageUploadFolder;
}

export const ImageUpload = forwardRef<ImageUploadHandle, ImageUploadProps>(
  ({ onUpload, fileName, filePath }, ref) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useImperativeHandle(ref, () => ({
      uploadImage: async () => {
        setIsUploading(true);
        try {
          console.log(`Uploading ${fileName} to ${filePath}...`);

          // Simulate the upload process
          const uploadedUrl = await new Promise<string>((resolve) =>
            setTimeout(() => resolve(`https://fakeurl.com/${fileName}`), 2000)
          );

          // Once upload is complete, call the onUpload callback
          onUpload(uploadedUrl);
        } catch (error) {
          console.error("Upload failed", error);
        } finally {
          setIsUploading(false);
        }
      },
    }));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
      }
    };

    const generateBlobPath = () => {
      if (!file) return "";

      const fileExtension = file.name.split(".").pop();

      `${filePath}/${fileName}.${fileExtension}`;
    };

    const uploadToS3 = async () => {
      if (!file) return;

      // Get presigned URL
      const res = await fetch("/api/image_upload", {
        method: "POST",
        body: JSON.stringify({
          fileName: generateBlobPath(),
          fileType: file.type,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const { url } = await res.json();

      await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      const imageUrl = url.split("?")[0];
      console.log("Uploaded to:", imageUrl);
      onUpload(imageUrl); // Update the parent component with the image URL
      // You can now save `imageUrl` to the user's profile
    };

    if (isUploading) {
      return <p>Uploading...</p>;
    }

    return (
      <div className="space-y-4">
        <Input type="file" accept="image/*" onChange={handleFileChange} onSubmit={uploadToS3} />
      </div>
    );
  }
);
