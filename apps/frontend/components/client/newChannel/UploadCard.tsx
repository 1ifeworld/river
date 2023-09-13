import React, { useState, useRef } from 'react';
import { useWeb3Storage } from '../../../hooks/useWeb3Storage';
import { Button, Body, Card } from '@river/design-system';
import Image from 'next/image';

export function UploadCard({
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
    <Card size='lg' className='relative'>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }} // Hide the input
      />
      <Button
        size='icon'
        className='h-full rounded w-full bg-base-shade hover:bg-base-shade/80 text-label-muted'
        onClick={() => fileInputRef.current?.click()}
      >
        <Body className='text-label-muted mx-8'>
          Upload a cover image for your channel
        </Body>
      </Button>
      {image && (
        <Image
          className='object-cover aspect-square'
          src={localImageUrl!} // Use the local image as the source for the Image component
          alt='Uploaded image'
          fill
        />
      )}
    </Card>
  );
}
