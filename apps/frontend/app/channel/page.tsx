'use client';
import React, { useState } from "react";
import { useWeb3Storage } from "../../hooks/useWeb3Storage";
import { Input, Button, Stack } from "@river/design-system";

export default function ChannelPictureSetter() {
    const [image, setImage] = useState<File | null>(null);
    const [cid, setCid] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const { unpackedMetadata, client } = useWeb3Storage(cid);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };

    const handleUpload = async () => {
        if (image) {
            const imageCid = await client.put([image], { wrapWithDirectory: false });
            console.log(`Uploaded image CID: ${imageCid}`);
            setCid(imageCid);
        }
    };
    const handleContractInsertion = async () => {
        const contractUriData = {
          name: name,
          description: description,
          image: `ipfs://${cid}`
        };
        console.log("Data for Channel:", contractUriData);
      
        const blob = new Blob([JSON.stringify(contractUriData)], { type: 'application/json' });
        
        const file = new File([blob], "schema.json", { type: 'application/json' });
        
        const schemaCid = await client.put([file], { wrapWithDirectory: false });
        
        console.log(`Schema CID: ${schemaCid}`);
      
        // schema cid is now able to be sent to contract 
      };
      
    return (
      <Stack>
        <Input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <Input 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <Input type="file" onChange={handleImageChange} />
        <Button onClick={handleUpload}>Upload Image</Button>
        <Button onClick={handleContractInsertion}>Insert into Contract</Button>
        {cid && <img src={`https://ipfs.io/ipfs/${cid}`} alt="Profile" />}
      </Stack>
    );
}