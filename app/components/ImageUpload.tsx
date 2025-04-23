"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadToS3 = async () => {
    if (!file) return;

    const res = await fetch("/api/image_upload", {
      method: "POST",
      body: JSON.stringify({
        fileName: file.name,
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
    onChange(imageUrl); // Update the parent component with the image URL
    // You can now save `imageUrl` to the user's profile
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button
        type="button"
        onClick={uploadToS3}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </Button>
    </div>
  );
}
