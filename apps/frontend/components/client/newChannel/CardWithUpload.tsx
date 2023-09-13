import React, { useState, useRef } from "react";
import { useWeb3Storage } from "../../../hooks/useWeb3Storage";
import { Button, Stack, Card } from "@river/design-system";
import Image from "next/image";

export function CardWithUpload({
  imageCid,
  setImageCid,
}: {
  imageCid: string;
  setImageCid: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [image, setImage] = useState<File | null>(null);
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null); // New state for local image URL
  const { client } = useWeb3Storage(imageCid);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);

      // Set local image URL
      const imageUrl = URL.createObjectURL(selectedFile);
      setLocalImageUrl(imageUrl);

      const imageCid = await client.put([selectedFile], {
        wrapWithDirectory: false,
      });
      console.log(`Uploaded image CID: ${imageCid}`);
      setImageCid(imageCid);
    }
  };

  return (
    <Card size="lg" className="relative w-[300px] h-[300px] bg-base-border">
      {image ? (
        // Use localImageUrl as the source for the Image component
        <Image
          className="object-cover aspect-square"
          src={localImageUrl!}
          alt="Uploaded image"
          fill
        />
      ) : (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }} // Hide the input
          />
          <Button
            size="icon"
            className="h-full rounded w-full bg-base-border hover:bg-accent-hover text-label-muted"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Image
          </Button>
        </>
      )}
    </Card>
  );
}
